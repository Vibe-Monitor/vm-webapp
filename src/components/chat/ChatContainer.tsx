'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useChat } from '@/hooks/useChat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';
import { SessionList } from './SessionList';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Bot } from 'lucide-react';

interface ChatContainerProps {
  workspaceId: string;
  className?: string;
}

export function ChatContainer({ workspaceId, className }: ChatContainerProps) {
  const {
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
  } = useChat({ workspaceId });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [renameSessionId, setRenameSessionId] = useState<string | null>(null);
  const [renameTitle, setRenameTitle] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get current session for header display
  const currentSession = sessions.find((s) => s.id === currentSessionId);

  // Load sessions on mount
  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleRenameClick = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    setRenameSessionId(sessionId);
    setRenameTitle(session?.title || '');
    setRenameDialogOpen(true);
  };

  const handleRenameSubmit = async () => {
    if (renameSessionId && renameTitle.trim()) {
      await renameSession(renameSessionId, renameTitle.trim());
      setRenameDialogOpen(false);
      setRenameSessionId(null);
      setRenameTitle('');
    }
  };

  // Inline rename from header
  const handleHeaderRename = async (newTitle: string) => {
    if (currentSessionId) {
      await renameSession(currentSessionId, newTitle);
    }
  };

  return (
    <div className={cn('flex h-full', className)}>
      {/* Sidebar */}
      <div
        className={cn(
          'border-r border-[var(--color-border)] bg-[var(--color-background-secondary)] transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        )}
      >
        <SessionList
          sessions={sessions}
          activeSessionId={currentSessionId || undefined}
          onSelectSession={loadSession}
          onNewSession={startNewSession}
          onDeleteSession={deleteSession}
          onRenameSession={handleRenameClick}
          loading={isLoading && sessions.length === 0}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <ChatHeader
          title={currentSession?.title}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onRename={currentSessionId ? handleHeaderRename : undefined}
        />

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
        <div className="border-t border-[var(--color-border)] bg-[var(--color-background)]">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <ChatInput
              onSend={sendMessage}
              disabled={isLoading}
              loading={isStreaming}
            />
          </div>
        </div>
      </div>

      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Conversation</DialogTitle>
          </DialogHeader>
          <Input
            value={renameTitle}
            onChange={(e) => setRenameTitle(e.target.value)}
            placeholder="Enter new title"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleRenameSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRenameSubmit} disabled={!renameTitle.trim()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EmptyState({ onSendMessage }: { onSendMessage: (message: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)]/10 mb-4">
        <Bot className="h-8 w-8 text-[var(--color-primary)]" />
      </div>
      <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
        How can I help you today?
      </h2>
      <p className="text-sm text-[var(--color-text-secondary)] max-w-md">
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
      className="px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background-secondary)] hover:border-[var(--color-border-light)] cursor-pointer transition-colors"
      onClick={() => onClick(text)}
    >
      {text}
    </div>
  );
}
