'use client';

import { useState, useCallback, useRef } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { api } from '@/services/api/apiFactory';
import { tokenService } from '@/services/tokenService';
import {
  ChatMessage,
  ChatSessionSummary,
  ChatStep,
  SSEEvent,
  TurnStatus,
} from '@/types/chat';
import { toast } from 'sonner';

interface UseChatOptions {
  workspaceId: string;
}

interface UseChatReturn {
  messages: ChatMessage[];
  sessions: ChatSessionSummary[];
  currentSessionId: string | null;
  isLoading: boolean;
  isStreaming: boolean;
  sendMessage: (content: string) => Promise<void>;
  loadSessions: () => Promise<void>;
  loadSession: (sessionId: string) => Promise<void>;
  startNewSession: () => void;
  deleteSession: (sessionId: string) => Promise<void>;
  renameSession: (sessionId: string, title: string) => Promise<void>;
  submitFeedback: (turnId: string, score: 1 | 5) => Promise<void>;
}

export function useChat({ workspaceId }: UseChatOptions): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessions, setSessions] = useState<ChatSessionSummary[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const loadSessions = useCallback(async () => {
    console.log('[Chat] Loading sessions for workspace:', workspaceId);
    setIsLoading(true);
    try {
      const response = await api.chat.listSessions(workspaceId);
      console.log('[Chat] Sessions response:', { status: response.status, data: response.data, error: response.error });
      if (response.data && response.status === 200) {
        setSessions(response.data);
      } else {
        console.error('[Chat] Sessions load failed:', response);
      }
    } catch (error) {
      console.error('Failed to load sessions:', error);
      toast.error('Failed to load conversations');
    } finally {
      setIsLoading(false);
    }
  }, [workspaceId]);

  const loadSession = useCallback(async (sessionId: string) => {
    setIsLoading(true);
    try {
      const response = await api.chat.getSession(workspaceId, sessionId);
      if (response.data && response.status === 200) {
        const session = response.data;
        setCurrentSessionId(sessionId);

        // Convert turns to messages
        const loadedMessages: ChatMessage[] = session.turns.flatMap((turn) => {
          const msgs: ChatMessage[] = [];

          // User message
          msgs.push({
            id: `${turn.id}-user`,
            role: 'user',
            content: turn.user_message,
            createdAt: turn.created_at,
          });

          // Assistant message
          msgs.push({
            id: turn.id,
            role: 'assistant',
            content: turn.final_response || '',
            status: turn.status,
            feedbackScore: turn.feedback_score,
            createdAt: turn.created_at,
          });

          return msgs;
        });

        setMessages(loadedMessages);

        // Check if any turn is still processing
        const processingTurn = session.turns.find(
          (t) => t.status === TurnStatus.PROCESSING || t.status === TurnStatus.PENDING
        );
        if (processingTurn) {
          // Resume streaming for that turn
          streamTurnResponse(processingTurn.id);
        }
      }
    } catch (error) {
      console.error('Failed to load session:', error);
      toast.error('Failed to load conversation');
    } finally {
      setIsLoading(false);
    }
    // streamTurnResponse is stable (wrapped in useCallback)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId]);

  const startNewSession = useCallback(() => {
    // Cancel any ongoing stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setCurrentSessionId(null);
    setMessages([]);
    setIsStreaming(false);
  }, []);

  const streamTurnResponse = useCallback(async (turnId: string) => {
    const accessToken = tokenService.getAccessToken();
    if (!accessToken) {
      toast.error('Please sign in to continue');
      return;
    }

    // Abort any existing stream
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setIsStreaming(true);
    const steps = new Map<string, ChatStep>();

    try {
      const streamUrl = api.chat.getStreamUrl(workspaceId, turnId);

      await fetchEventSource(streamUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'ngrok-skip-browser-warning': 'true',
        },
        signal: abortControllerRef.current.signal,

        onopen: async (response) => {
          console.log('[SSE] Connection opened, status:', response.status);
          if (!response.ok) {
            throw new Error(`Stream failed: ${response.status}`);
          }
        },

        onmessage: (event) => {
          try {
            console.log('[SSE] Received event:', event.data);
            const data: SSEEvent = JSON.parse(event.data);

            switch (data.event) {
              case 'status':
                // Update message with status
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === turnId
                      ? { ...msg, steps: Array.from(steps.values()) }
                      : msg
                  )
                );
                break;

              case 'tool_start':
                steps.set(data.step_id, {
                  id: data.step_id,
                  name: data.tool_name,
                  status: 'running',
                });
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === turnId
                      ? { ...msg, steps: Array.from(steps.values()) }
                      : msg
                  )
                );
                break;

              case 'tool_end':
                // Match by step_id for accurate step completion
                if (data.step_id && steps.has(data.step_id)) {
                  const step = steps.get(data.step_id)!;
                  steps.set(data.step_id, {
                    ...step,
                    status: data.status === 'completed' ? 'completed' : 'failed',
                    content: data.content || undefined,
                  });
                }
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === turnId
                      ? { ...msg, steps: Array.from(steps.values()) }
                      : msg
                  )
                );
                break;

              case 'thinking':
                // Could show thinking indicator
                break;

              case 'complete':
                // Mark all running steps as completed
                for (const [id, step] of steps) {
                  if (step.status === 'running') {
                    steps.set(id, { ...step, status: 'completed' });
                  }
                }
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === turnId
                      ? {
                          ...msg,
                          content: data.final_response,
                          status: TurnStatus.COMPLETED,
                          steps: Array.from(steps.values()),
                        }
                      : msg
                  )
                );
                setIsStreaming(false);
                // Refresh sessions to update preview
                loadSessions();
                break;

              case 'error':
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === turnId
                      ? {
                          ...msg,
                          content: `Error: ${data.message}`,
                          status: TurnStatus.FAILED,
                        }
                      : msg
                  )
                );
                setIsStreaming(false);
                toast.error(data.message);
                break;
            }
          } catch (e) {
            console.error('Failed to parse SSE event:', e);
          }
        },

        onerror: (err) => {
          console.error('SSE error:', err);
          setIsStreaming(false);
          if (err.name !== 'AbortError') {
            toast.error('Connection lost. Please try again.');
          }
          throw err; // Stop retrying
        },
      });
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Stream error:', error);
        setIsStreaming(false);
      }
    }
  }, [workspaceId, loadSessions]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isStreaming) return;

    // Add user message immediately
    const userMessageId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);

    try {
      console.log('[Chat] Sending message to workspace:', workspaceId);
      const response = await api.chat.sendMessage(workspaceId, {
        message: content,
        session_id: currentSessionId || undefined,
      });
      console.log('[Chat] Response:', { status: response.status, data: response.data, error: response.error });

      if (response.data && response.status === 200) {
        const { turn_id, session_id } = response.data;

        // Update session ID if this is a new session
        if (!currentSessionId) {
          setCurrentSessionId(session_id);
        }

        // Add placeholder assistant message
        const assistantMessage: ChatMessage = {
          id: turn_id,
          role: 'assistant',
          content: '',
          status: TurnStatus.PROCESSING,
          steps: [],
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);

        // Start streaming
        setIsLoading(false);
        await streamTurnResponse(turn_id);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
      setIsLoading(false);
      // Remove the user message on error
      setMessages((prev) => prev.filter((m) => m.id !== userMessageId));
    }
  }, [workspaceId, currentSessionId, isStreaming, streamTurnResponse]);

  const deleteSession = useCallback(async (sessionId: string) => {
    try {
      const response = await api.chat.deleteSession(workspaceId, sessionId);
      if (response.status === 204) {
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
        if (currentSessionId === sessionId) {
          startNewSession();
        }
        toast.success('Conversation deleted');
      }
    } catch (error) {
      console.error('Failed to delete session:', error);
      toast.error('Failed to delete conversation');
    }
  }, [workspaceId, currentSessionId, startNewSession]);

  const renameSession = useCallback(async (sessionId: string, title: string) => {
    try {
      const response = await api.chat.updateSession(workspaceId, sessionId, { title });
      if (response.data && response.status === 200) {
        setSessions((prev) =>
          prev.map((s) => (s.id === sessionId ? { ...s, title } : s))
        );
        toast.success('Conversation renamed');
      }
    } catch (error) {
      console.error('Failed to rename session:', error);
      toast.error('Failed to rename conversation');
    }
  }, [workspaceId]);

  const submitFeedback = useCallback(async (turnId: string, score: 1 | 5) => {
    // Optimistic update
    const previousMessages = messages;
    setMessages((prev) =>
      prev.map((m) => (m.id === turnId ? { ...m, feedbackScore: score } : m))
    );

    try {
      const response = await api.chat.submitFeedback(workspaceId, turnId, { score });
      if (!response.data || response.status !== 200) {
        // Rollback on failure
        setMessages(previousMessages);
        toast.error('Failed to submit feedback');
      }
    } catch (error) {
      // Rollback on error
      setMessages(previousMessages);
      console.error('Failed to submit feedback:', error);
      toast.error('Failed to submit feedback');
      throw error;
    }
  }, [workspaceId, messages]);

  return {
    messages,
    sessions,
    currentSessionId,
    isLoading,
    isStreaming,
    sendMessage,
    loadSessions,
    loadSession,
    startNewSession,
    deleteSession,
    renameSession,
    submitFeedback,
  };
}
