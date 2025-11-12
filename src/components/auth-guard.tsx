"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { tokenService } from "@/services/tokenService"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const hasValidToken = tokenService.hasValidToken()

      // List of public pages that don't require authentication
      const publicPaths = ["/", "/auth", "/auth/google/callback", "/terms", "/privacy", "/policy"]
      const isPublicPage = publicPaths.some(path =>
        path === "/" ? pathname === "/" : pathname.startsWith(path)
      )

      if (!hasValidToken && !isPublicPage) {
        // No valid token and not on public page - redirect to auth
        router.push("/auth")
        return
      }

      // Special handling: if user has valid token and is on auth page, redirect to setup
      const isAuthPage = pathname.startsWith("/auth")
      if (hasValidToken && isAuthPage) {
        // Has valid token but on auth page - redirect to setup
        router.push("/setup")
        return
      }

      // All checks passed
      setIsChecking(false)
    }

    checkAuth()
  }, [router, pathname])

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}