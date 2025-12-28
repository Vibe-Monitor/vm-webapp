'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, AlertCircle } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { fetchServices } from '@/lib/features/servicesSlice'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Loader from '@/components/ui/loader'
import { ServiceRow } from './ServiceRow'
import { AddServiceModal } from './AddServiceModal'

export function ServicesSection() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { currentWorkspace } = useAppSelector((state) => state.workspace)
  const { services: rawServices, serviceCount, loading, error } = useAppSelector((state) => state.services)
  const [showAddModal, setShowAddModal] = useState(false)

  // Ensure services is always an array
  const services = Array.isArray(rawServices) ? rawServices : []

  useEffect(() => {
    if (currentWorkspace?.id) {
      dispatch(fetchServices(currentWorkspace.id))
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
      <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-destructive">
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
            <h2 className="text-xl font-semibold text-foreground">Services</h2>
            {serviceCount && (
              <Badge variant="secondary">
                {serviceCount.count}/{serviceCount.limit} services used
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Map your services to repositories for accurate code analysis
          </p>
        </div>
        {services.length > 0 && (
          <Button onClick={() => setShowAddModal(true)} disabled={isAtLimit}>
            <Plus className="mr-2 size-4" />
            Add Service
          </Button>
        )}
      </div>

      {/* Upgrade Prompt */}
      {isAtLimit && !serviceCount?.is_paid && (
        <div className="flex items-center gap-3 rounded-lg border border-warning/20 bg-warning/10 p-4">
          <AlertCircle className="size-5 text-warning" />
          <div className="flex-1">
            <p className="font-medium text-warning">Service limit reached</p>
            <p className="text-sm text-muted-foreground">
              Upgrade to Pro to add unlimited services ($5/service)
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => router.push('/settings/billing')}>
            Upgrade
          </Button>
        </div>
      )}

      {/* Helper Text */}
      <p className="text-sm text-muted-foreground">
        One repo can have multiple services, but each service maps to exactly one repo
      </p>

      {/* Services Table */}
      {services.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            No services configured yet. Add a service to get started.
          </p>
          <Button className="mt-4" onClick={() => setShowAddModal(true)} disabled={isAtLimit}>
            <Plus className="mr-2 size-4" />
            Add Service
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border border-border">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_1fr_auto] gap-4 border-b border-border bg-secondary px-4 py-3 text-sm font-medium text-muted-foreground">
            <div>Service Name</div>
            <div>Repository</div>
            <div>Actions</div>
          </div>
          {/* Table Body */}
          <div className="divide-y divide-border">
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
