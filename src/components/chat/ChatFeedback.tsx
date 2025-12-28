'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';

interface ChatFeedbackProps {
  currentScore?: number | null;
  onFeedback: (score: 1 | 5) => Promise<void>;
  className?: string;
}

export function ChatFeedback({ currentScore, onFeedback, className }: ChatFeedbackProps) {
  const [loadingScore, setLoadingScore] = useState<1 | 5 | null>(null);

  const handleFeedback = async (score: 1 | 5) => {
    if (loadingScore !== null) return;

    setLoadingScore(score);
    try {
      await onFeedback(score);
    } finally {
      setLoadingScore(null);
    }
  };

  const isPositiveSelected = currentScore === 5;
  const isNegativeSelected = currentScore === 1;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFeedback(5)}
        disabled={loadingScore !== null}
        className={cn(
          'h-7 w-7 p-0 transition-colors',
          isPositiveSelected
            ? 'text-green-500 bg-green-500/10 hover:bg-green-500/20'
            : 'text-[var(--color-text-tertiary)] hover:text-green-500'
        )}
        title="Helpful"
      >
        {loadingScore === 5 ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <ThumbsUp className={cn('h-3.5 w-3.5', isPositiveSelected && 'fill-current')} />
        )}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFeedback(1)}
        disabled={loadingScore !== null}
        className={cn(
          'h-7 w-7 p-0 transition-colors',
          isNegativeSelected
            ? 'text-red-500 bg-red-500/10 hover:bg-red-500/20'
            : 'text-[var(--color-text-tertiary)] hover:text-red-500'
        )}
        title="Not helpful"
      >
        {loadingScore === 1 ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <ThumbsDown className={cn('h-3.5 w-3.5', isNegativeSelected && 'fill-current')} />
        )}
      </Button>
    </div>
  );
}
