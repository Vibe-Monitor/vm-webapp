'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { Plus, AlertCircle } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchServices, fetchServiceCount } from '@/lib/features/servicesSlice'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Loader from '@/components/ui/loader'
import { ServiceRow } from './ServiceRow'
import { AddServiceModal } from './AddServiceModal'

export function ServicesSection() {
  const dispatch = useAppDispatch()
  const { currentWorkspace } = useAppSelector((state) => state.workspace)
  const { services: rawServices, serviceCount, loading, error } = useAppSelector((state) => state.services)
  const [showAddModal, setShowAddModal] = useState(false)

  // Ensure services is always an array
  const services = Array.isArray(rawServices) ? rawServices : []

  useEffect(() => {
    if (currentWorkspace?.id) {
      dispatch(fetchServices(currentWorkspace.id))
      dispatch(fetchServiceCount(currentWorkspace.id))
    }
  }, [dispatch, currentWorkspace?.id])

  const isAtLimit = serviceCount ? serviceCount.count >= serviceCount.limit : false

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader message="Loading services..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Services</h2>
            {serviceCount && (
              <Badge variant="secondary">
                {serviceCount.count}/{serviceCount.limit} services used
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Map your services to repositories for accurate code analysis
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} disabled={isAtLimit}>
          <Plus className="mr-2 size-4" />
          Add Service
        </Button>
      </div>

      {/* Upgrade Prompt */}
      {isAtLimit && !serviceCount?.is_paid && (
        <div className="flex items-center gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
          <AlertCircle className="size-5 text-yellow-500" />
          <div className="flex-1">
            <p className="font-medium text-yellow-500">Service limit reached</p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Upgrade to Pro to add unlimited services ($5/service)
            </p>
          </div>
          <Button variant="outline" size="sm">
            Upgrade
          </Button>
        </div>
      )}

      {/* Helper Text */}
      <p className="text-sm text-[var(--color-text-tertiary)]">
        One repo can have multiple services, but each service maps to exactly one repo
      </p>

      {/* Services Table */}
      {services.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[var(--color-border)] p-12 text-center">
          <p className="text-[var(--color-text-secondary)]">
            No services configured yet. Add a service to get started.
          </p>
          <Button className="mt-4" onClick={() => setShowAddModal(true)} disabled={isAtLimit}>
            <Plus className="mr-2 size-4" />
            Add Service
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border border-[var(--color-border)]">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_1fr_auto] gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)]">
            <div>Service Name</div>
            <div>Repository</div>
            <div>Actions</div>
          </div>
          {/* Table Body */}
          <div className="divide-y divide-[var(--color-border)]">
            {services.map((service) => (
              <ServiceRow key={service.id} service={service} />
            ))}
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      <AddServiceModal open={showAddModal} onOpenChange={setShowAddModal} />
    </div>
  )
}
