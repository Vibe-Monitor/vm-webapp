'use client'

import * as React from 'react'
import { useState } from 'react'
import { MoreHorizontal, Edit2, Trash2, GitBranch } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { deleteService } from '@/lib/features/servicesSlice'
import type { Service } from '@/services/api/clients/ServicesClient'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { EditServiceModal } from './EditServiceModal'
import { toast } from 'sonner'

interface ServiceRowProps {
  service: Service
}

export function ServiceRow({ service }: ServiceRowProps) {
  const dispatch = useAppDispatch()
  const { currentWorkspace } = useAppSelector((state) => state.workspace)
  const { deleteLoading } = useAppSelector((state) => state.services)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDelete = async () => {
    if (!currentWorkspace?.id) return

    try {
      await dispatch(
        deleteService({
          workspaceId: currentWorkspace.id,
          serviceId: service.id,
        })
      ).unwrap()
      toast.success(`Service "${service.name}" deleted`)
      setShowDeleteDialog(false)
    } catch {
      toast.error('Failed to delete service')
    }
  }

  return (
    <>
      <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-4 px-4 py-3">
        {/* Service Name */}
        <div className="font-medium text-[var(--color-text-primary)]">{service.name}</div>

        {/* Repository */}
        <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
          <GitBranch className="size-4" />
          <span>{service.repository_full_name}</span>
        </div>

        {/* Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setShowEditModal(true)}>
              <Edit2 className="mr-2 size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setShowDeleteDialog(true)}
              className="text-red-400 focus:text-red-400"
            >
              <Trash2 className="mr-2 size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Edit Modal */}
      <EditServiceModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        service={service}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{service.name}&quot;? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteLoading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
