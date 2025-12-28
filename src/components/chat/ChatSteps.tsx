'use client';

import { cn } from '@/lib/utils';
import { ChatStep } from '@/types/chat';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';

interface ChatStepsProps {
  steps: ChatStep[];
  className?: string;
}

export function ChatSteps({ steps, className }: ChatStepsProps) {
  if (steps.length === 0) return null;

  return (
    <div className={cn('space-y-2', className)}>
      {steps.map((step) => (
        <div
          key={step.id}
          className="flex items-start gap-2 text-sm text-muted-foreground"
        >
          <StepIcon status={step.status} />
          <div className="flex-1 min-w-0">
            <span className={cn(
              step.status === 'running' && 'text-foreground',
              step.status === 'failed' && 'text-red-500'
            )}>
              {step.name}
            </span>
            {step.content && step.status === 'completed' && (
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {step.content}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function StepIcon({ status }: { status: ChatStep['status'] }) {
  switch (status) {
    case 'running':
      return <Loader2 className="h-4 w-4 animate-spin text-blue-500 mt-0.5 shrink-0" />;
    case 'completed':
      return <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />;
    case 'failed':
      return <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />;
    default:
      return <div className="h-4 w-4 rounded-full border-2 border-border mt-0.5 shrink-0" />;
  }
}
