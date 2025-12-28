'use client'

import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LockedFeatureProps {
  message?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function LockedFeature({
  message = 'This feature is only available for team workspaces',
  actionLabel = 'Create team workspace',
  onAction,
  className,
}: LockedFeatureProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border border-dashed p-4',
        'bg-[var(--color-surface-secondary)] border-[var(--color-border)]',
        className
      )}
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface-hover)]">
        <Lock className="size-4 text-[var(--color-text-tertiary)]" />
      </div>
      <div className="flex flex-col gap-1 min-w-0">
        <p className="text-sm text-[var(--color-text-secondary)]">{message}</p>
        {onAction && (
          <button
            onClick={onAction}
            className="text-sm font-medium text-[var(--color-brand)] hover:underline text-left"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  )
}
