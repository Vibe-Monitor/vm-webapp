'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';

interface ChatFeedbackProps {
  currentScore?: number | null;
  onFeedback: (isPositive: boolean) => Promise<void>;
  className?: string;
}

export function ChatFeedback({ currentScore, onFeedback, className }: ChatFeedbackProps) {
  const [loadingFeedback, setLoadingFeedback] = useState<'positive' | 'negative' | null>(null);

  const handleFeedback = async (isPositive: boolean) => {
    if (loadingFeedback !== null) return;

    setLoadingFeedback(isPositive ? 'positive' : 'negative');
    try {
      await onFeedback(isPositive);
    } finally {
      setLoadingFeedback(null);
    }
  };

  // 1 = thumbs up, -1 = thumbs down
  const isPositiveSelected = currentScore === 1;
  const isNegativeSelected = currentScore === -1;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFeedback(true)}
        disabled={loadingFeedback !== null}
        className={cn(
          'h-7 w-7 p-0 transition-colors',
          isPositiveSelected
            ? 'text-green-500 bg-green-500/10 hover:bg-green-500/20'
            : 'text-muted-foreground hover:text-green-500'
        )}
        title="Helpful"
      >
        {loadingFeedback === 'positive' ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <ThumbsUp className={cn('h-3.5 w-3.5', isPositiveSelected && 'fill-current')} />
        )}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFeedback(false)}
        disabled={loadingFeedback !== null}
        className={cn(
          'h-7 w-7 p-0 transition-colors',
          isNegativeSelected
            ? 'text-red-500 bg-red-500/10 hover:bg-red-500/20'
            : 'text-muted-foreground hover:text-red-500'
        )}
        title="Not helpful"
      >
        {loadingFeedback === 'negative' ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <ThumbsDown className={cn('h-3.5 w-3.5', isNegativeSelected && 'fill-current')} />
        )}
      </Button>
    </div>
  );
}
