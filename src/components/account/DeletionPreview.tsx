'use client'

import * as React from 'react'
import { AlertTriangle, XCircle, Trash2, LogOut } from 'lucide-react'
import type { DeletionPreview as DeletionPreviewData } from '@/services/api/clients/AccountClient'

interface DeletionPreviewProps {
  preview: DeletionPreviewData
}

export function DeletionPreview({ preview }: DeletionPreviewProps) {
  const { blocking_workspaces, workspaces_to_delete, workspaces_to_leave } = preview

  return (
    <div className="space-y-4">
      {blocking_workspaces.length > 0 && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4">
          <div className="flex items-start gap-3">
            <XCircle className="mt-0.5 size-5 shrink-0 text-red-500" />
            <div className="space-y-2">
              <h4 className="font-medium text-red-500">
                Cannot delete account
              </h4>
              <p className="text-sm text-[var(--color-text-secondary)]">
                You are the only owner of the following workspaces. Transfer ownership or delete these workspaces first:
              </p>
              <ul className="mt-2 space-y-1">
                {blocking_workspaces.map((ws) => (
                  <li key={ws.id} className="text-sm text-[var(--color-text-primary)]">
                    <span className="font-medium">{ws.name}</span>
                    <span className="text-[var(--color-text-tertiary)]"> - {ws.reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {workspaces_to_delete.length > 0 && (
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <div className="flex items-start gap-3">
            <Trash2 className="mt-0.5 size-5 shrink-0 text-red-500" />
            <div className="space-y-2">
              <h4 className="font-medium text-[var(--color-text-primary)]">
                Workspaces to be deleted
              </h4>
              <p className="text-sm text-[var(--color-text-secondary)]">
                These workspaces will be permanently deleted along with all their data:
              </p>
              <ul className="mt-2 space-y-1">
                {workspaces_to_delete.map((ws) => (
                  <li key={ws.id} className="text-sm text-[var(--color-text-primary)]">
                    {ws.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {workspaces_to_leave.length > 0 && (
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <div className="flex items-start gap-3">
            <LogOut className="mt-0.5 size-5 shrink-0 text-[var(--color-text-secondary)]" />
            <div className="space-y-2">
              <h4 className="font-medium text-[var(--color-text-primary)]">
                Workspaces you will leave
              </h4>
              <p className="text-sm text-[var(--color-text-secondary)]">
                You will be removed from these workspaces:
              </p>
              <ul className="mt-2 space-y-1">
                {workspaces_to_leave.map((ws) => (
                  <li key={ws.id} className="text-sm text-[var(--color-text-primary)]">
                    {ws.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {blocking_workspaces.length === 0 && (
        <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-yellow-500" />
            <div>
              <h4 className="font-medium text-yellow-500">
                This action is irreversible
              </h4>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Once you delete your account, there is no going back. All your data will be permanently removed.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
