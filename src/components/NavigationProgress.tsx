'use client'

import { useEffect, useState, useCallback } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * Global navigation progress indicator.
 * Shows a loading bar at the top of the viewport during route transitions.
 *
 * How it works:
 * 1. Listens for clicks on internal links via event delegation
 * 2. Shows progress bar when navigation starts
 * 3. Hides when pathname/searchParams change (navigation complete)
 */
export function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)
  const [progress, setProgress] = useState(0)

  // Handle link clicks to detect navigation start
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')

      if (!link) return

      const href = link.getAttribute('href')
      if (!href) return

      // Only handle internal links
      if (href.startsWith('/') && !href.startsWith('//')) {
        // Don't show loading for same page
        if (href === pathname) return

        // Check if it's a hash link on same page
        if (href.startsWith('#')) return

        // Start navigation progress
        setIsNavigating(true)
        setProgress(0)
      }
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [pathname])

  // Animate progress while navigating
  useEffect(() => {
    if (!isNavigating) return

    // Quick initial progress
    setProgress(30)

    const timer1 = setTimeout(() => setProgress(50), 100)
    const timer2 = setTimeout(() => setProgress(70), 300)
    const timer3 = setTimeout(() => setProgress(85), 600)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [isNavigating])

  // Complete progress when navigation finishes
  useEffect(() => {
    if (isNavigating) {
      setProgress(100)
      const timer = setTimeout(() => {
        setIsNavigating(false)
        setProgress(0)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [pathname, searchParams])

  if (!isNavigating && progress === 0) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
      <div
        className="h-full bg-primary transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
