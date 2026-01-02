'use client'

import * as React from 'react'
import { User, Building2, Loader2, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
  createWorkspace,
  setCurrentWorkspace,
  clearCreateError,
  WorkspaceType,
} from '@/lib/features/workspaceSlice'
import { api } from '@/services/api/apiFactory'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface CreateSpaceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface SpaceTypeOption {
  value: WorkspaceType
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  tooltip: string
}

const spaceTypeOptions: SpaceTypeOption[] = [
  {
    value: 'personal',
    label: 'Personal',
    icon: User,
    description: 'Just for you',
    tooltip:
      'A personal space is private to you. Only you can access and manage the data, chats, and integrations within this space.',
  },
  {
    value: 'team',
    label: 'Team',
    icon: Building2,
    description: 'Collaborate with others',
    tooltip:
      'A team space allows you to invite members and collaborate. You can control access with roles and share integrations across the team.',
  },
]

export function CreateSpaceModal({ open, onOpenChange }: CreateSpaceModalProps) {
  const dispatch = useAppDispatch()
  const { workspaces, createLoading, createError } = useAppSelector(
    (state) => state.workspace
  )

  const [name, setName] = React.useState('')
  const [spaceType, setSpaceType] = React.useState<WorkspaceType>('team')

  // Check if user already has a personal space
  const hasPersonalSpace = workspaces.some((ws) => ws.type === 'personal')

  // Clear form on open
  React.useEffect(() => {
    if (open) {
      setName('')
      setSpaceType('team')
      dispatch(clearCreateError())
    }
  }, [open, dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) return

    try {
      const result = await dispatch(
        createWorkspace({
          name: name.trim(),
          type: spaceType,
        })
      ).unwrap()

      // Set the new workspace as current (creator is always owner)
      dispatch(setCurrentWorkspace({ ...result, user_role: 'owner' }))

      // Persist the selection locally for immediate page refresh support
      localStorage.setItem('last_visited_workspace_id', result.id)
      // Also persist to backend (fire-and-forget)
      api.workspace.markVisited(result.id).catch(() => {
        // Silently ignore errors - this is a best-effort persistence
      })

      // Close the modal
      onOpenChange(false)
    } catch {
      // Error is handled by Redux state
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !createLoading && name.trim()) {
      handleSubmit(e)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Space</DialogTitle>
            <DialogDescription>
              Create a space to organize your monitoring, chats, and
              integrations.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Space Type Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Space Type</Label>
              <div className="grid grid-cols-2 gap-3">
                {spaceTypeOptions.map((option) => {
                  const Icon = option.icon
                  const isSelected = spaceType === option.value
                  const isDisabled = option.value === 'personal' && hasPersonalSpace

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => !isDisabled && setSpaceType(option.value)}
                      disabled={isDisabled}
                      className={cn(
                        'relative flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all',
                        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                        isDisabled
                          ? 'opacity-50 cursor-not-allowed border-border'
                          : 'hover:border-primary hover:bg-accent',
                        isSelected && !isDisabled
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      )}
                    >
                      <div
                        className={cn(
                          'size-10 rounded-full flex items-center justify-center transition-colors',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-accent text-muted-foreground'
                        )}
                      >
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <p
                          className={cn(
                            'text-sm font-medium',
                            isSelected
                              ? 'text-foreground'
                              : 'text-muted-foreground'
                          )}
                        >
                          {option.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {option.description}
                        </p>
                      </div>

                      {/* Info tooltip */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="absolute top-2 right-2 p-1 rounded-full hover:bg-accent">
                            <Info className="size-3.5 text-muted-foreground" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="max-w-xs text-xs"
                        >
                          {isDisabled
                            ? 'You already have a personal space. Only one personal space is allowed per user.'
                            : option.tooltip}
                        </TooltipContent>
                      </Tooltip>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Space Name Input */}
            <div className="space-y-2">
              <Label htmlFor="space-name" className="text-sm font-medium">
                Space Name
              </Label>
              <Input
                id="space-name"
                placeholder={
                  spaceType === 'team'
                    ? 'e.g., Engineering Team'
                    : 'e.g., My Projects'
                }
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={createLoading}
                className="w-full"
              />
              {createError && (
                <p className="text-xs text-destructive">
                  {createError}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim() || createLoading}
            >
              {createLoading ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Space'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
