'use client'

import * as React from 'react'
import { User, LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAppSelector } from '@/lib/hooks'
import { useLogout } from '@/hooks/useLogout'
import Link from 'next/link'

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

interface ProfileDropdownProps {
  collapsed?: boolean
}

export function ProfileDropdown({ collapsed = false }: ProfileDropdownProps) {
  const user = useAppSelector((state) => state.user.user)
  const { logout } = useLogout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={
            collapsed
              ? 'w-full justify-center px-2 py-2 rounded-lg hover:bg-background'
              : 'w-full justify-start gap-3 px-3 py-2 rounded-lg hover:bg-background'
          }
        >
          <div className="flex size-5 items-center justify-center rounded-full bg-background text-foreground shrink-0">
            {user?.name ? (
              <span className="text-[10px] font-medium">
                {getInitials(user.name)}
              </span>
            ) : (
              <User className="size-3.5" />
            )}
          </div>
          {!collapsed && (
            <span className="text-sm font-medium text-foreground">
              {user?.name || user?.email || 'Account'}
            </span>
          )}
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" sideOffset={8} className="w-56">
        {user && (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem asChild>
          <Link href="/account" className="cursor-pointer">
            <Settings className="mr-2 size-4" />
            Account Settings
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
  )
}
