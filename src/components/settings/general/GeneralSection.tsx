'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAppDispatch } from '@/lib/hooks'
import { fetchWorkspaces } from '@/lib/features/workspaceSlice'
import { api } from '@/services/api/apiFactory'
import { toast } from 'sonner'

interface GeneralSectionProps {
  workspaceId: string
  workspaceName: string
  workspaceType: 'personal' | 'team'
}

export function GeneralSection({ workspaceId, workspaceName, workspaceType }: GeneralSectionProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()

  // Rename state
  const [name, setName] = useState(workspaceName)
  const [isSaving, setIsSaving] = useState(false)

  // Sync local name state when workspace name changes (e.g., after save)
  useEffect(() => {
    setName(workspaceName)
  }, [workspaceName])

  // Delete state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const hasNameChanged = name.trim() !== workspaceName && name.trim().length > 0

  const handleSaveName = async () => {
    if (!hasNameChanged) return

    setIsSaving(true)
    try {
      const response = await api.workspace.update(workspaceId, { name: name.trim() })
      if (response.status === 200) {
        toast.success('Workspace name updated')
        // Refresh workspaces to update sidebar
        dispatch(fetchWorkspaces())
      } else {
        toast.error(response.error || 'Failed to update workspace name')
      }
    } catch (error) {
      toast.error('Failed to update workspace name')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (deleteConfirmation !== workspaceName) return

    setIsDeleting(true)
    try {
      const response = await api.workspace.delete(workspaceId)
      if (response.status === 200 || response.status === 204) {
        toast.success('Workspace deleted')
        // Refresh workspaces and redirect
        await dispatch(fetchWorkspaces())
        router.push('/chat')
      } else {
        toast.error(response.error || 'Failed to delete workspace')
        setIsDeleting(false)
      }
    } catch (error) {
      toast.error('Failed to delete workspace')
      setIsDeleting(false)
    }
  }

  const closeDeleteModal = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false)
      setDeleteConfirmation('')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-foreground">General</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your workspace settings
        </p>
      </div>

      {/* Workspace Name */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-foreground">Workspace Name</h3>
            <p className="text-sm text-muted-foreground mt-1">
              This is the name of your workspace as it appears in the sidebar.
            </p>
          </div>

          <div className="flex gap-3">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Workspace name"
              className="max-w-md"
            />
            <Button
              onClick={handleSaveName}
              disabled={!hasNameChanged || isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-lg border border-red-500/50 bg-red-500/5 p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-red-500">Danger Zone</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Irreversible and destructive actions
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <div>
              <p className="text-sm font-medium text-foreground">Delete this workspace</p>
              <p className="text-sm text-muted-foreground">
                Once deleted, all data in this workspace will be permanently removed.
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => setDeleteModalOpen(true)}
              className="shrink-0"
            >
              Delete Workspace
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={closeDeleteModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="size-5" />
              Delete Workspace
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the workspace
              and all associated data including chats, configurations, and member access.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="rounded-lg border border-border bg-muted/50 p-3">
              <p className="text-sm text-muted-foreground">
                Workspace to be deleted:
              </p>
              <p className="font-medium text-foreground">{workspaceName}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delete-confirmation">
                Type <span className="font-mono font-bold">{workspaceName}</span> to confirm
              </Label>
              <Input
                id="delete-confirmation"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder={workspaceName}
                disabled={isDeleting}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={closeDeleteModal}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteConfirmation !== workspaceName || isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                'Delete Workspace'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
