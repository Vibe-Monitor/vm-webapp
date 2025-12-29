'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageSquare, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebar } from './SidebarContext'
import { useAppSelector } from '@/lib/hooks'
import { api } from '@/services/api/apiFactory'
import { ChatSessionSummary } from '@/types/chat'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const MAX_CHATS_TO_FETCH = 50

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function truncateTitle(title: string | null, maxLength: number = 30): string {
  if (!title) return 'Untitled Chat'
  if (title.length <= maxLength) return title
  return title.slice(0, maxLength - 3) + '...'
}

export function SidebarChatList() {
  const { collapsed } = useSidebar()
  const pathname = usePathname()
  const { currentWorkspace } = useAppSelector((state) => state.workspace)

  const [sessions, setSessions] = React.useState<ChatSessionSummary[]>([])
  const [loading, setLoading] = React.useState(false)

  // Fetch chat sessions when workspace changes or when navigating to a new chat
  React.useEffect(() => {
    async function fetchSessions() {
      if (!currentWorkspace?.id) {
        setSessions([])
        return
      }

      setLoading(true)
      try {
        const response = await api.chat.listSessions(currentWorkspace.id, {
          limit: MAX_CHATS_TO_FETCH,
        })
        if (response.status === 200 && response.data) {
          setSessions(response.data)
        }
      } catch (error) {
        console.error('Failed to fetch chat sessions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [currentWorkspace?.id, pathname])

  // Don't show chat list if sidebar is collapsed (on desktop)
  if (collapsed) {
    return null
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col border-t border-border pt-2 overflow-hidden">
      <div className="px-5 mb-1 shrink-0">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Recent Chats
        </h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="size-4 animate-spin text-muted-foreground" />
        </div>
      ) : sessions.length === 0 ? (
        <div className="px-3 py-4 text-center">
          <MessageSquare className="size-6 mx-auto mb-2 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            No chats yet
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-2">
          <ul className="flex flex-col gap-1">
            {sessions.map((session) => {
              const isActive = pathname === `/chat/${session.id}`
              const title = truncateTitle(session.title)
              const time = formatRelativeTime(
                session.updated_at || session.created_at
              )

              return (
                <li key={session.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/chat/${session.id}`}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                          'hover:bg-background',
                          isActive
                            ? 'bg-background text-foreground'
                            : 'text-foreground'
                        )}
                      >
                        <MessageSquare className="size-5 shrink-0" />
                        <span className="flex-1 truncate">
                          {title}
                        </span>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {time}
                        </span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={8}>
                      <div className="max-w-xs">
                        <p className="font-medium">
                          {session.title || 'Untitled Chat'}
                        </p>
                        {session.last_message_preview && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {session.last_message_preview}
                          </p>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
