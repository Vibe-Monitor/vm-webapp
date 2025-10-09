"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
  Home,
  Search,
  Settings,
  BarChart3,
  Activity,
  Shield,
  ChevronUp,
  User2,
  CreditCard,
  LogOut,
  Crown,
  Database,
  CheckCircle,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchUserProfile, clearUser } from "@/lib/features/userSlice"
import { fetchWorkspaces } from "@/lib/features/workspaceSlice"
import { tokenService } from "@/services/tokenService"
import { CookieUtils } from "@/utils/cookieUtils"
import { WorkspaceSelector } from "@/components/workspace-selector"
import GrafanaConnect from "@/components/workspace/GrafanaConnect"
import { apiService } from "@/services/apiService"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"

const items = [
  {
    title: "Home",
    url: "/workspace",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Logs",
    url: "/logs",
    icon: Activity,
  },
  {
    title: "Monitoring",
    url: "/monitoring",
    icon: Shield,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const { user, loading } = useAppSelector((state) => state.user)
  const { currentWorkspace } = useAppSelector((state) => state.workspace)
  const hasFetchedUserRef = useRef(false)
  const [grafanaSheetOpen, setGrafanaSheetOpen] = useState(false)
  const [isGrafanaConnected, setIsGrafanaConnected] = useState(false)
  const [slackInstalling, setSlackInstalling] = useState(false)

  useEffect(() => {
    // Only fetch if we have a token but no user data and haven't already tried
    if (tokenService.hasValidToken() && !user && !hasFetchedUserRef.current) {
      hasFetchedUserRef.current = true
      dispatch(fetchUserProfile())
    }
  }, [dispatch, user])

  useEffect(() => {
    // Fetch workspaces when component mounts
    if (tokenService.hasValidToken()) {
      dispatch(fetchWorkspaces())
    }
  }, [dispatch])

  // Check Grafana connection status when workspace changes
  useEffect(() => {
    const checkGrafanaStatus = async () => {
      if (currentWorkspace?.id) {
        try {
          const response = await apiService.getGrafanaStatus(currentWorkspace.id)
          setIsGrafanaConnected(response.data?.connected || false)
        } catch (error) {
          setIsGrafanaConnected(false)
        }
      }
    }

    checkGrafanaStatus()
  }, [currentWorkspace?.id, grafanaSheetOpen])

  const handleLogout = () => {
    // Clear all tokens
    tokenService.clearTokens()

    // Clear Redux state
    dispatch(clearUser())

    // Clear all localStorage
    localStorage.clear()

    // Clear all sessionStorage
    sessionStorage.clear()

    // Clear all cookies
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
      const [name] = cookie.split('=')
      if (name) {
        CookieUtils.deleteCookie(name.trim())
      }
    }

    // Redirect to auth page
    window.location.href = '/auth'
  }

  const handleConnectSlack = async () => {
    if (!currentWorkspace?.id) return

    setSlackInstalling(true)

    try {
      const response = await apiService.getSlackInstallUrl(currentWorkspace.id)

      if (response.status === 200 && response.data?.oauth_url) {
        // Redirect to Slack OAuth URL
        window.location.href = response.data.oauth_url
      } else {
        throw new Error(response.error || 'Failed to get Slack OAuth URL')
      }
    } catch (error) {
      console.error('Slack installation failed:', error)
      setSlackInstalling(false)
    }
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Activity className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Vibe Monitor</span>
                  <span className="truncate text-xs">Analytics Platform</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Workspace Selector */}
      <div className="px-2 pb-2">
        <WorkspaceSelector />
      </div>


      <SidebarContent className="overflow-y-auto sidebar-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={isActive ? "bg-[var(--color-background-hover)] border-l-2 border-[var(--color-blue-line)] hover:bg-[var(--color-background-hover)]" : ""}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <User2 className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    { !user ? (
                      <>
                        <Skeleton className="h-4 w-20 mb-1" />
                        <Skeleton className="h-3 w-32" />
                      </>
                    ) : (
                      <>
                        <span className="truncate font-semibold">
                          {user?.name}
                        </span>
                        <span className="truncate text-xs">
                          {user?.email}
                        </span>
                      </>
                    )}
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
                
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground ">
                      <User2 className="size-4 sidebar-hover" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      {loading && !user ? (
                        <>
                          <Skeleton className="h-4 w-20 mb-1" />
                          <Skeleton className="h-3 w-32" />
                        </>
                      ) : (
                        <>
                          <span className="truncate font-semibold">
                            {user?.name || "User"}
                          </span>
                          <span className="truncate text-xs">
                            {user?.email || "user@example.com"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup >
                  <DropdownMenuItem>
                    <Crown className="mr-2 h-4 w-4" />
                    <span>Upgrade to Pro</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Account Settings</span>
                  </DropdownMenuItem>
                  {currentWorkspace && (
                    <>
                      <DropdownMenuItem onClick={() => setGrafanaSheetOpen(true)}>
                        {isGrafanaConnected ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                            <span>Grafana Connected</span>
                          </>
                        ) : (
                          <>
                            <Database className="mr-2 h-4 w-4" />
                            <span>Connect Grafana</span>
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleConnectSlack} disabled={slackInstalling}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>{slackInstalling ? 'Connecting...' : 'Connect Slack'}</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* Grafana Connection Modal */}
      {currentWorkspace && (
        <GrafanaConnect
          workspaceId={currentWorkspace.id}
          externalOpen={grafanaSheetOpen}
          onOpenChange={setGrafanaSheetOpen}
        />
      )}
    </Sidebar>
  )
}