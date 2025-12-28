'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
  fetchSubscription,
  fetchUsage,
  subscribeToPro,
  openBillingPortal,
  cancelSubscription,
} from '@/lib/features/billingSlice'
import { CurrentPlanCard } from './CurrentPlanCard'
import { UpgradePlanCard } from './UpgradePlanCard'
import { Loader2 } from 'lucide-react'

interface BillingSectionProps {
  workspaceId: string
}

export function BillingSection({ workspaceId }: BillingSectionProps) {
  const dispatch = useAppDispatch()
  const {
    subscription,
    usage,
    loading,
    checkoutLoading,
    portalLoading,
    cancelLoading,
  } = useAppSelector((state) => state.billing)

  useEffect(() => {
    if (workspaceId) {
      dispatch(fetchSubscription(workspaceId))
      dispatch(fetchUsage(workspaceId))
    }
  }, [dispatch, workspaceId])

  const handleUpgrade = () => {
    dispatch(subscribeToPro(workspaceId))
  }

  const handleManageBilling = () => {
    dispatch(openBillingPortal(workspaceId))
  }

  const handleCancelSubscription = () => {
    if (window.confirm('Are you sure you want to cancel your subscription? You will lose access to Pro features at the end of your billing period.')) {
      dispatch(cancelSubscription(workspaceId))
    }
  }

  if (loading && !subscription && !usage) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const isPro = subscription?.plan_name === 'pro' && subscription?.status === 'active'

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Billing & Plans</h2>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CurrentPlanCard
          subscription={subscription}
          usage={usage}
          onManageBilling={handleManageBilling}
          onCancelSubscription={handleCancelSubscription}
          portalLoading={portalLoading}
          cancelLoading={cancelLoading}
        />

        {!isPro && (
          <UpgradePlanCard
            onUpgrade={handleUpgrade}
            isLoading={checkoutLoading}
          />
        )}
      </div>
    </div>
  )
}
