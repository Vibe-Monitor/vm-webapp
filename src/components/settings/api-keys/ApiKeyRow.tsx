'use client'

import { useState } from 'react'
import { Key, Loader2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { ApiKey } from '@/types/deployment'

interface ApiKeyRowProps {
  apiKey: ApiKey
  onDelete: (keyId: string) => Promise<void>
  deleteLoading: boolean
}

export function ApiKeyRow({ apiKey, onDelete, deleteLoading }: ApiKeyRowProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete(apiKey.id)
    setIsDeleting(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="flex items-center justify-between py-3 px-4 border-b border-border last:border-b-0">
      <div className="flex items-center gap-3 min-w-0">
        <Key className="size-4 text-muted-foreground shrink-0" />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground truncate">
              {apiKey.name}
            </span>
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono text-muted-foreground">
              {apiKey.key_prefix}...
            </code>
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Created {formatDate(apiKey.created_at)}
            {apiKey.last_used_at && (
              <span className="ml-2">
                &middot; Last used {formatDate(apiKey.last_used_at)}
              </span>
            )}
          </div>
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground hover:text-destructive"
            disabled={isDeleting || deleteLoading}
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
            <AlertDialogTitle>Delete API Key</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{apiKey.name}</strong>?
              Any CI/CD pipelines using this key will stop working immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
