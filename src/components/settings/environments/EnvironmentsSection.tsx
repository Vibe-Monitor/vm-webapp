'use client'

import { useEffect, useState } from 'react'
import { Plus, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { EnvironmentCard } from './EnvironmentCard'
import { AddEnvironmentModal } from './AddEnvironmentModal'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchEnvironments } from '@/lib/features/environmentsSlice'

interface EnvironmentsSectionProps {
  workspaceId: string
}

export function EnvironmentsSection({ workspaceId }: EnvironmentsSectionProps) {
  const dispatch = useAppDispatch()
  const { environments: rawEnvironments, loading, error } = useAppSelector((state) => state.environments)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Ensure environments is always an array (API might return null/undefined)
  const environments = Array.isArray(rawEnvironments) ? rawEnvironments : []

  useEffect(() => {
    if (workspaceId) {
      dispatch(fetchEnvironments(workspaceId))
    }
  }, [dispatch, workspaceId])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="size-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Environments
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Environment names should match your log environment attribute.
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="size-4 mr-2" />
          Add Environment
        </Button>
      </div>

      {/* Environment List */}
      {environments.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground">
            No environments configured yet.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Create your first environment to get started.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="size-4 mr-2" />
            Add Environment
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {environments.map((environment) => (
            <EnvironmentCard
              key={environment.id}
              environment={environment}
              workspaceId={workspaceId}
            />
          ))}
        </div>
      )}

      {/* Add Environment Modal */}
      <AddEnvironmentModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        workspaceId={workspaceId}
      />
    </div>
  )
}
