'use client'

import * as React from 'react'
import { ChevronDown, Building2, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebar } from './SidebarContext'
import { Workspace } from '@/lib/features/workspaceSlice'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface SidebarHeaderProps {
  workspace: Workspace | null
  onClick?: () => void
  isOpen?: boolean
}

function getWorkspaceInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function SidebarHeader({ workspace, onClick, isOpen }: SidebarHeaderProps) {
  const { collapsed } = useSidebar()

  const workspaceName = workspace?.name || 'Select Space'
  const workspaceType = workspace?.workspace_type || 'personal'
  const initials = workspace ? getWorkspaceInitials(workspace.name) : 'VM'

  const headerContent = (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors',
        'hover:bg-accent',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
        collapsed && 'justify-center px-2'
      )}
    >
      {/* Workspace Icon */}
      <div className="relative size-8 shrink-0 rounded-lg bg-primary flex items-center justify-center">
        <span className="text-xs font-bold text-primary-foreground">
          {initials}
        </span>
        {/* Type indicator */}
        <div className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-background flex items-center justify-center border border-border">
          {workspaceType === 'team' ? (
            <Building2 className="size-2 text-muted-foreground" />
          ) : (
            <User className="size-2 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Workspace Name & Chevron */}
      {!collapsed && (
        <>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {workspaceName}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {workspaceType}
            </p>
          </div>
          <ChevronDown
            className={cn(
              'size-4 shrink-0 text-muted-foreground transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </>
      )}
    </button>
  )

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{headerContent}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          {workspaceName}
        </TooltipContent>
      </Tooltip>
    )
  }

  return headerContent
}
