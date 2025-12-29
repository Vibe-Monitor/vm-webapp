'use client'

import { useEffect, useState } from 'react'
import { GitBranch, Loader2, Trash2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
  fetchRepositoryBranches,
  updateRepositoryConfig,
  removeRepositoryConfig,
} from '@/lib/features/environmentsSlice'
import { RepositoryConfig as RepositoryConfigType, RepositoryBranch } from '@/types/environment'

interface RepositoryConfigProps {
  environmentId: string
  environmentName: string
  config: RepositoryConfigType
  workspaceId: string
}

export function RepositoryConfig({
  environmentId,
  environmentName,
  config,
  workspaceId,
}: RepositoryConfigProps) {
  const dispatch = useAppDispatch()
  const { branchesCache, branchesLoading } = useAppSelector((state) => state.environments)
  const [isDeleting, setIsDeleting] = useState(false)

  const branches = branchesCache[config.repo_full_name] || []
  const isLoadingBranches = branchesLoading[config.repo_full_name] || false

  useEffect(() => {
    // Fetch branches if not cached
    if (!branchesCache[config.repo_full_name] && workspaceId) {
      dispatch(
        fetchRepositoryBranches({
          workspaceId,
          repoFullName: config.repo_full_name,
        })
      )
    }
  }, [dispatch, config.repo_full_name, workspaceId, branchesCache])

  const handleBranchChange = (branchName: string) => {
    dispatch(
      updateRepositoryConfig({
        workspaceId,
        environmentId,
        repoConfigId: config.id,
        data: { branch_name: branchName },
      })
    )
  }

  const handleEnableToggle = (enabled: boolean) => {
    dispatch(
      updateRepositoryConfig({
        workspaceId,
        environmentId,
        repoConfigId: config.id,
        data: { is_enabled: enabled },
      })
    )
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await dispatch(
        removeRepositoryConfig({
          workspaceId,
          environmentId,
          repoConfigId: config.id,
        })
      ).unwrap()
    } finally {
      setIsDeleting(false)
    }
  }

  // Enable toggle is disabled until branch is selected
  const canToggleEnabled = !!config.branch_name

  // Find default branch for placeholder
  const defaultBranch = branches.find((b: RepositoryBranch) => b.is_default)?.name

  return (
    <div className="flex items-center justify-between py-3 px-4 border border-border rounded-lg bg-card">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <GitBranch className="size-4 text-muted-foreground shrink-0" />
        <span className="text-sm text-foreground truncate">
          {config.repo_full_name}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Branch Selector */}
        <div className="w-44">
          <Select
            value={config.branch_name || ''}
            onValueChange={handleBranchChange}
            disabled={isLoadingBranches}
          >
            <SelectTrigger className="h-8 text-xs truncate">
              {isLoadingBranches ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="size-3 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <SelectValue placeholder={defaultBranch || 'Select branch'} />
              )}
            </SelectTrigger>
            <SelectContent className="max-w-64">
              {branches.map((branch: RepositoryBranch) => (
                <SelectItem key={branch.name} value={branch.name} title={branch.name}>
                  <span className="truncate">{branch.name}</span>
                  {branch.is_default && (
                    <span className="ml-2 text-xs text-muted-foreground shrink-0">
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
            aria-label={`Toggle ${config.repo_full_name}`}
          />
        </div>

        {/* Delete Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-destructive"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Trash2 className="size-4" />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove repository</AlertDialogTitle>
              <AlertDialogDescription>
                Remove <strong>{config.repo_full_name}</strong> from <strong>{environmentName}</strong>?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
