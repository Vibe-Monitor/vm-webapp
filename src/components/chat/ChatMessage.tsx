'use client';

import { cn } from '@/lib/utils';
import { ChatMessage as ChatMessageType, TurnStatus } from '@/types/chat';
import { ChatSteps } from './ChatSteps';
import { ChatFeedback } from './ChatFeedback';
import { User, Bot, Loader2, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: ChatMessageType;
  onFeedback?: (isPositive: boolean, comment?: string) => Promise<void>;
  className?: string;
}

export function ChatMessage({ message, onFeedback, className }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isProcessing = message.status === TurnStatus.PROCESSING || message.status === TurnStatus.PENDING;

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
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary border border-border'
        )}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4 text-muted-foreground" />
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
          <div className="inline-block max-w-[85%] rounded-2xl bg-primary px-4 py-2 text-primary-foreground">
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
        )}

        {/* Assistant message */}
        {!isUser && (
          <div className="space-y-3">
            {/* Processing steps */}
            {message.steps && message.steps.length > 0 && (
              <div className="rounded-lg border border-border bg-secondary p-3">
                <ChatSteps steps={message.steps} />
              </div>
            )}

            {/* Loading state */}
            {isProcessing && (!message.steps || message.steps.length === 0) && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Analyzing...</span>
              </div>
            )}

            {/* Failed state */}
            {(message.status === TurnStatus.FAILED || (!message.content && !isProcessing)) && (
              <div className="flex items-center gap-2 text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span className="text-sm">This request failed. Please try again.</span>
              </div>
            )}

            {/* Final response */}
            {message.content && message.status !== TurnStatus.FAILED && (
              <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    pre: ({ children }) => (
                      <pre className="overflow-x-auto rounded-lg bg-secondary p-3 text-sm">
                        {children}
                      </pre>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-medium text-foreground font-mono">
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
                        className="text-blue-600 hover:underline"
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
              <ChatFeedback
                currentScore={message.feedbackScore}
                onFeedback={onFeedback}
                className="pt-1"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
