'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlanFeatures } from './PlanFeatures'
import { Loader2, Sparkles } from 'lucide-react'

interface UpgradePlanCardProps {
  onUpgrade: () => void
  isLoading: boolean
}

const PRO_FEATURES = [
  '5 services included',
  '$5/month for each additional service',
  '100 RCA analyses per day',
  'Advanced alerting & notifications',
  'Priority support',
  'Custom integrations',
  'Team collaboration features',
]

export function UpgradePlanCard({ onUpgrade, isLoading }: UpgradePlanCardProps) {
  return (
    <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              Upgrade to Pro
              <Badge variant="default">Recommended</Badge>
            </CardTitle>
            <CardDescription className="mt-1">
              Unlock the full potential of Vibe Monitor
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">$30</div>
            <div className="text-sm text-[var(--color-text-secondary)]">per month</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <PlanFeatures features={PRO_FEATURES} />

        <div className="pt-4 border-t border-[var(--color-border)]">
          <Button
            size="lg"
            className="w-full"
            onClick={onUpgrade}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Redirecting to checkout...
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                Upgrade Now
              </>
            )}
          </Button>
          <p className="text-xs text-center text-[var(--color-text-tertiary)] mt-2">
            Cancel anytime. Powered by Stripe.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
