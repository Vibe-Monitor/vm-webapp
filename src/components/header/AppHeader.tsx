'use client'

import * as React from 'react'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/sidebar'
import { ProfileDropdown } from './ProfileDropdown'

interface AppHeaderProps {
  className?: string
}

export function AppHeader({ className }: AppHeaderProps) {
  const { isMobile, toggle } = useSidebar()

  return (
    <header
      className={cn(
        'sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-border bg-background px-4',
        className
      )}
    >
      {/* Mobile menu toggle */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className="md:hidden"
        >
          <Menu className="size-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Profile dropdown */}
      <ProfileDropdown />
    </header>
  )
}
