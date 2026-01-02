'use client'

import { useEffect, useState } from 'react'
import { GitBranch, GitCommit, Loader2, Rocket, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
  fetchRepositoryBranches,
  updateRepositoryConfig,
  removeRepositoryConfig,
} from '@/lib/features/environmentsSlice'
import { RepositoryConfig as RepositoryConfigType, RepositoryBranch } from '@/types/environment'
import { Deployment } from '@/types/deployment'
import { api } from '@/services/api/apiFactory'
import { UpdateDeploymentModal } from './UpdateDeploymentModal'

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
  const [isDeploymentModalOpen, setIsDeploymentModalOpen] = useState(false)
  const [latestDeployment, setLatestDeployment] = useState<Deployment | null>(null)
  const [isLoadingDeployment, setIsLoadingDeployment] = useState(false)

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

  useEffect(() => {
    // Fetch latest deployment
    const fetchDeployment = async () => {
      if (!workspaceId || !environmentId) return
      setIsLoadingDeployment(true)
      try {
        const response = await api.deployments.getLatest(
          workspaceId,
          environmentId,
          config.repo_full_name
        )
        if (response.status === 200) {
          setLatestDeployment(response.data)
        }
      } catch {
        // Silently fail - deployment info is optional
      } finally {
        setIsLoadingDeployment(false)
      }
    }
    fetchDeployment()
  }, [workspaceId, environmentId, config.repo_full_name])

  const handleBranchChange = async (branchName: string) => {
    try {
      await dispatch(
        updateRepositoryConfig({
          workspaceId,
          environmentId,
          repoConfigId: config.id,
          data: { branch_name: branchName },
        })
      ).unwrap()
      toast.success(`Branch updated to ${branchName}`)
    } catch {
      toast.error('Failed to update branch')
    }
  }

  const handleEnableToggle = async (enabled: boolean) => {
    try {
      await dispatch(
        updateRepositoryConfig({
          workspaceId,
          environmentId,
          repoConfigId: config.id,
          data: { is_enabled: enabled },
        })
      ).unwrap()
      toast.success(`Repository ${enabled ? 'enabled' : 'disabled'}`)
    } catch {
      toast.error('Failed to update repository')
    }
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
      toast.success('Repository removed')
    } catch {
      toast.error('Failed to remove repository')
    } finally {
      setIsDeleting(false)
    }
  }

  // Enable toggle is disabled until branch is selected
  const canToggleEnabled = !!config.branch_name

  // Find default branch for placeholder
  const defaultBranch = branches.find((b: RepositoryBranch) => b.is_default)?.name

  return (
    <>
      <div className="flex flex-col gap-2 py-3 px-4 border border-border rounded-lg bg-card">
        <div className="flex items-center justify-between">
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
                <SelectTrigger className="h-8 text-xs w-full overflow-hidden">
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
                      <span className="truncate max-w-[200px] inline-block">{branch.name}</span>
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

        {/* Deployment Info Row */}
        <div className="flex items-center justify-between pl-7 text-xs">
          <div className="flex items-center gap-2">
            {isLoadingDeployment ? (
              <span className="text-muted-foreground">Loading deployment...</span>
            ) : latestDeployment ? (
              <TooltipProvider>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs font-normal gap-1">
                    <Rocket className="size-3" />
                    {latestDeployment.branch}
                  </Badge>
                  {latestDeployment.commit_sha && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="text-xs font-mono font-normal gap-1">
                          <GitCommit className="size-3" />
                          {latestDeployment.commit_sha.substring(0, 7)}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-mono">{latestDeployment.commit_sha}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  <span className="text-muted-foreground">
                    deployed {latestDeployment.deployed_at
                      ? new Date(latestDeployment.deployed_at).toLocaleDateString()
                      : 'recently'}
                  </span>
                </div>
              </TooltipProvider>
            ) : (
              <span className="text-muted-foreground italic">No deployment recorded</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs"
            onClick={() => setIsDeploymentModalOpen(true)}
          >
            <Rocket className="size-3 mr-1" />
            {latestDeployment ? 'Update' : 'Record'} Deployment
          </Button>
        </div>
      </div>

      {/* Update Deployment Modal */}
      <UpdateDeploymentModal
        open={isDeploymentModalOpen}
        onOpenChange={setIsDeploymentModalOpen}
        workspaceId={workspaceId}
        environmentId={environmentId}
        repoFullName={config.repo_full_name}
        currentDeployment={latestDeployment}
        onDeploymentUpdated={setLatestDeployment}
      />
    </>
  )
}
