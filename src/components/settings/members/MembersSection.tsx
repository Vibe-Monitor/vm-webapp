'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, UserPlus, AlertCircle } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
  fetchMembers,
  fetchInvitations,
  inviteMember,
  updateMemberRole,
  removeMember,
  revokeInvitation,
  clearInviteError,
} from '@/lib/features/membersSlice'
import { MemberRow } from './MemberRow'
import { PendingInvitations } from './PendingInvitations'
import { InviteMemberModal } from './InviteMemberModal'

interface MembersSectionProps {
  workspaceId: string
  isPersonalSpace?: boolean
}

export function MembersSection({ workspaceId, isPersonalSpace }: MembersSectionProps) {
  const dispatch = useAppDispatch()
  const [inviteModalOpen, setInviteModalOpen] = useState(false)

  const {
    members,
    invitations,
    loading,
    error,
    inviteLoading,
    inviteError,
    roleUpdateLoading,
    removeMemberLoading,
    revokeInvitationLoading,
  } = useAppSelector((state) => state.members)

  const currentUser = useAppSelector((state) => state.user.user)
  const currentWorkspace = useAppSelector((state) => state.workspace.currentWorkspace)

  const currentUserRole = currentWorkspace?.user_role || 'user'
  const isOwner = currentUserRole === 'owner'
  const ownerCount = members.filter((m) => m.role === 'owner').length

  useEffect(() => {
    if (workspaceId && !isPersonalSpace) {
      dispatch(fetchMembers(workspaceId))
      dispatch(fetchInvitations(workspaceId))
    }
  }, [dispatch, workspaceId, isPersonalSpace])

  const handleRoleChange = async (userId: string, role: 'owner' | 'user') => {
    await dispatch(updateMemberRole({ workspaceId, userId, data: { role } }))
  }

  const handleRemoveMember = async (userId: string) => {
    if (confirm('Are you sure you want to remove this member from the workspace?')) {
      await dispatch(removeMember({ workspaceId, userId }))
    }
  }

  const handleRevokeInvitation = async (invitationId: string) => {
    await dispatch(revokeInvitation({ workspaceId, invitationId }))
  }

  const handleInvite = async (email: string, role: 'owner' | 'user') => {
    const result = await dispatch(inviteMember({ workspaceId, data: { email, role } }))
    if (inviteMember.fulfilled.match(result)) {
      setInviteModalOpen(false)
      dispatch(clearInviteError())
    }
  }

  const handleOpenInviteModal = () => {
    dispatch(clearInviteError())
    setInviteModalOpen(true)
  }

  if (isPersonalSpace) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Members
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your workspace members and invitations.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Personal Space
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Personal spaces don&apos;t support members. Switch to a team space to collaborate.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading && members.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error && members.length === 0) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Members
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your workspace members and invitations.
          </p>
        </div>

        {isOwner && (
          <Button onClick={handleOpenInviteModal}>
            <UserPlus className="size-4" />
            Invite Member
          </Button>
        )}
      </div>

      <div className="rounded-lg border border-border bg-card">
        {members.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No members found.
          </div>
        ) : (
          members.map((member) => (
            <MemberRow
              key={member.user_id}
              member={member}
              isCurrentUser={member.user_id === currentUser?.id}
              canManage={isOwner}
              isLastOwner={ownerCount === 1}
              onRoleChange={handleRoleChange}
              onRemove={handleRemoveMember}
              roleUpdateLoading={roleUpdateLoading === member.user_id}
              removeMemberLoading={removeMemberLoading === member.user_id}
            />
          ))
        )}
      </div>

      {isOwner && (
        <PendingInvitations
          invitations={invitations}
          onRevoke={handleRevokeInvitation}
          revokeLoading={revokeInvitationLoading}
        />
      )}

      <InviteMemberModal
        open={inviteModalOpen}
        onOpenChange={setInviteModalOpen}
        onInvite={handleInvite}
        loading={inviteLoading}
        error={inviteError}
      />
    </div>
  )
}
