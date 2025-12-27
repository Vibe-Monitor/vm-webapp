'use client';

import { cn } from '@/lib/utils';
import { ChatMessage as ChatMessageType, TurnStatus } from '@/types/chat';
import { ChatSteps } from './ChatSteps';
import { User, Bot, ThumbsUp, ThumbsDown, Loader2, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';

interface ChatMessageProps {
  message: ChatMessageType;
  onFeedback?: (score: 1 | 5) => void;
  className?: string;
}

export function ChatMessage({ message, onFeedback, className }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isProcessing = message.status === TurnStatus.PROCESSING || message.status === TurnStatus.PENDING;
  const hasFeedback = message.feedbackScore !== null && message.feedbackScore !== undefined;

  return (
    <div
      className={cn(
        'flex gap-3 py-4',
        isUser ? 'flex-row-reverse' : 'flex-row',
        className
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          isUser
            ? 'bg-[var(--color-primary)] text-white'
            : 'bg-[var(--color-background-secondary)] border border-[var(--color-border)]'
        )}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4 text-[var(--color-text-secondary)]" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          'flex-1 min-w-0 space-y-2',
          isUser ? 'text-right' : 'text-left'
        )}
      >
        {/* User message */}
        {isUser && (
          <div className="inline-block max-w-[85%] rounded-2xl bg-[var(--color-primary)] px-4 py-2 text-white">
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
        )}

        {/* Assistant message */}
        {!isUser && (
          <div className="space-y-3">
            {/* Processing steps */}
            {message.steps && message.steps.length > 0 && (
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background-secondary)] p-3">
                <ChatSteps steps={message.steps} />
              </div>
            )}

            {/* Loading state */}
            {isProcessing && (!message.steps || message.steps.length === 0) && (
              <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Analyzing...</span>
              </div>
            )}

            {/* Failed state */}
            {(message.status === TurnStatus.FAILED || (!message.content && !isProcessing)) && (
              <div className="flex items-center gap-2 text-[var(--color-error)] bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span className="text-sm">This request failed. Please try again.</span>
              </div>
            )}

            {/* Final response */}
            {message.content && message.status !== TurnStatus.FAILED && (
              <div className="prose prose-sm dark:prose-invert max-w-none text-[var(--color-text-primary)]">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    pre: ({ children }) => (
                      <pre className="overflow-x-auto rounded-lg bg-[var(--color-background-secondary)] p-3 text-sm">
                        {children}
                      </pre>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className="rounded bg-[var(--color-background-secondary)] px-1.5 py-0.5 text-sm">
                          {children}
                        </code>
                      ) : (
                        <code className={className}>{children}</code>
                      );
                    },
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-primary)] hover:underline"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}

            {/* Feedback buttons */}
            {message.content && onFeedback && !isProcessing && (
              <div className="flex items-center gap-1 pt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFeedback(5)}
                  className={cn(
                    'h-7 w-7 p-0',
                    hasFeedback && message.feedbackScore === 5 && 'text-green-500'
                  )}
                  title="Helpful"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onFeedback(1)}
                  className={cn(
                    'h-7 w-7 p-0',
                    hasFeedback && message.feedbackScore === 1 && 'text-red-500'
                  )}
                  title="Not helpful"
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
