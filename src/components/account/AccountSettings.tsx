'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ProfileSection } from './ProfileSection'
import { DeleteAccountModal } from './DeleteAccountModal'
import { api } from '@/services/api/apiFactory'
import { useAppDispatch } from '@/lib/hooks'
import { setUser, logoutUser } from '@/lib/features/userSlice'
import { clearWorkspaces } from '@/lib/features/workspaceSlice'
import type { ProfileData } from '@/services/api/clients/AccountClient'

export function AccountSettings() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUpdatingNewsletter, setIsUpdatingNewsletter] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await api.account.getProfile()
      if (response.status === 200 && response.data) {
        setProfile(response.data)
      } else {
        setError(response.error || 'Failed to load profile')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNameUpdate = async (name: string) => {
    const response = await api.account.updateProfile({ name })
    if (response.status === 200 && response.data) {
      setProfile(response.data)
      dispatch(setUser({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        created_at: response.data.created_at,
      }))
    } else {
      throw new Error(response.error || 'Failed to update name')
    }
  }

  const handleNewsletterChange = async (checked: boolean) => {
    if (!profile) return

    setIsUpdatingNewsletter(true)
    try {
      const response = await api.account.updateProfile({ newsletter_subscribed: checked })
      if (response.status === 200 && response.data) {
        setProfile(response.data)
      }
    } catch (err) {
      console.error('Failed to update newsletter preference:', err)
    } finally {
      setIsUpdatingNewsletter(false)
    }
  }

  const handleDeleteAccount = async (confirmation: string, password?: string) => {
    const response = await api.account.deleteAccount({ confirmation, password })
    if (response.status === 200 || response.status === 204) {
      await dispatch(logoutUser())
      dispatch(clearWorkspaces())
      router.push('/')
    } else {
      throw new Error(response.error || 'Failed to delete account')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-red-500" />
          <div>
            <h3 className="font-medium text-red-500">Error loading profile</h3>
            <p className="mt-1 text-sm text-muted-foreground">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchProfile}
              className="mt-3"
            >
              Try again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          Account Settings
        </h2>
        <p className="mt-1 text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="space-y-8 divide-y divide-border">
        {/* Profile Section */}
        <ProfileSection
          name={profile.name}
          email={profile.email}
          onNameUpdate={handleNameUpdate}
        />

        {/* Marketing Section */}
        <div className="pt-8 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-foreground">Marketing</h3>
            <p className="text-sm text-muted-foreground">
              Manage your communication preferences.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="newsletter"
              checked={profile.newsletter_subscribed}
              onCheckedChange={handleNewsletterChange}
              disabled={isUpdatingNewsletter}
            />
            <Label
              htmlFor="newsletter"
              className="text-sm font-normal text-foreground cursor-pointer"
            >
              Subscribe to newsletter
            </Label>
            {isUpdatingNewsletter && (
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-8 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-red-500">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Irreversible and destructive actions.
            </p>
          </div>

          <div className="rounded-lg border border-red-500/30 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">
                  Delete Account
                </h4>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data.
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() => setIsDeleteModalOpen(true)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      <DeleteAccountModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        authProvider={profile.auth_provider}
        onDelete={handleDeleteAccount}
      />
    </div>
  )
}
