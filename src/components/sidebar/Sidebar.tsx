'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  PanelLeftClose,
  PanelLeftOpen,
  LayoutDashboard,
  Settings,
  MessageSquare,
  Plug,
  ChevronRight,
} from 'lucide-react'
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

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/setup',
    icon: LayoutDashboard,
  },
  {
    title: 'Chat',
    href: '/chat',
    icon: MessageSquare,
  },
  {
    title: 'Integrations',
    href: '/integrations',
    icon: Plug,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]

function SidebarContent() {
  const { collapsed, toggle } = useSidebar()
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-[var(--color-background)] border-r border-[var(--color-border)]">
      {/* Logo/Brand */}
      <div
        className={cn(
          'flex h-14 items-center border-b border-[var(--color-border)] px-4',
          collapsed ? 'justify-center' : 'justify-between'
        )}
      >
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-[var(--color-brand)] flex items-center justify-center">
              <span className="text-sm font-bold text-[var(--color-primary)]">VM</span>
            </div>
            <span className="font-semibold text-[var(--color-text-primary)]">
              Vibe Monitor
            </span>
          </Link>
        )}
        {collapsed && (
          <Link href="/" className="flex items-center justify-center">
            <div className="size-8 rounded-lg bg-[var(--color-brand)] flex items-center justify-center">
              <span className="text-sm font-bold text-[var(--color-primary)]">VM</span>
            </div>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const Icon = item.icon

            const navLink = (
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  'hover:bg-[var(--color-surface-hover)]',
                  isActive
                    ? 'bg-[var(--color-surface-active)] text-[var(--color-text-primary)]'
                    : 'text-[var(--color-text-secondary)]',
                  collapsed && 'justify-center px-2'
                )}
              >
                <Icon className="size-5 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
                {!collapsed && isActive && (
                  <ChevronRight className="ml-auto size-4 text-[var(--color-text-tertiary)]" />
                )}
              </Link>
            )

            if (collapsed) {
              return (
                <li key={item.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>{navLink}</TooltipTrigger>
                    <TooltipContent side="right" sideOffset={8}>
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                </li>
              )
            }

            return <li key={item.href}>{navLink}</li>
          })}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-[var(--color-border)] p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
              className={cn(
                'w-full',
                collapsed ? 'justify-center' : 'justify-start gap-3 px-3'
              )}
            >
              {collapsed ? (
                <PanelLeftOpen className="size-5" />
              ) : (
                <>
                  <PanelLeftClose className="size-5" />
                  <span className="text-sm">Collapse</span>
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            {collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  )
}

function MobileSidebar() {
  const { mobileOpen, setMobileOpen } = useSidebar()
  const pathname = usePathname()

  // Close mobile sidebar on navigation
  React.useEffect(() => {
    setMobileOpen(false)
  }, [pathname, setMobileOpen])

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Main navigation menu</SheetDescription>
        </SheetHeader>
        <div className="flex h-full flex-col bg-[var(--color-background)]">
          {/* Logo/Brand */}
          <div className="flex h-14 items-center border-b border-[var(--color-border)] px-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-[var(--color-brand)] flex items-center justify-center">
                <span className="text-sm font-bold text-[var(--color-primary)]">VM</span>
              </div>
              <span className="font-semibold text-[var(--color-text-primary)]">
                Vibe Monitor
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                const Icon = item.icon

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        'hover:bg-[var(--color-surface-hover)]',
                        isActive
                          ? 'bg-[var(--color-surface-active)] text-[var(--color-text-primary)]'
                          : 'text-[var(--color-text-secondary)]'
                      )}
                    >
                      <Icon className="size-5 shrink-0" />
                      <span>{item.title}</span>
                      {isActive && (
                        <ChevronRight className="ml-auto size-4 text-[var(--color-text-tertiary)]" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
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
