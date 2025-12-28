'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
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
import { DeletionPreview } from './DeletionPreview'
import { api } from '@/services/api/apiFactory'
import type { DeletionPreview as DeletionPreviewData } from '@/services/api/clients/AccountClient'

interface DeleteAccountModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  authProvider: 'google' | 'credentials'
  onDelete: (confirmation: string, password?: string) => Promise<void>
}

export function DeleteAccountModal({
  open,
  onOpenChange,
  authProvider,
  onDelete,
}: DeleteAccountModalProps) {
  const [preview, setPreview] = useState<DeletionPreviewData | null>(null)
  const [isLoadingPreview, setIsLoadingPreview] = useState(false)
  const [previewError, setPreviewError] = useState<string | null>(null)
  const [confirmation, setConfirmation] = useState('')
  const [password, setPassword] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      fetchDeletionPreview()
    } else {
      setPreview(null)
      setConfirmation('')
      setPassword('')
      setDeleteError(null)
      setPreviewError(null)
    }
  }, [open])

  const fetchDeletionPreview = async () => {
    setIsLoadingPreview(true)
    setPreviewError(null)

    try {
      const response = await api.account.getDeletionPreview()
      if (response.status === 200 && response.data) {
        setPreview(response.data)
      } else {
        setPreviewError(response.error || 'Failed to load deletion preview')
      }
    } catch (err) {
      setPreviewError(err instanceof Error ? err.message : 'Failed to load deletion preview')
    } finally {
      setIsLoadingPreview(false)
    }
  }

  const handleDelete = async () => {
    if (confirmation !== 'DELETE') {
      setDeleteError('Please type DELETE to confirm')
      return
    }

    if (authProvider === 'credentials' && !password) {
      setDeleteError('Password is required')
      return
    }

    setIsDeleting(true)
    setDeleteError(null)

    try {
      await onDelete(confirmation, authProvider === 'credentials' ? password : undefined)
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete account')
      setIsDeleting(false)
    }
  }

  const canDelete = preview?.can_delete && confirmation === 'DELETE' &&
    (authProvider === 'google' || password.length > 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-red-500">Delete Account</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {isLoadingPreview ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : previewError ? (
            <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4">
              <p className="text-sm text-red-500">{previewError}</p>
            </div>
          ) : preview ? (
            <>
              <DeletionPreview preview={preview} />

              {preview.can_delete && (
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="space-y-2">
                    <Label htmlFor="confirmation">
                      Type <span className="font-mono font-bold">DELETE</span> to confirm
                    </Label>
                    <Input
                      id="confirmation"
                      value={confirmation}
                      onChange={(e) => setConfirmation(e.target.value)}
                      placeholder="DELETE"
                      disabled={isDeleting}
                    />
                  </div>

                  {authProvider === 'credentials' && (
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        disabled={isDeleting}
                      />
                    </div>
                  )}

                  {deleteError && (
                    <p className="text-sm text-red-500">{deleteError}</p>
                  )}
                </div>
              )}
            </>
          ) : null}
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          {preview?.can_delete && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={!canDelete || isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Account'
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
