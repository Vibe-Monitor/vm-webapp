'use client'

import { ReactNode } from 'react'
import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { IntegrationStatus, IntegrationStatusType } from './IntegrationStatus'

export interface IntegrationCardProps {
  id: string
  name: string
  description: string
  icon: ReactNode
  status: IntegrationStatusType
  lastVerified?: string
  errorMessage?: string
  isLocked?: boolean
  lockMessage?: string
  onConnect?: () => void
  onReconfigure?: () => void
  onRetry?: () => void
  onHealthCheck?: () => void
  onCreateTeam?: () => void
  loading?: boolean
  healthCheckLoading?: boolean
  className?: string
}

export function IntegrationCard({
  name,
  description,
  icon,
  status,
  lastVerified,
  errorMessage,
  isLocked = false,
  lockMessage = 'Available for team spaces only',
  onConnect,
  onReconfigure,
  onRetry,
  onHealthCheck,
  onCreateTeam,
  loading = false,
  healthCheckLoading = false,
  className,
}: IntegrationCardProps) {
  const isConnected = status === 'connected'
  const isError = status === 'error'

  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-lg border p-4',
        'bg-secondary border-border',
        isLocked && 'opacity-75',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
            {icon}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">
                {name}
              </h3>
              {isLocked && (
                <Lock className="size-3.5 text-muted-foreground" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>

        {!isLocked && (isConnected || isError) && (
          <IntegrationStatus
            status={status}
            lastVerified={lastVerified}
            errorMessage={errorMessage}
          />
        )}
      </div>

      {isLocked ? (
        <div className="flex items-center gap-3 rounded-lg border border-dashed p-3 bg-background border-border">
          <Lock className="size-4 shrink-0 text-muted-foreground" />
          <p className="text-sm text-muted-foreground flex-1">
            {lockMessage}
          </p>
          {onCreateTeam && (
            <Button
              variant="outline"
              size="sm"
              onClick={onCreateTeam}
              className="shrink-0"
            >
              Create team
            </Button>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {isConnected && onHealthCheck && (
            <Button
              variant="outline"
              size="sm"
              onClick={onHealthCheck}
              disabled={healthCheckLoading}
            >
              {healthCheckLoading ? 'Checking...' : 'Check'}
            </Button>
          )}
          {isConnected && onReconfigure && (
            <Button
              variant="outline"
              size="sm"
              onClick={onReconfigure}
              disabled={loading}
            >
              Reconfigure
            </Button>
          )}
          {isError && onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              disabled={loading}
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              {loading ? 'Retrying...' : 'Retry'}
            </Button>
          )}
          {!isConnected && !isError && onConnect && (
            <Button
              size="sm"
              onClick={onConnect}
              disabled={loading}
            >
              {loading ? 'Connecting...' : 'Connect'}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
