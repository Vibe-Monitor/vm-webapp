'use client'

import { Button } from '@/components/ui/button'
import { Loader2, X } from 'lucide-react'
import type { Invitation } from '@/services/api/clients/MembersClient'

interface PendingInvitationsProps {
  invitations: Invitation[]
  onRevoke: (invitationId: string) => void
  revokeLoading: string | null
}

function getExpiryText(expiresAt: string): string {
  const now = new Date()
  const expires = new Date(expiresAt)
  const diffMs = expires.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return 'Expired'
  } else if (diffDays === 0) {
    return 'Expires today'
  } else if (diffDays === 1) {
    return 'Expires in 1 day'
  } else {
    return `Expires in ${diffDays} days`
  }
}

export function PendingInvitations({
  invitations,
  onRevoke,
  revokeLoading,
}: PendingInvitationsProps) {
  const pendingInvitations = invitations.filter((inv) => inv.status === 'pending')

  if (pendingInvitations.length === 0) {
    return null
  }

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-foreground mb-3">
        Pending Invitations
      </h3>
      <div className="rounded-lg border border-border bg-card">
        {pendingInvitations.map((invitation) => (
          <div
            key={invitation.id}
            className="flex items-center justify-between py-3 px-4 border-b border-border last:border-b-0"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="size-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                <span className="text-sm font-medium text-foreground">
                  {invitation.invitee_email?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {invitation.invitee_email}
                </p>
                <p className="text-xs text-muted-foreground">
                  {getExpiryText(invitation.expires_at)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-sm text-muted-foreground capitalize">
                {invitation.role}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRevoke(invitation.id)}
                disabled={revokeLoading === invitation.id}
                className="text-muted-foreground hover:text-red-500"
              >
                {revokeLoading === invitation.id ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <X className="size-4" />
                )}
                <span className="ml-1">Revoke</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
