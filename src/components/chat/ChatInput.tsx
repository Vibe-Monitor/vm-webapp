'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  className?: string;
}

const MAX_LENGTH = 10000;

export function ChatInput({
  onSend,
  disabled = false,
  loading = false,
  placeholder = 'Ask a question about your infrastructure...',
  className,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSend = () => {
    const trimmed = message.trim();
    if (trimmed && !disabled && !loading) {
      onSend(trimmed);
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isDisabled = disabled || loading;
  const canSend = message.trim().length > 0 && !isDisabled;

  return (
    <div className={cn('relative', className)}>
      <div className="flex items-end gap-2 rounded-xl border border-border bg-card p-2 focus-within:border-ring">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, MAX_LENGTH))}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isDisabled}
          rows={1}
          className={cn(
            'flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none',
            'placeholder:text-muted-foreground',
            'text-foreground',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'max-h-[200px]'
          )}
        />
        <Button
          onClick={handleSend}
          disabled={!canSend}
          size="sm"
          className="h-8 w-8 p-0 shrink-0"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Character count */}
      {message.length > MAX_LENGTH * 0.9 && (
        <div className="absolute right-2 -bottom-5 text-xs text-muted-foreground">
          {message.length.toLocaleString()}/{MAX_LENGTH.toLocaleString()}
        </div>
      )}
    </div>
  );
}
