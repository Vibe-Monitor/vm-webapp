'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LLMConfigSection } from '@/components/settings/llm'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { fetchWorkspaces, fetchWorkspaceById } from '@/lib/features/workspaceSlice'
import { tokenService } from '@/services/tokenService'
import Loader from '@/components/ui/loader'

export default function LLMSettingsPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { workspaces, currentWorkspace, loading } = useAppSelector(
    (state) => state.workspace
  )

  // Check auth and load workspaces
  useEffect(() => {
    const hasValidToken = tokenService.hasValidToken()
    if (!hasValidToken) {
      router.push('/auth')
      return
    }

    // Load workspaces if not loaded
    if (workspaces.length === 0) {
      dispatch(fetchWorkspaces())
    }
  }, [dispatch, router, workspaces.length])

  // Fetch full workspace details to get user_role
  useEffect(() => {
    const workspaceId = currentWorkspace?.id || workspaces[0]?.id
    if (workspaceId && !currentWorkspace?.user_role) {
      dispatch(fetchWorkspaceById(workspaceId))
    }
  }, [dispatch, currentWorkspace, workspaces])

  const workspaceId = currentWorkspace?.id || workspaces[0]?.id
  const isOwner = currentWorkspace?.user_role === 'owner'

  if (loading) {
    return <Loader message="Loading workspace..." />
  }

  if (!workspaceId) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          No workspace found
        </h2>
        <p className="text-muted-foreground mb-4">
          Please complete the setup to create a workspace.
        </p>
        <button
          onClick={() => router.push('/setup')}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Go to Setup
        </button>
      </div>
    )
  }

  return <LLMConfigSection workspaceId={workspaceId} isOwner={isOwner} />
}
