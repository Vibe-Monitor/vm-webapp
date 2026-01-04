'use client'

import { useState } from 'react'
import { Trash2, Star, StarOff, MoreHorizontal, Plus } from 'lucide-react'
import { toast } from 'sonner'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { RepositoryConfig } from './RepositoryConfig'
import { AddRepositoryModal } from './AddRepositoryModal'
import { useAppDispatch } from '@/lib/hooks'
import {
  updateEnvironment,
  deleteEnvironment,
  setDefaultEnvironment,
} from '@/lib/features/environmentsSlice'
import { EnvironmentWithRepos } from '@/types/environment'

interface EnvironmentCardProps {
  environment: EnvironmentWithRepos
  workspaceId: string
}

export function EnvironmentCard({ environment, workspaceId }: EnvironmentCardProps) {
  const dispatch = useAppDispatch()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isAddRepoModalOpen, setIsAddRepoModalOpen] = useState(false)

  const handleSetDefault = async () => {
    if (environment.is_default) return

    try {
      await dispatch(setDefaultEnvironment({ workspaceId, environmentId: environment.id })).unwrap()
      toast.success(`${environment.name} is now the default environment`)
    } catch {
      toast.error('Failed to set default environment')
    }
  }

  const handleRemoveDefault = async () => {
    if (!environment.is_default) return

    try {
      await dispatch(
        updateEnvironment({
          workspaceId,
          environmentId: environment.id,
          data: { is_default: false },
        })
      ).unwrap()
      toast.success(`${environment.name} is no longer the default environment`)
    } catch {
      toast.error('Failed to remove default status')
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await dispatch(deleteEnvironment({ workspaceId, environmentId: environment.id })).unwrap()
      toast.success(`Environment "${environment.name}" deleted`)
    } catch {
      toast.error('Failed to delete environment')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AccordionItem value={environment.id} className="border border-border rounded-lg overflow-hidden last:border-b">
      <AccordionTrigger className="px-4 hover:no-underline hover:bg-muted">
        <div className="flex items-center gap-3 flex-1">
          <span className="font-medium text-foreground">
            {environment.name}
          </span>
          {environment.is_default && (
            <Badge variant="secondary" className="text-xs">
              Default
            </Badge>
          )}
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-4 pb-4">
        <div className="space-y-4">
          {/* Repositories Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-muted-foreground">
                Repositories
              </h4>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => setIsAddRepoModalOpen(true)}
                >
                  <Plus className="size-3 mr-1" />
                  Add
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <MoreHorizontal className="size-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {!environment.is_default && (
                      <DropdownMenuItem onClick={handleSetDefault}>
                        <Star className="size-4 mr-2" />
                        Set as default
                      </DropdownMenuItem>
                    )}
                    {environment.is_default && (
                      <DropdownMenuItem onClick={handleRemoveDefault}>
                        <StarOff className="size-4 mr-2" />
                        Remove as default
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="text-red-500 focus:text-red-500"
                    >
                      <Trash2 className="size-4 mr-2" />
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {!environment.repository_configs || environment.repository_configs.length === 0 ? (
              <p className="text-sm text-muted-foreground py-2">
                No repositories configured for this environment.
              </p>
            ) : (
              <div className="space-y-2">
                {environment.repository_configs.map((config) => (
                  <RepositoryConfig
                    key={config.id}
                    environmentId={environment.id}
                    environmentName={environment.name}
                    config={config}
                    workspaceId={workspaceId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </AccordionContent>

      {/* Add Repository Modal */}
      <AddRepositoryModal
        open={isAddRepoModalOpen}
        onOpenChange={setIsAddRepoModalOpen}
        environmentId={environment.id}
        workspaceId={workspaceId}
      />
    </AccordionItem>
  )
}
