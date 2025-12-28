'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { updateService } from '@/lib/features/servicesSlice'
import { api } from '@/services/api/apiFactory'
import type { Service } from '@/services/api/clients/ServicesClient'
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

interface EditServiceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service: Service
}

interface Repository {
  full_name: string
  default_branch: string
}

export function EditServiceModal({ open, onOpenChange, service }: EditServiceModalProps) {
  const dispatch = useAppDispatch()
  const { currentWorkspace } = useAppSelector((state) => state.workspace)
  const { updateLoading } = useAppSelector((state) => state.services)
  const [name, setName] = useState(service.name)
  const [repository, setRepository] = useState(service.repository_name || '')
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loadingRepos, setLoadingRepos] = useState(false)

  useEffect(() => {
    if (open) {
      setName(service.name)
      setRepository(service.repository_name || '')
      if (currentWorkspace?.id) {
        fetchRepositories()
      }
    }
  }, [open, service, currentWorkspace?.id])

  const fetchRepositories = async () => {
    if (!currentWorkspace?.id) return

    setLoadingRepos(true)
    try {
      const response = await api.github.getRepositories(currentWorkspace.id)
      if (response.status === 200 && response.data) {
        setRepositories(response.data)
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

    const currentRepo = service.repository_name || ''
    const hasChanges = name.trim() !== service.name || repository !== currentRepo
    if (!hasChanges) {
      onOpenChange(false)
      return
    }

    try {
      await dispatch(
        updateService({
          workspaceId: currentWorkspace.id,
          serviceId: service.id,
          data: {
            name: name.trim(),
            repository_name: repository,
          },
        })
      ).unwrap()

      toast.success('Service updated')
      onOpenChange(false)
    } catch {
      toast.error('Failed to update service')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogDescription>Update the service name or repository mapping.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            {/* Service Name Input */}
            <div className="space-y-2">
              <Label htmlFor="edit-service-name">Service Name</Label>
              <Input
                id="edit-service-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., user-service, api-gateway"
                autoFocus
              />
            </div>

            {/* Repository Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="edit-repository">Repository</Label>
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
                  {repositories.map((repo) => (
                    <SelectItem key={repo.full_name} value={repo.full_name}>
                      {repo.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateLoading || !name.trim() || !repository}>
              {updateLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
