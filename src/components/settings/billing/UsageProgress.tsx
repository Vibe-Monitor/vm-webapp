'use client'

import { cn } from '@/lib/utils'

interface UsageProgressProps {
  label: string
  used: number
  limit: number
  className?: string
}

export function UsageProgress({ label, used, limit, className }: UsageProgressProps) {
  const percentage = limit > 0 ? Math.min((used / limit) * 100, 100) : 0
  const isNearLimit = percentage >= 80
  const isAtLimit = percentage >= 100

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className={cn(
          'font-medium',
          isAtLimit ? 'text-destructive' : isNearLimit ? 'text-yellow-600 dark:text-yellow-500' : 'text-foreground'
        )}>
          {used}/{limit}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            isAtLimit ? 'bg-destructive' : isNearLimit ? 'bg-yellow-500' : 'bg-primary'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-xs text-muted-foreground">
        {percentage.toFixed(0)}% used
      </div>
    </div>
  )
}
