'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, ShieldAlert } from 'lucide-react'
import { SettingsLayout } from '@/components/layouts'
import { useAppSelector } from '@/lib/hooks'

export default function SettingsGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { currentWorkspace, loading: workspaceLoading } = useAppSelector(
    (state) => state.workspace
  )

  const isOwner = currentWorkspace?.user_role === 'owner'

  // Redirect non-owners to chat page
  useEffect(() => {
    // Wait for workspace to load before checking permissions
    if (workspaceLoading || !currentWorkspace) return

    if (!isOwner) {
      router.replace('/chat')
    }
  }, [isOwner, currentWorkspace, workspaceLoading, router])

  // Show loading state while workspace is loading
  if (workspaceLoading || !currentWorkspace) {
    return (
      <div className="container max-w-6xl py-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  // Show access denied briefly while redirect is happening (prevents data flash)
  if (!isOwner) {
    return (
      <div className="container max-w-6xl py-6">
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <ShieldAlert className="size-12 text-muted-foreground" />
          <div className="text-center">
            <p className="text-lg font-medium text-foreground">
              Owner Access Required
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Redirecting...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Space Settings</h1>
        <p className="text-muted-foreground">
          Manage your workspace settings
        </p>
      </div>
      <SettingsLayout>{children}</SettingsLayout>
    </div>
  )
}
