'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, ThumbsDown, Loader2, MessageSquare, Send } from 'lucide-react';

interface ChatFeedbackProps {
  currentScore?: number | null;
  onFeedback: (isPositive: boolean, comment?: string) => Promise<void>;
  className?: string;
}

export function ChatFeedback({ currentScore, onFeedback, className }: ChatFeedbackProps) {
  const [loadingFeedback, setLoadingFeedback] = useState<'positive' | 'negative' | null>(null);
  const [feedbackGiven, setFeedbackGiven] = useState<boolean | null>(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const handleFeedback = async (isPositive: boolean) => {
    if (loadingFeedback !== null) return;

    setLoadingFeedback(isPositive ? 'positive' : 'negative');
    try {
      await onFeedback(isPositive);
      setFeedbackGiven(isPositive);
    } finally {
      setLoadingFeedback(null);
    }
  };

  const handleSubmitComment = async () => {
    if (!comment.trim() || feedbackGiven === null || isSubmittingComment) return;

    setIsSubmittingComment(true);
    try {
      await onFeedback(feedbackGiven, comment.trim());
      setComment('');
      setShowCommentInput(false);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // 1 = thumbs up, -1 = thumbs down
  const isPositiveSelected = currentScore === 1 || feedbackGiven === true;
  const isNegativeSelected = currentScore === -1 || feedbackGiven === false;
  const hasFeedback = isPositiveSelected || isNegativeSelected;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-1">
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

        {/* Show "Add comment?" button after feedback is given */}
        {hasFeedback && !showCommentInput && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCommentInput(true)}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            Add comment?
          </Button>
        )}
      </div>

      {/* Comment input area */}
      {showCommentInput && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
          <Textarea
            placeholder="Share your thoughts on this response..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[60px] text-sm resize-none"
            maxLength={1000}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {comment.length}/1000
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowCommentInput(false);
                  setComment('');
                }}
                className="h-7 text-xs"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSubmitComment}
                disabled={!comment.trim() || isSubmittingComment}
                className="h-7 text-xs"
              >
                {isSubmittingComment ? (
                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                ) : (
                  <Send className="h-3 w-3 mr-1" />
                )}
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
