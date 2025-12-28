'use client'

import * as React from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { toggleSidebar, setSidebarCollapsed, hydrateSidebarState } from '@/lib/features/uiSlice'

// Sidebar dimensions
export const SIDEBAR_WIDTH_COLLAPSED = 56 // 56px when collapsed
export const SIDEBAR_WIDTH_EXPANDED = 280 // 280px when expanded
export const SIDEBAR_TRANSITION_DURATION = 200 // 200ms transition
export const SIDEBAR_KEYBOARD_SHORTCUT = '\\' // Cmd/Ctrl + \

interface SidebarContextValue {
  collapsed: boolean
  mobileOpen: boolean
  isMobile: boolean
  toggle: () => void
  setCollapsed: (collapsed: boolean) => void
  setMobileOpen: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const dispatch = useAppDispatch()
  const collapsed = useAppSelector((state) => state.ui.sidebarCollapsed)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  // Hydrate sidebar state from localStorage on mount
  React.useEffect(() => {
    dispatch(hydrateSidebarState())
  }, [dispatch])

  // Track mobile breakpoint
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Keyboard shortcut: Cmd/Ctrl + \
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        if (isMobile) {
          setMobileOpen((prev) => !prev)
        } else {
          dispatch(toggleSidebar())
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dispatch, isMobile])

  const toggle = React.useCallback(() => {
    if (isMobile) {
      setMobileOpen((prev) => !prev)
    } else {
      dispatch(toggleSidebar())
    }
  }, [dispatch, isMobile])

  const setCollapsed = React.useCallback(
    (value: boolean) => {
      dispatch(setSidebarCollapsed(value))
    },
    [dispatch]
  )

  const value = React.useMemo<SidebarContextValue>(
    () => ({
      collapsed,
      mobileOpen,
      isMobile,
      toggle,
      setCollapsed,
      setMobileOpen,
    }),
    [collapsed, mobileOpen, isMobile, toggle, setCollapsed]
  )

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}
