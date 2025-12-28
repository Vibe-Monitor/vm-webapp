'use client'

import { CheckCircle2, AlertCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

export type IntegrationStatusType = 'connected' | 'error' | 'pending' | 'not_connected'

interface IntegrationStatusProps {
  status: IntegrationStatusType
  lastVerified?: string
  errorMessage?: string
  className?: string
}

const statusConfig: Record<
  IntegrationStatusType,
  {
    label: string
    icon: typeof CheckCircle2
    className: string
  }
> = {
  connected: {
    label: 'Connected',
    icon: CheckCircle2,
    className: 'bg-green-500/10 text-green-500 border-green-500/20',
  },
  error: {
    label: 'Error',
    icon: AlertCircle,
    className: 'bg-red-500/10 text-red-500 border-red-500/20',
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  },
  not_connected: {
    label: 'Not Connected',
    icon: AlertCircle,
    className: 'bg-[var(--color-surface-hover)] text-[var(--color-text-tertiary)] border-[var(--color-border)]',
  },
}

export function IntegrationStatus({
  status,
  lastVerified,
  errorMessage,
  className,
}: IntegrationStatusProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit',
          config.className
        )}
      >
        <Icon className="size-3" />
        {config.label}
      </div>
      {status === 'connected' && lastVerified && (
        <p className="text-xs text-[var(--color-text-tertiary)]">
          Last verified: {lastVerified}
        </p>
      )}
      {status === 'error' && errorMessage && (
        <p className="text-xs text-red-400">{errorMessage}</p>
      )}
    </div>
  )
}
