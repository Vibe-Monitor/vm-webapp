'use client'

import * as React from 'react'
import { Check, Plus, Building2, User, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
  fetchWorkspaces,
  setCurrentWorkspace,
  Workspace,
} from '@/lib/features/workspaceSlice'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarHeader } from './SidebarHeader'
import { useSidebar } from './SidebarContext'

interface SpaceSwitcherProps {
  onCreateSpace?: () => void
}

function getWorkspaceInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function SpaceSwitcher({ onCreateSpace }: SpaceSwitcherProps) {
  const dispatch = useAppDispatch()
  const { collapsed } = useSidebar()
  const { workspaces, currentWorkspace, loading } = useAppSelector(
    (state) => state.workspace
  )
  const [open, setOpen] = React.useState(false)

  // Fetch workspaces on mount
  React.useEffect(() => {
    dispatch(fetchWorkspaces())
  }, [dispatch])

  const handleSelectWorkspace = (workspace: Workspace) => {
    dispatch(setCurrentWorkspace(workspace))
    setOpen(false)
  }

  const handleCreateSpace = () => {
    setOpen(false)
    onCreateSpace?.()
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div>
          <SidebarHeader
            workspace={currentWorkspace}
            onClick={() => setOpen(!open)}
            isOpen={open}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={collapsed ? 'center' : 'start'}
        side={collapsed ? 'right' : 'bottom'}
        sideOffset={collapsed ? 8 : 4}
        className="w-64"
      >
        <DropdownMenuLabel className="text-[var(--color-text-tertiary)]">
          Spaces
        </DropdownMenuLabel>

        {loading && workspaces.length === 0 ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="size-4 animate-spin text-[var(--color-text-tertiary)]" />
          </div>
        ) : (
          <>
            {workspaces.map((workspace) => {
              const isSelected = currentWorkspace?.id === workspace.id
              const workspaceType = workspace.workspace_type || 'personal'

              return (
                <DropdownMenuItem
                  key={workspace.id}
                  onClick={() => handleSelectWorkspace(workspace)}
                  className={cn(
                    'flex items-center gap-3 cursor-pointer',
                    isSelected && 'bg-[var(--color-surface-active)]'
                  )}
                >
                  {/* Workspace Icon */}
                  <div className="relative size-7 shrink-0 rounded-md bg-[var(--color-brand)] flex items-center justify-center">
                    <span className="text-[10px] font-bold text-[var(--color-primary)]">
                      {getWorkspaceInitials(workspace.name)}
                    </span>
                  </div>

                  {/* Workspace Info */}
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                      {workspace.name}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-[var(--color-text-tertiary)]">
                      {workspaceType === 'team' ? (
                        <Building2 className="size-3" />
                      ) : (
                        <User className="size-3" />
                      )}
                      <span className="capitalize">{workspaceType}</span>
                    </div>
                  </div>

                  {/* Selected Check */}
                  {isSelected && (
                    <Check className="size-4 shrink-0 text-[var(--color-brand)]" />
                  )}
                </DropdownMenuItem>
              )
            })}
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleCreateSpace}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="size-7 rounded-md border border-dashed border-[var(--color-border)] flex items-center justify-center">
            <Plus className="size-4 text-[var(--color-text-tertiary)]" />
          </div>
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">
            Create New Space
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
