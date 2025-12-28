'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { IntegrationCard, IntegrationCardProps } from './IntegrationCard'

export interface IntegrationCategory {
  id: string
  name: string
  integrations: IntegrationCardProps[]
}

interface IntegrationsSectionProps {
  categories: IntegrationCategory[]
  className?: string
}

export function IntegrationsSection({
  categories,
  className,
}: IntegrationsSectionProps) {
  return (
    <div className={cn('flex flex-col gap-8', className)}>
      {categories.map((category) => (
        <div key={category.id} className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
            {category.name}
          </h2>
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {category.integrations.map((integration) => (
              <IntegrationCard key={integration.id} {...integration} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Re-export types for convenience
export type { IntegrationCardProps } from './IntegrationCard'
export type { IntegrationStatusType } from './IntegrationStatus'
