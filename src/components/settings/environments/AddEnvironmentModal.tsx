'use client'

import { useState } from 'react'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { createEnvironment, clearCreateError } from '@/lib/features/environmentsSlice'

interface AddEnvironmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  workspaceId: string
}

export function AddEnvironmentModal({
  open,
  onOpenChange,
  workspaceId,
}: AddEnvironmentModalProps) {
  const dispatch = useAppDispatch()
  const { createLoading, createError } = useAppSelector((state) => state.environments)

  const [name, setName] = useState('')
  const [autoDiscovery, setAutoDiscovery] = useState(true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error('Environment name is required')
      return
    }

    try {
      await dispatch(
        createEnvironment({
          workspaceId,
          data: {
            name: name.trim(),
            auto_discovery: autoDiscovery,
          },
        })
      ).unwrap()

      toast.success(`Environment "${name}" created successfully`)
      handleClose()
    } catch {
      // Error is handled by the slice
    }
  }

  const handleClose = () => {
    setName('')
    setAutoDiscovery(true)
    dispatch(clearCreateError())
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Environment</DialogTitle>
            <DialogDescription>
              Create a new environment. The name should match your log environment
              attribute.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Environment Name</Label>
              <Input
                id="name"
                placeholder="e.g., production, staging, development"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={createLoading}
                autoFocus
              />
              <p className="text-xs text-[var(--color-text-tertiary)]">
                This should match the environment attribute in your logs (e.g.,
                production, staging).
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-discovery">Auto-discovery</Label>
                <p className="text-xs text-[var(--color-text-tertiary)]">
                  Automatically discover repositories from GitHub
                </p>
              </div>
              <Switch
                id="auto-discovery"
                checked={autoDiscovery}
                onCheckedChange={setAutoDiscovery}
                disabled={createLoading}
              />
            </div>

            {createError && (
              <p className="text-sm text-red-500">{createError}</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={createLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createLoading || !name.trim()}>
              {createLoading ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Environment'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
