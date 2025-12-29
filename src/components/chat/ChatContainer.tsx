'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useChat } from '@/hooks/useChat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot } from 'lucide-react';

interface ChatContainerProps {
  workspaceId: string;
  sessionId?: string;
  className?: string;
}

export function ChatContainer({ workspaceId, sessionId, className }: ChatContainerProps) {
  const {
    messages,
    sessions,
    currentSessionId,
    isLoading,
    isStreaming,
    sendMessage,
    loadSession,
    submitFeedback,
  } = useChat({ workspaceId, initialSessionId: sessionId });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get current session for header display
  const currentSession = sessions.find((s) => s.id === currentSessionId);

  // Load session when sessionId changes (URL navigation)
  useEffect(() => {
    if (sessionId && sessionId !== currentSessionId) {
      loadSession(sessionId);
    }
  }, [sessionId, currentSessionId, loadSession]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <Bot className="h-5 w-5 shrink-0 text-primary" />
        <h1 className="font-semibold text-foreground truncate">
          {currentSession?.title || 'AI Assistant'}
        </h1>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-4">
          {messages.length === 0 ? (
            <EmptyState onSendMessage={sendMessage} />
          ) : (
            <div className="space-y-2">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onFeedback={
                    message.role === 'assistant'
                      ? (score) => submitFeedback(message.id, score)
                      : undefined
                  }
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border bg-background">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <ChatInput
            onSend={sendMessage}
            disabled={isLoading}
            loading={isStreaming}
          />
        </div>
      </div>

    </div>
  );
}

function EmptyState({ onSendMessage }: { onSendMessage: (message: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
        <Bot className="h-8 w-8 text-primary" />
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        How can I help you today?
      </h2>
      <p className="text-sm text-muted-foreground max-w-md">
        Ask me about your infrastructure, debug issues, or analyze logs and metrics.
        I can help investigate problems across your services.
      </p>
      <div className="mt-6 grid gap-2 text-sm text-left">
        <ExamplePrompt text="Why is my API returning 500 errors?" onClick={onSendMessage} />
        <ExamplePrompt text="Check recent errors in the payment service" onClick={onSendMessage} />
        <ExamplePrompt text="What's causing high latency in api-gateway?" onClick={onSendMessage} />
      </div>
    </div>
  );
}

function ExamplePrompt({ text, onClick }: { text: string; onClick: (text: string) => void }) {
  return (
    <div
      className="px-4 py-2 rounded-lg border border-border bg-card text-muted-foreground hover:bg-secondary hover:border-ring cursor-pointer transition-colors"
      onClick={() => onClick(text)}
    >
      {text}
    </div>
  );
}
