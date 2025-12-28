'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { RoleSelector } from './RoleSelector'
import { Loader2, Trash2 } from 'lucide-react'
import type { Member } from '@/services/api/clients/MembersClient'

interface MemberRowProps {
  member: Member
  isCurrentUser: boolean
  canManage: boolean
  isLastOwner: boolean
  onRoleChange: (userId: string, role: 'owner' | 'user') => void
  onRemove: (userId: string) => void
  roleUpdateLoading: boolean
  removeMemberLoading: boolean
}

export function MemberRow({
  member,
  isCurrentUser,
  canManage,
  isLastOwner,
  onRoleChange,
  onRemove,
  roleUpdateLoading,
  removeMemberLoading,
}: MemberRowProps) {
  const isOwnerAndLast = member.role === 'owner' && isLastOwner

  return (
    <div className="flex items-center justify-between py-3 px-4 border-b border-[var(--color-border)] last:border-b-0">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {member.avatar_url ? (
          <Image
            src={member.avatar_url}
            alt={member.name}
            width={32}
            height={32}
            className="size-8 rounded-full shrink-0"
          />
        ) : (
          <div className="size-8 rounded-full bg-[var(--color-surface-active)] flex items-center justify-center shrink-0">
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              {member.name?.charAt(0)?.toUpperCase() || member.email?.charAt(0)?.toUpperCase()}
            </span>
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
              {member.name}
            </p>
            {isCurrentUser && (
              <span className="text-xs text-[var(--color-text-tertiary)]">(you)</span>
            )}
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] truncate">
            {member.email}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {canManage && !isCurrentUser ? (
          <RoleSelector
            value={member.role}
            onChange={(role) => onRoleChange(member.user_id, role)}
            disabled={roleUpdateLoading || isOwnerAndLast}
            isOwner={isOwnerAndLast}
          />
        ) : (
          <span className="text-sm text-[var(--color-text-secondary)] w-24 text-center capitalize">
            {member.role}
          </span>
        )}

        {canManage && !isCurrentUser && !isOwnerAndLast && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(member.user_id)}
            disabled={removeMemberLoading}
            className="text-[var(--color-text-secondary)] hover:text-red-500"
          >
            {removeMemberLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
