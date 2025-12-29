'use client'

import { useAppSelector } from '@/lib/hooks'
import { MembersSection } from '@/components/settings/members'
import Loader from '@/components/ui/loader'

export default function MembersPage() {
  const currentWorkspace = useAppSelector((state) => state.workspace.currentWorkspace)
  const loading = useAppSelector((state) => state.workspace.loading)

  if (loading || !currentWorkspace) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader message="Loading workspace..." />
      </div>
    )
  }

  // Determine if this is a personal space (no user_role means personal space)
  const isPersonalSpace = !currentWorkspace.user_role

  return (
    <MembersSection
      workspaceId={currentWorkspace.id}
      isPersonalSpace={isPersonalSpace}
    />
  )
}
