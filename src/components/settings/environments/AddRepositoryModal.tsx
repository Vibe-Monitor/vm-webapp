'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
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
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
  fetchAvailableRepositories,
  fetchRepositoryBranches,
  addRepositoryConfig,
} from '@/lib/features/environmentsSlice'

interface AddRepositoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  environmentId: string
  workspaceId: string
}

export function AddRepositoryModal({
  open,
  onOpenChange,
  environmentId,
  workspaceId,
}: AddRepositoryModalProps) {
  const dispatch = useAppDispatch()
  const { availableRepositories, branchesCache, branchesLoading } = useAppSelector(
    (state) => state.environments
  )

  const [selectedRepo, setSelectedRepo] = useState<string>('')
  const [selectedBranch, setSelectedBranch] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingRepos, setIsLoadingRepos] = useState(false)

  // Fetch available repositories when modal opens
  useEffect(() => {
    if (open && environmentId && workspaceId) {
      setIsLoadingRepos(true)
      dispatch(fetchAvailableRepositories({ workspaceId, environmentId })).finally(() => {
        setIsLoadingRepos(false)
      })
    }
  }, [open, environmentId, workspaceId, dispatch])

  // Fetch branches when a repository is selected
  useEffect(() => {
    if (selectedRepo && workspaceId) {
      dispatch(fetchRepositoryBranches({ workspaceId, repoFullName: selectedRepo }))
    }
  }, [selectedRepo, workspaceId, dispatch])

  // Reset branch when repo changes
  useEffect(() => {
    setSelectedBranch('')
  }, [selectedRepo])

  const branches = selectedRepo ? branchesCache[selectedRepo] || [] : []
  const isLoadingBranches = selectedRepo ? branchesLoading[selectedRepo] || false : false

  // Find default branch for the selected repo
  const selectedRepoData = availableRepositories.find((r) => r.full_name === selectedRepo)
  const defaultBranch = selectedRepoData?.default_branch

  const handleRepoChange = (value: string) => {
    setSelectedRepo(value)
  }

  const handleBranchChange = (value: string) => {
    setSelectedBranch(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedRepo || !selectedBranch) {
      toast.error('Please select both repository and branch')
      return
    }

    setIsSubmitting(true)
    try {
      await dispatch(
        addRepositoryConfig({
          workspaceId,
          environmentId,
          data: {
            repo_full_name: selectedRepo,
            branch_name: selectedBranch,
            is_enabled: true,
          },
        })
      ).unwrap()

      toast.success(`Repository "${selectedRepo}" added successfully`)
      handleClose()
    } catch {
      toast.error('Failed to add repository')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setSelectedRepo('')
    setSelectedBranch('')
    onOpenChange(false)
  }

  const canSubmit = selectedRepo && selectedBranch && !isSubmitting

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Repository</DialogTitle>
            <DialogDescription>
              Select a repository and branch to add to this environment.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Repository Select */}
            <div className="grid gap-2">
              <Label htmlFor="repository">Repository</Label>
              <Select
                value={selectedRepo}
                onValueChange={handleRepoChange}
                disabled={isLoadingRepos || isSubmitting}
              >
                <SelectTrigger id="repository">
                  {isLoadingRepos ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      <span>Loading repositories...</span>
                    </div>
                  ) : (
                    <SelectValue placeholder="Select a repository" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {availableRepositories.length === 0 ? (
                    <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                      No repositories available.
                      <br />
                      Connect GitHub or all repos are already added.
                    </div>
                  ) : (
                    availableRepositories.map((repo) => (
                      <SelectItem key={repo.full_name} value={repo.full_name}>
                        <div className="flex items-center gap-2">
                          <span>{repo.full_name}</span>
                          {repo.is_private && (
                            <span className="text-xs text-muted-foreground">(private)</span>
                          )}
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Branch Select */}
            <div className="grid gap-2">
              <Label htmlFor="branch">
                Branch <span className="text-red-500">*</span>
              </Label>
              <Select
                value={selectedBranch}
                onValueChange={handleBranchChange}
                disabled={!selectedRepo || isLoadingBranches || isSubmitting}
              >
                <SelectTrigger id="branch" className="w-full overflow-hidden">
                  {isLoadingBranches ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      <span>Loading branches...</span>
                    </div>
                  ) : (
                    <SelectValue
                      placeholder={
                        !selectedRepo
                          ? 'Select a repository first'
                          : defaultBranch
                            ? `Select branch (default: ${defaultBranch})`
                            : 'Select a branch'
                      }
                    />
                  )}
                </SelectTrigger>
                <SelectContent className="max-w-[350px]">
                  {branches.map((branch) => (
                    <SelectItem key={branch.name} value={branch.name} title={branch.name}>
                      <span className="truncate max-w-[280px] inline-block">{branch.name}</span>
                      {branch.is_default && (
                        <span className="ml-2 text-xs text-muted-foreground shrink-0">(default)</span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Select the branch to use for code context in this environment.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Repository'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
