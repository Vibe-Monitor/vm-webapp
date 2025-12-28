'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SettingsLayout } from '@/components/layouts/SettingsLayout'
import { EnvironmentsSection } from '@/components/settings/environments'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { fetchWorkspaces } from '@/lib/features/workspaceSlice'
import Loader from '@/components/ui/loader'

export default function EnvironmentsSettingsPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { workspaces, currentWorkspace, loading } = useAppSelector(
    (state) => state.workspace
  )

  useEffect(() => {
    dispatch(fetchWorkspaces())
  }, [dispatch])

  const workspaceId = currentWorkspace?.id || workspaces[0]?.id

  if (loading) {
    return (
      <SettingsLayout>
        <div className="flex items-center justify-center py-12">
          <Loader message="Loading workspace..." />
        </div>
      </SettingsLayout>
    )
  }

  if (!workspaceId) {
    return (
      <SettingsLayout>
        <div className="text-center py-12">
          <p className="text-[var(--color-text-secondary)]">
            No workspace found. Please create a workspace first.
          </p>
          <button
            onClick={() => router.push('/setup')}
            className="mt-4 text-[var(--color-button-blue)] hover:underline"
          >
            Go to Setup
          </button>
        </div>
      </SettingsLayout>
    )
  }

  return (
    <SettingsLayout>
      <EnvironmentsSection workspaceId={workspaceId} />
    </SettingsLayout>
  )
}
