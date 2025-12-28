'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'
import { BillingSection } from '@/components/settings/billing'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function BillingPage() {
  const searchParams = useSearchParams()
  const { currentWorkspace, loading: workspaceLoading } = useAppSelector(
    (state) => state.workspace
  )

  // Handle Stripe redirect query params
  useEffect(() => {
    const success = searchParams.get('success')
    const canceled = searchParams.get('canceled')

    if (success === 'true') {
      toast.success('Subscription activated successfully!', {
        description: 'Welcome to Pro! Your new features are now available.',
      })
      // Clean up URL
      window.history.replaceState({}, '', '/settings/billing')
    } else if (canceled === 'true') {
      toast.info('Checkout canceled', {
        description: 'No changes were made to your subscription.',
      })
      // Clean up URL
      window.history.replaceState({}, '', '/settings/billing')
    }
  }, [searchParams])

  if (workspaceLoading || !currentWorkspace) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return <BillingSection workspaceId={currentWorkspace.id} />
}
