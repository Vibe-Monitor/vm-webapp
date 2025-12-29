'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { createService } from '@/lib/features/servicesSlice'
import { api } from '@/services/api/apiFactory'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

interface AddServiceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Repository {
  full_name: string
  default_branch: string
}

export function AddServiceModal({ open, onOpenChange }: AddServiceModalProps) {
  const dispatch = useAppDispatch()
  const { currentWorkspace } = useAppSelector((state) => state.workspace)
  const { createLoading } = useAppSelector((state) => state.services)
  const [name, setName] = useState('')
  const [repository, setRepository] = useState('')
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loadingRepos, setLoadingRepos] = useState(false)

  useEffect(() => {
    if (open && currentWorkspace?.id) {
      fetchRepositories()
    }
  }, [open, currentWorkspace?.id])

  const fetchRepositories = async () => {
    if (!currentWorkspace?.id) return

    setLoadingRepos(true)
    try {
      const response = await api.github.getRepositories(currentWorkspace.id)
      if (response.status === 200 && response.data) {
        // Handle both direct array and wrapped object responses
        const data = response.data
        if (Array.isArray(data)) {
          setRepositories(data)
        } else if (data && typeof data === 'object') {
          const wrapped = data as Record<string, unknown>
          if (Array.isArray(wrapped.repositories)) {
            setRepositories(wrapped.repositories as Repository[])
          } else if (Array.isArray(wrapped.data)) {
            setRepositories(wrapped.data as Repository[])
          } else {
            setRepositories([])
          }
        } else {
          setRepositories([])
        }
      }
    } catch {
      toast.error('Failed to fetch repositories')
    } finally {
      setLoadingRepos(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error('Please enter a service name')
      return
    }

    if (!repository) {
      toast.error('Please select a repository')
      return
    }

    if (!currentWorkspace?.id) return

    try {
      await dispatch(
        createService({
          workspaceId: currentWorkspace.id,
          data: {
            name: name.trim(),
            repository_name: repository,
          },
        })
      ).unwrap()

      toast.success(`Service "${name}" created`)
      handleClose()
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error : 'Failed to create service'
      toast.error(errorMessage)
    }
  }

  const handleClose = () => {
    setName('')
    setRepository('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Service</DialogTitle>
          <DialogDescription>
            Create a new service and map it to a repository.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Service Name Input */}
            <div className="space-y-2">
              <Label htmlFor="service-name">Service Name</Label>
              <Input
                id="service-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., user-service, api-gateway"
                autoFocus
              />
            </div>

            {/* Repository Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="repository">Repository</Label>
              <Select value={repository} onValueChange={setRepository} disabled={loadingRepos}>
                <SelectTrigger>
                  {loadingRepos ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" />
                      <span>Loading repositories...</span>
                    </div>
                  ) : (
                    <SelectValue placeholder="Select a repository" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {repositories.length === 0 ? (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      No repositories found. Connect GitHub integration first.
                    </div>
                  ) : (
                    repositories.map((repo) => (
                      <SelectItem key={repo.full_name} value={repo.full_name}>
                        {repo.full_name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createLoading || !name.trim() || !repository}>
              {createLoading ? 'Creating...' : 'Create Service'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
