'use client'

import { useAppSelector } from '@/lib/hooks'
import { SettingsLayout } from '@/components/layouts'
import { MembersSection } from '@/components/settings/members'
import Loader from '@/components/ui/loader'

export default function MembersPage() {
  const currentWorkspace = useAppSelector((state) => state.workspace.currentWorkspace)
  const loading = useAppSelector((state) => state.workspace.loading)

  if (loading || !currentWorkspace) {
    return (
      <SettingsLayout>
        <div className="flex items-center justify-center py-12">
          <Loader message="Loading workspace..." />
        </div>
      </SettingsLayout>
    )
  }

  // Determine if this is a personal space (no user_role means personal space)
  const isPersonalSpace = !currentWorkspace.user_role

  return (
    <SettingsLayout>
      <MembersSection
        workspaceId={currentWorkspace.id}
        isPersonalSpace={isPersonalSpace}
      />
    </SettingsLayout>
  )
}
