'use client'

import { useEffect } from 'react'
import { GitBranch, Loader2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
  fetchRepositoryBranches,
  updateRepositoryConfig,
} from '@/lib/features/environmentsSlice'
import { RepositoryConfig as RepositoryConfigType, RepositoryBranch } from '@/types/environment'

interface RepositoryConfigProps {
  environmentId: string
  config: RepositoryConfigType
  workspaceId: string
}

export function RepositoryConfig({
  environmentId,
  config,
  workspaceId,
}: RepositoryConfigProps) {
  const dispatch = useAppDispatch()
  const { branchesCache, branchesLoading } = useAppSelector((state) => state.environments)

  const branches = branchesCache[config.repository_full_name] || []
  const isLoadingBranches = branchesLoading[config.repository_full_name] || false

  useEffect(() => {
    // Fetch branches if not cached
    if (!branchesCache[config.repository_full_name] && workspaceId) {
      dispatch(
        fetchRepositoryBranches({
          workspaceId,
          repoFullName: config.repository_full_name,
        })
      )
    }
  }, [dispatch, config.repository_full_name, workspaceId, branchesCache])

  const handleBranchChange = (branch: string) => {
    dispatch(
      updateRepositoryConfig({
        environmentId,
        repoConfigId: config.id,
        data: { branch },
      })
    )
  }

  const handleEnableToggle = (enabled: boolean) => {
    dispatch(
      updateRepositoryConfig({
        environmentId,
        repoConfigId: config.id,
        data: { is_enabled: enabled },
      })
    )
  }

  // Enable toggle is disabled until branch is selected
  const canToggleEnabled = !!config.branch

  // Find default branch for placeholder
  const defaultBranch = branches.find((b: RepositoryBranch) => b.is_default)?.name

  return (
    <div className="flex items-center justify-between py-3 px-4 border border-border rounded-lg bg-card">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <GitBranch className="size-4 text-muted-foreground shrink-0" />
        <span className="text-sm text-foreground truncate">
          {config.repository_full_name}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Branch Selector */}
        <div className="w-40">
          <Select
            value={config.branch || ''}
            onValueChange={handleBranchChange}
            disabled={isLoadingBranches}
          >
            <SelectTrigger className="h-8 text-xs">
              {isLoadingBranches ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="size-3 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <SelectValue placeholder={defaultBranch || 'Select branch'} />
              )}
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch: RepositoryBranch) => (
                <SelectItem key={branch.name} value={branch.name}>
                  {branch.name}
                  {branch.is_default && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      (default)
                    </span>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Enable/Disable Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {config.is_enabled ? 'Enabled' : 'Disabled'}
          </span>
          <Switch
            checked={config.is_enabled}
            onCheckedChange={handleEnableToggle}
            disabled={!canToggleEnabled}
            aria-label={`Toggle ${config.repository_full_name}`}
          />
        </div>
      </div>
    </div>
  )
}
