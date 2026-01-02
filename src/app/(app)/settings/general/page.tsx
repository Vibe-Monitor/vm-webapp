'use client'

import { useAppSelector } from '@/lib/hooks'
import { GeneralSection } from '@/components/settings/general'
import { Loader2 } from 'lucide-react'

export default function GeneralSettingsPage() {
  const { currentWorkspace, loading: workspaceLoading } = useAppSelector(
    (state) => state.workspace
  )

  if (workspaceLoading || !currentWorkspace) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <GeneralSection
      workspaceId={currentWorkspace.id}
      workspaceName={currentWorkspace.name}
      workspaceType={currentWorkspace.type || 'team'}
    />
  )
}
