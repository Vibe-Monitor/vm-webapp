"use client"

import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DynamicHeader } from "@/components/dynamic-header"
import { AuthGuard } from "@/components/auth-guard"

const authPaths = ["/auth", "/auth/google/callback"]


export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Check if current path is an auth page
  const isAuthPage = authPaths.some(path => pathname.startsWith(path))

  // Check if current path should not show sidebar (exact match for /workspace, but show for workspace/id)
  const shouldHideSidebar = pathname === "/workspace"

  return (
    <AuthGuard>
      {isAuthPage || shouldHideSidebar ? (
        // Render without sidebar for auth pages and workspace selection page
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      ) : (
        // Render with sidebar for all other pages (including workspace/id)
        <SidebarProvider>
          <div className="flex h-screen w-full overflow-hidden">
            <AppSidebar />
            <SidebarInset className="flex-1 min-w-0 min-h-0">
              <DynamicHeader />
              <div className="flex flex-1 flex-col h-full overflow-auto">
                {children}
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      )}
    </AuthGuard>
  )
}