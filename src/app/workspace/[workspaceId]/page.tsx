"use client"

import { useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/lib/store"
import { fetchWorkspaceById } from "@/lib/features/workspaceSlice"
import LogsDashboard from "@/components/dashboard/logs-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { toastManager } from "@/lib/toastManager"

export default function WorkspacePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const workspaceId = params.workspaceId as string
  const dispatch = useDispatch<AppDispatch>()

  const { currentWorkspace, loading, error } = useSelector(
    (state: RootState) => state.workspace
  )

  useEffect(() => {
    if (workspaceId) {
      dispatch(fetchWorkspaceById(workspaceId))
    }
  }, [workspaceId, dispatch])

  // Handle GitHub connection success/error messages
  useEffect(() => {
    const github = searchParams.get('github')
    const githubError = searchParams.get('error')

    if (github === 'connected') {
      toastManager.success('GitHub App connected successfully!')
      // Dispatch custom event to refresh GitHub status
      window.dispatchEvent(new Event('github-connected'))
      // Clean up URL without reloading
      window.history.replaceState({}, '', `/workspace/${workspaceId}`)
    } else if (githubError === 'github_connection_failed') {
      toastManager.error('Failed to connect GitHub App. Please try again.')
      window.history.replaceState({}, '', `/workspace/${workspaceId}`)
    } else if (githubError === 'github_already_connected_to_another_user') {
      toastManager.error('This GitHub account is already connected to another user. Please use a different GitHub account or contact your admin.')
      window.history.replaceState({}, '', `/workspace/${workspaceId}`)
    }
  }, [searchParams, workspaceId])

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-black text-white">
        <div className="border-b px-6 py-3" style={{
          background: "var(--color-background-subtle)",
          borderColor: "var(--color-border-subtle)",
          borderWidth: "0.5px"
        }}>
          <div className="flex items-center gap-4 flex-wrap">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
        <div className="flex-1 overflow-hidden bg-black p-4">
          <div className="space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-full" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Workspace Not Found</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          <Link href="/workspace" className="text-blue-500 hover:underline">
            Go back to workspace selection
          </Link>
        </div>
      </div>
    )
  }

  if (!currentWorkspace) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Workspace Not Found</h1>
          <p className="text-gray-400 mb-4">The workspace you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/workspace" className="text-blue-500 hover:underline">
            Go back to workspace selection
          </Link>
        </div>
      </div>
    )
  }

  return <LogsDashboard workspaceId={workspaceId} />
}