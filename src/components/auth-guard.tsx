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
    

      // List of protected routes that require authentication
      const protectedPaths = ["/setup", "/github/callback"]
      const isProtectedPage = protectedPaths.some(path => pathname.startsWith(path))

      // Only redirect to auth if trying to access a known protected route without authentication
      if (!hasValidToken && isProtectedPage) {
        // No valid token and trying to access protected page - redirect to auth
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

      // All checks passed - let Next.js handle unknown routes (404)
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