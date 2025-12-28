'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageSquare, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
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
import { Button } from '@/components/ui/button'

const MAX_VISIBLE_CHATS = 5

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
  const [expanded, setExpanded] = React.useState(false)

  // Fetch chat sessions when workspace changes
  React.useEffect(() => {
    async function fetchSessions() {
      if (!currentWorkspace?.id) {
        setSessions([])
        return
      }

      setLoading(true)
      try {
        const response = await api.chat.listSessions(currentWorkspace.id, {
          limit: 10,
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
  }, [currentWorkspace?.id])

  // Don't show chat list if sidebar is collapsed (on desktop)
  if (collapsed) {
    return null
  }

  const visibleSessions = expanded
    ? sessions
    : sessions.slice(0, MAX_VISIBLE_CHATS)
  const hasMore = sessions.length > MAX_VISIBLE_CHATS

  return (
    <div className="border-t border-[var(--color-border)] py-2">
      <div className="px-3 mb-2">
        <h3 className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider">
          Recent Chats
        </h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="size-4 animate-spin text-[var(--color-text-tertiary)]" />
        </div>
      ) : sessions.length === 0 ? (
        <div className="px-3 py-4 text-center">
          <MessageSquare className="size-6 mx-auto mb-2 text-[var(--color-text-tertiary)]" />
          <p className="text-xs text-[var(--color-text-tertiary)]">
            No chats yet
          </p>
        </div>
      ) : (
        <div className="px-2">
          <ul className="flex flex-col gap-0.5">
            {visibleSessions.map((session) => {
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
                          'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                          'hover:bg-[var(--color-surface-hover)]',
                          isActive
                            ? 'bg-[var(--color-surface-active)] text-[var(--color-text-primary)]'
                            : 'text-[var(--color-text-secondary)]'
                        )}
                      >
                        <MessageSquare className="size-4 shrink-0 text-[var(--color-text-tertiary)]" />
                        <span className="flex-1 truncate text-xs">
                          {title}
                        </span>
                        <span className="text-[10px] text-[var(--color-text-tertiary)] shrink-0">
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

          {hasMore && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="w-full mt-1 h-7 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
            >
              {expanded ? (
                <>
                  <ChevronUp className="size-3 mr-1" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="size-3 mr-1" />
                  Show {sessions.length - MAX_VISIBLE_CHATS} more
                </>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
