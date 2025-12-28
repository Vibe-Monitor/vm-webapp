'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Bot, Users, CreditCard } from 'lucide-react'

interface SettingsLayoutProps {
  children: React.ReactNode
}

interface SettingsNavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

// Space Settings only - Environments, Services, Integrations are now top-level pages
const settingsNavItems: SettingsNavItem[] = [
  {
    title: 'LLM Config',
    href: '/settings/llm',
    icon: Bot,
  },
  {
    title: 'Members',
    href: '/settings/members',
    icon: Users,
  },
  {
    title: 'Billing',
    href: '/settings/billing',
    icon: CreditCard,
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
