'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  useSidebar,
  SIDEBAR_WIDTH_COLLAPSED,
  SIDEBAR_WIDTH_EXPANDED,
  SIDEBAR_TRANSITION_DURATION,
} from './SidebarContext'
import { SpaceSwitcher } from './SpaceSwitcher'
import { SidebarNav } from './SidebarNav'
import { SidebarChatList } from './SidebarChatList'
import { CreateSpaceModal } from './CreateSpaceModal'
import { ProfileDropdown } from '@/components/header/ProfileDropdown'

function SidebarContent() {
  const { collapsed, toggle } = useSidebar()
  const [createModalOpen, setCreateModalOpen] = React.useState(false)

  return (
    <div className="flex h-full flex-col bg-muted">
      {/* Space Switcher */}
      <div className="border-b border-border p-2">
        <SpaceSwitcher onCreateSpace={() => setCreateModalOpen(true)} />
      </div>

      {/* Navigation */}
      <SidebarNav />

      {/* Chat List */}
      <SidebarChatList />

      {/* Profile & Collapse */}
      <div className="mt-auto border-t border-border p-2 space-y-1">
        {/* Profile Dropdown */}
        <ProfileDropdown collapsed={collapsed} />

        {/* Collapse Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              className={cn(
                'w-full hover:bg-background text-foreground',
                collapsed ? 'justify-center' : 'justify-start gap-3 px-3'
              )}
            >
              {collapsed ? (
                <PanelLeftOpen className="size-5" />
              ) : (
                <>
                  <PanelLeftClose className="size-5" />
                  <span className="text-sm font-medium">Collapse</span>
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            {collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Create Space Modal */}
      <CreateSpaceModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </div>
  )
}

function MobileSidebar() {
  const { mobileOpen, setMobileOpen } = useSidebar()
  const pathname = usePathname()
  const [createModalOpen, setCreateModalOpen] = React.useState(false)

  // Close mobile sidebar on navigation
  React.useEffect(() => {
    setMobileOpen(false)
  }, [pathname, setMobileOpen])

  return (
    <>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[280px] p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription>Main navigation menu</SheetDescription>
          </SheetHeader>
          <div className="flex h-full flex-col bg-muted">
            {/* Space Switcher */}
            <div className="border-b border-border p-2">
              <SpaceSwitcher onCreateSpace={() => setCreateModalOpen(true)} />
            </div>

            {/* Navigation */}
            <SidebarNav />

            {/* Chat List */}
            <SidebarChatList />

            {/* Profile */}
            <div className="mt-auto border-t border-border p-2">
              <ProfileDropdown collapsed={false} />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Create Space Modal */}
      <CreateSpaceModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </>
  )
}

export function Sidebar() {
  const { collapsed, isMobile } = useSidebar()

  // Mobile: render sheet
  if (isMobile) {
    return <MobileSidebar />
  }

  // Desktop: render fixed sidebar
  return (
    <aside
      className="fixed inset-y-0 left-0 z-30 hidden md:block"
      style={{
        width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
        transition: `width ${SIDEBAR_TRANSITION_DURATION}ms ease-out`,
      }}
    >
      <SidebarContent />
    </aside>
  )
}

// Spacer component to offset main content
export function SidebarSpacer() {
  const { collapsed, isMobile } = useSidebar()

  if (isMobile) {
    return null
  }

  return (
    <div
      className="hidden md:block shrink-0"
      style={{
        width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
        transition: `width ${SIDEBAR_TRANSITION_DURATION}ms ease-out`,
      }}
    />
  )
}
