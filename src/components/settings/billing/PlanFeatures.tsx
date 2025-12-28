'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PlanFeaturesProps {
  features: string[]
  className?: string
}

export function PlanFeatures({ features, className }: PlanFeaturesProps) {
  return (
    <ul className={cn('space-y-2', className)}>
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-2 text-sm">
          <Check className="size-4 shrink-0 text-primary mt-0.5" />
          <span className="text-[var(--color-text-secondary)]">{feature}</span>
        </li>
      ))}
    </ul>
  )
}
