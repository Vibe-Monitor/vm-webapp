'use client'

import * as React from 'react'
import { useState } from 'react'
import { Check, Pencil, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ProfileSectionProps {
  name: string
  email: string
  onNameUpdate: (name: string) => Promise<void>
}

export function ProfileSection({ name, email, onNameUpdate }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(name)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    if (!editedName.trim()) {
      setError('Name is required')
      return
    }

    if (editedName.trim() === name) {
      setIsEditing(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await onNameUpdate(editedName.trim())
      setIsEditing(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update name')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditedName(name)
    setIsEditing(false)
    setError(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Your personal account information.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Input
                id="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="max-w-sm"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Check className="size-4 text-green-500" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancel}
                disabled={isLoading}
              >
                <X className="size-4 text-red-500" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-foreground">{name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                className="size-6"
              >
                <Pencil className="size-3" />
              </Button>
            </div>
          )}
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{email}</span>
            <span className="text-xs text-muted-foreground">(read-only)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
