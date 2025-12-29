'use client'

import * as React from 'react'
import { Menu } from 'lucide-react'
import { SidebarProvider, Sidebar, SidebarSpacer, useSidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'

interface AppLayoutProps {
  children: React.ReactNode
}

function MobileMenuToggle() {
  const { isMobile, setMobileOpen } = useSidebar()

  if (!isMobile) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setMobileOpen(true)}
      className="fixed top-3 left-3 z-40 md:hidden bg-background/80 backdrop-blur-sm border border-border shadow-sm"
    >
      <Menu className="size-5" />
      <span className="sr-only">Open menu</span>
    </Button>
  )
}

function AppLayoutContent({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Sidebar spacer for desktop */}
      <SidebarSpacer />

      {/* Mobile menu toggle */}
      <MobileMenuToggle />

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  )
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </SidebarProvider>
  )
}
