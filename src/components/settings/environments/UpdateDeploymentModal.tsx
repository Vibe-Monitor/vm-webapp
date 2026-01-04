'use client'

import { useState, useEffect } from 'react'
import { Loader2, Rocket } from 'lucide-react'
import { toast } from 'sonner'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchRepositoryBranches } from '@/lib/features/environmentsSlice'
import { api } from '@/services/api/apiFactory'
import { RepositoryBranch } from '@/types/environment'
import { Deployment } from '@/types/deployment'

interface UpdateDeploymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  workspaceId: string
  environmentId: string
  repoFullName: string
  currentDeployment: Deployment | null
  onDeploymentUpdated: (deployment: Deployment) => void
}

export function UpdateDeploymentModal({
  open,
  onOpenChange,
  workspaceId,
  environmentId,
  repoFullName,
  currentDeployment,
  onDeploymentUpdated,
}: UpdateDeploymentModalProps) {
  const dispatch = useAppDispatch()
  const { branchesCache, branchesLoading } = useAppSelector((state) => state.environments)

  const [branch, setBranch] = useState(currentDeployment?.branch || '')
  const [commitSha, setCommitSha] = useState(currentDeployment?.commit_sha || '')
  const [deployedAt, setDeployedAt] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const branches = branchesCache[repoFullName] || []
  const isLoadingBranches = branchesLoading[repoFullName] || false

  useEffect(() => {
    // Fetch branches if not cached
    if (open && !branchesCache[repoFullName] && workspaceId) {
      dispatch(
        fetchRepositoryBranches({
          workspaceId,
          repoFullName,
        })
      )
    }
  }, [dispatch, open, repoFullName, workspaceId, branchesCache])

  // Helper to format date for datetime-local input
  const formatDateTimeLocal = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
  }

  useEffect(() => {
    // Reset form when modal opens
    if (open) {
      setBranch(currentDeployment?.branch || '')
      setCommitSha(currentDeployment?.commit_sha || '')
      // Default to current time, or existing deployment time
      const defaultTime = currentDeployment?.deployed_at
        ? new Date(currentDeployment.deployed_at)
        : new Date()
      setDeployedAt(formatDateTimeLocal(defaultTime))
    }
  }, [open, currentDeployment])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!commitSha.trim()) {
      toast.error('Please enter a commit SHA')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await api.deployments.create(workspaceId, environmentId, {
        repo_full_name: repoFullName,
        commit_sha: commitSha.trim(),
        branch: branch || undefined,
        deployed_at: deployedAt ? new Date(deployedAt).toISOString() : undefined,
      })

      if (response.status === 201 && response.data) {
        toast.success(`Deployment updated for ${repoFullName}`)
        onDeploymentUpdated(response.data)
        onOpenChange(false)
      } else {
        toast.error(response.error || 'Failed to update deployment')
      }
    } catch {
      toast.error('Failed to update deployment')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Rocket className="size-5" />
              Update Deployment
            </DialogTitle>
            <DialogDescription>
              Record the currently deployed version for <strong>{repoFullName}</strong>.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="commit">Commit SHA</Label>
              <Input
                id="commit"
                placeholder="e.g., abc123def456..."
                value={commitSha}
                onChange={(e) => setCommitSha(e.target.value)}
                disabled={isSubmitting}
                maxLength={40}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                The exact commit that was deployed. Available as <code className="bg-muted px-1 rounded">$GITHUB_SHA</code> in GitHub Actions.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="branch">Branch (optional)</Label>
              <Select
                value={branch}
                onValueChange={setBranch}
                disabled={isLoadingBranches || isSubmitting}
              >
                <SelectTrigger>
                  {isLoadingBranches ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      <span>Loading branches...</span>
                    </div>
                  ) : (
                    <SelectValue placeholder="Select branch (optional)" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {branches.map((b: RepositoryBranch) => (
                    <SelectItem key={b.name} value={b.name}>
                      {b.name}
                      {b.is_default && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          (default)
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Helpful context, but commit SHA is the source of truth.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="deployedAt">Deployment Time</Label>
              <Input
                id="deployedAt"
                type="datetime-local"
                value={deployedAt}
                onChange={(e) => setDeployedAt(e.target.value)}
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground">
                When was this version deployed? Defaults to now.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !commitSha.trim()}>
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Deployment'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
