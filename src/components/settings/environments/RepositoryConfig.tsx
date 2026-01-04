'use client'

import { useEffect, useState } from 'react'
import { GitBranch, GitCommit, Loader2, Rocket, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import { useAppDispatch } from '@/lib/hooks'
import {
  updateRepositoryConfig,
  removeRepositoryConfig,
} from '@/lib/features/environmentsSlice'
import { RepositoryConfig as RepositoryConfigType } from '@/types/environment'
import { Deployment } from '@/types/deployment'
import { api } from '@/services/api/apiFactory'
import { UpdateDeploymentModal } from './UpdateDeploymentModal'

interface RepositoryConfigProps {
  environmentId: string
  environmentName: string
  config: RepositoryConfigType
  workspaceId: string
}

// Format deployment date with relative time and full timestamp
function formatDeploymentDate(dateString: string): { relative: string; full: string } {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  let relative: string
  if (diffMins < 1) {
    relative = 'just now'
  } else if (diffMins < 60) {
    relative = `${diffMins} min${diffMins === 1 ? '' : 's'} ago`
  } else if (diffHours < 24) {
    relative = `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  } else if (diffDays < 7) {
    relative = `${diffDays} day${diffDays === 1 ? '' : 's'} ago`
  } else {
    relative = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const full = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  return { relative, full }
}

export function RepositoryConfig({
  environmentId,
  environmentName,
  config,
  workspaceId,
}: RepositoryConfigProps) {
  const dispatch = useAppDispatch()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeploymentModalOpen, setIsDeploymentModalOpen] = useState(false)
  const [latestDeployment, setLatestDeployment] = useState<Deployment | null>(null)
  const [isLoadingDeployment, setIsLoadingDeployment] = useState(false)

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
        if (response.status === 200 && response.data) {
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
            {/* Enable/Disable Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {config.is_enabled ? 'Enabled' : 'Disabled'}
              </span>
              <Switch
                checked={config.is_enabled}
                onCheckedChange={handleEnableToggle}
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
                  {latestDeployment.branch && (
                    <Badge variant="outline" className="text-xs font-normal gap-1">
                      <GitBranch className="size-3" />
                      {latestDeployment.branch}
                    </Badge>
                  )}
                  {latestDeployment.deployed_at ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-muted-foreground cursor-default">
                          deployed {formatDeploymentDate(latestDeployment.deployed_at).relative}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{formatDeploymentDate(latestDeployment.deployed_at).full}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <span className="text-muted-foreground">deployed recently</span>
                  )}
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
