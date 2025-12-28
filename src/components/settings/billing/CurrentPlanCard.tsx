'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { UsageProgress } from './UsageProgress'
import { PlanFeatures } from './PlanFeatures'
import type { Subscription, Usage } from '@/services/api/clients/BillingClient'
import { ExternalLink, Loader2 } from 'lucide-react'

interface CurrentPlanCardProps {
  subscription: Subscription | null
  usage: Usage | null
  onManageBilling: () => void
  onCancelSubscription: () => void
  portalLoading: boolean
  cancelLoading: boolean
}

const FREE_FEATURES = [
  'Up to 5 services',
  '10 RCA analyses per day',
  'Basic alerting',
  'Community support',
]

const PRO_FEATURES = [
  '5 services included + $5/each additional',
  '100 RCA analyses per day',
  'Advanced alerting & notifications',
  'Priority support',
  'Custom integrations',
  'Team collaboration',
]

export function CurrentPlanCard({
  subscription,
  usage,
  onManageBilling,
  onCancelSubscription,
  portalLoading,
  cancelLoading,
}: CurrentPlanCardProps) {
  const isPro = subscription?.plan_name === 'pro' && subscription?.status === 'active'
  const isCanceled = subscription?.cancel_at_period_end

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Current Plan
              <Badge variant={isPro ? 'default' : 'secondary'}>
                {isPro ? 'Pro' : 'Free'}
              </Badge>
              {isCanceled && (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  Cancels at period end
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              {isPro
                ? `$30/month${subscription?.current_period_end ? ` - Renews ${new Date(subscription.current_period_end).toLocaleDateString()}` : ''}`
                : '$0/month - Free forever'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <PlanFeatures features={isPro ? PRO_FEATURES : FREE_FEATURES} />

        {usage && (
          <div className="space-y-4 pt-4 border-t border-[var(--color-border)]">
            <h4 className="text-sm font-medium text-[var(--color-text-primary)]">Usage</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <UsageProgress
                label="Services"
                used={usage.services_used}
                limit={usage.services_limit}
              />
              <UsageProgress
                label="RCA Today"
                used={usage.rca_used_today}
                limit={usage.rca_daily_limit}
              />
            </div>
          </div>
        )}

        {isPro && (
          <div className="flex flex-wrap gap-3 pt-4 border-t border-[var(--color-border)]">
            <Button
              variant="outline"
              onClick={onManageBilling}
              disabled={portalLoading}
            >
              {portalLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <ExternalLink className="size-4" />
              )}
              Manage Billing
            </Button>
            {!isCanceled && (
              <Button
                variant="ghost"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={onCancelSubscription}
                disabled={cancelLoading}
              >
                {cancelLoading && <Loader2 className="size-4 animate-spin" />}
                Cancel Subscription
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
