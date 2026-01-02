'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  MessageSquarePlus,
  Search,
  Server,
  Layers,
  Plug,
  Settings,
  ChevronRight,
  Eye,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebar } from './SidebarContext'
import { useAppSelector } from '@/lib/hooks'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'

type NavItemAccess = 'full' | 'view' | 'hidden'
type UserRole = 'owner' | 'user'

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  ownerAccess: NavItemAccess
  userAccess: NavItemAccess
}

const navItems: NavItem[] = [
  {
    title: 'New Chat',
    href: '/chat',
    icon: MessageSquarePlus,
    ownerAccess: 'full',
    userAccess: 'full',
  },
  {
    title: 'Search Chats',
    href: '/chat/search',
    icon: Search,
    ownerAccess: 'full',
    userAccess: 'full',
  },
  {
    title: 'Environments',
    href: '/environments',
    icon: Layers,
    ownerAccess: 'full',
    userAccess: 'view',
  },
  {
    title: 'Services',
    href: '/services',
    icon: Server,
    ownerAccess: 'full',
    userAccess: 'view',
  },
  {
    title: 'Integrations',
    href: '/integrations',
    icon: Plug,
    ownerAccess: 'full',
    userAccess: 'view',
  },
  {
    title: 'Space Settings',
    href: '/settings/general',
    icon: Settings,
    ownerAccess: 'full',
    userAccess: 'hidden',
  },
]

function getItemAccess(item: NavItem, role: UserRole): NavItemAccess {
  return role === 'owner' ? item.ownerAccess : item.userAccess
}

export function SidebarNav() {
  const { collapsed } = useSidebar()
  const pathname = usePathname()
  const { currentWorkspace } = useAppSelector((state) => state.workspace)
  const [pendingHref, setPendingHref] = useState<string | null>(null)

  // Clear pending state when navigation completes (pathname changes)
  useEffect(() => {
    setPendingHref(null)
  }, [pathname])

  // Default to 'user' role if not specified, cast string to UserRole
  const roleString = currentWorkspace?.user_role
  const userRole: UserRole = (roleString === 'owner' || roleString === 'user')
    ? roleString
    : 'user'

  // Filter out hidden items
  const visibleItems = navItems.filter(
    (item) => getItemAccess(item, userRole) !== 'hidden'
  )

  const handleNavClick = (href: string) => {
    // Don't set pending if already on this page
    if (pathname === href || pathname.startsWith(`${href}/`)) return
    setPendingHref(href)
  }

  return (
    <nav className="shrink-0 p-2">
      <ul className="flex flex-col gap-1">
        {visibleItems.map((item) => {
          // Show as active if: current page OR pending navigation to this page
          const isCurrentPage = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const isPending = pendingHref === item.href
          const isActive = isCurrentPage || isPending
          const Icon = item.icon
          const access = getItemAccess(item, userRole)
          const isViewOnly = access === 'view'

          const navLink = (
            <Link
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                'hover:bg-background',
                isActive
                  ? 'bg-background text-foreground'
                  : 'text-foreground',
                collapsed && 'justify-center px-2'
              )}
            >
              {isPending ? (
                <Loader2 className="size-5 shrink-0 animate-spin" />
              ) : (
                <Icon className="size-5 shrink-0" />
              )}
              {!collapsed && (
                <>
                  <span className="flex-1">{item.title}</span>
                  {isViewOnly && (
                    <Badge
                      variant="outline"
                      className="h-5 px-1.5 text-[10px] font-normal text-muted-foreground border-border"
                    >
                      <Eye className="size-3 mr-0.5" />
                      View
                    </Badge>
                  )}
                  {isActive && !isViewOnly && !isPending && (
                    <ChevronRight className="size-4 text-muted-foreground" />
                  )}
                </>
              )}
            </Link>
          )

          if (collapsed) {
            return (
              <li key={item.href}>
                <Tooltip>
                  <TooltipTrigger asChild>{navLink}</TooltipTrigger>
                  <TooltipContent side="right" sideOffset={8}>
                    <div className="flex items-center gap-2">
                      <span>{item.title}</span>
                      {isViewOnly && (
                        <Badge
                          variant="outline"
                          className="h-4 px-1 text-[9px] font-normal"
                        >
                          View only
                        </Badge>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </li>
            )
          }

          return <li key={item.href}>{navLink}</li>
        })}
      </ul>
    </nav>
  )
}
