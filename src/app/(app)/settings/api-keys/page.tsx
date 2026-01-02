'use client'

import { useAppSelector } from '@/lib/hooks'
import { ApiKeysSection } from '@/components/settings/api-keys'
import Loader from '@/components/ui/loader'

export default function ApiKeysPage() {
  const currentWorkspace = useAppSelector((state) => state.workspace.currentWorkspace)
  const loading = useAppSelector((state) => state.workspace.loading)

  if (loading || !currentWorkspace) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader message="Loading workspace..." />
      </div>
    )
  }

  return <ApiKeysSection workspaceId={currentWorkspace.id} />
}
