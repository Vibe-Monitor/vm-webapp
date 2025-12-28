'use client'

import * as React from 'react'
import { Menu, User, LogOut, Settings, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useSidebar } from '@/components/sidebar'
import { useAppSelector } from '@/lib/hooks'
import { useLogout } from '@/hooks/useLogout'
import Link from 'next/link'

interface AppHeaderProps {
  className?: string
}

export function AppHeader({ className }: AppHeaderProps) {
  const { isMobile, toggle } = useSidebar()
  const user = useAppSelector((state) => state.user.user)
  const { logout } = useLogout()

  return (
    <header
      className={cn(
        'sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-[var(--color-border)] bg-[var(--color-background)] px-4',
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <div className="flex size-8 items-center justify-center rounded-full bg-[var(--color-surface-active)] text-[var(--color-text-primary)]">
              {user?.name ? (
                <span className="text-sm font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <User className="size-4" />
              )}
            </div>
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {user && (
            <>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-[var(--color-text-tertiary)]">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              <Settings className="mr-2 size-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/help" className="cursor-pointer">
              <HelpCircle className="mr-2 size-4" />
              Help
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={logout}
            className="cursor-pointer text-red-500 focus:text-red-500"
          >
            <LogOut className="mr-2 size-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
