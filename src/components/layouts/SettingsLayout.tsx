'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { User, Shield, Bell, Palette, Plug, Layers } from 'lucide-react'

interface SettingsLayoutProps {
  children: React.ReactNode
}

interface SettingsNavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const settingsNavItems: SettingsNavItem[] = [
  {
    title: 'Profile',
    href: '/settings/profile',
    icon: User,
  },
  {
    title: 'Security',
    href: '/settings/security',
    icon: Shield,
  },
  {
    title: 'Notifications',
    href: '/settings/notifications',
    icon: Bell,
  },
  {
    title: 'Appearance',
    href: '/settings/appearance',
    icon: Palette,
  },
  {
    title: 'Integrations',
    href: '/settings/integrations',
    icon: Plug,
  },
  {
    title: 'Environments',
    href: '/settings/environments',
    icon: Layers,
  },
]

export function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      {/* Settings sidebar navigation */}
      <aside className="lg:w-64 lg:shrink-0">
        <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible pb-2 lg:pb-0">
          {settingsNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                  'hover:bg-[var(--color-surface-hover)]',
                  isActive
                    ? 'bg-[var(--color-surface-active)] text-[var(--color-text-primary)]'
                    : 'text-[var(--color-text-secondary)]'
                )}
              >
                <Icon className="size-4 shrink-0" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Settings content */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
    </div>
  )
}
