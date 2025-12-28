'use client'

import * as React from 'react'
import { SidebarProvider, Sidebar, SidebarSpacer } from '@/components/sidebar'
import { AppHeader } from '@/components/header'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <Sidebar />

        {/* Sidebar spacer for desktop */}
        <SidebarSpacer />

        {/* Main content area */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <AppHeader />

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
