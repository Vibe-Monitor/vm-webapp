'use client';

import { cn } from '@/lib/utils';
import { ChatSessionSummary } from '@/types/chat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { MessageSquare, Plus, Trash2, Pencil, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';

interface SessionListProps {
  sessions: ChatSessionSummary[];
  activeSessionId?: string;
  onSelectSession: (sessionId: string) => void;
  onNewSession: () => void;
  onDeleteSession?: (sessionId: string) => void;
  onRenameSession?: (sessionId: string) => void;
  loading?: boolean;
  className?: string;
}

export function SessionList({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
  onRenameSession,
  loading = false,
  className,
}: SessionListProps) {
  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">
          Conversations
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onNewSession}
          className="h-7 w-7 p-0"
          title="New conversation"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Sessions List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-14 rounded-lg bg-secondary animate-pulse"
              />
            ))
          ) : sessions.length === 0 ? (
            // Empty state
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                No conversations yet
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Start a new conversation to get help
              </p>
            </div>
          ) : (
            // Session items
            sessions.map((session) => (
              <SessionItem
                key={session.id}
                session={session}
                isActive={session.id === activeSessionId}
                onSelect={() => onSelectSession(session.id)}
                onDelete={onDeleteSession ? () => onDeleteSession(session.id) : undefined}
                onRename={onRenameSession ? () => onRenameSession(session.id) : undefined}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

interface SessionItemProps {
  session: ChatSessionSummary;
  isActive: boolean;
  onSelect: () => void;
  onDelete?: () => void;
  onRename?: () => void;
}

function SessionItem({
  session,
  isActive,
  onSelect,
  onDelete,
  onRename,
}: SessionItemProps) {
  const timeAgo = session.updated_at
    ? formatDistanceToNow(new Date(session.updated_at), { addSuffix: true })
    : formatDistanceToNow(new Date(session.created_at), { addSuffix: true });

  return (
    <div
      className={cn(
        'group relative flex items-start gap-2 rounded-lg px-3 py-2 cursor-pointer transition-colors',
        isActive
          ? 'bg-primary/10 border border-primary/20'
          : 'hover:bg-secondary'
      )}
      onClick={onSelect}
    >
      <MessageSquare className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {session.title || 'New conversation'}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {session.last_message_preview || `${session.turn_count} message${session.turn_count !== 1 ? 's' : ''}`}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {timeAgo}
        </p>
      </div>

      {/* Actions dropdown */}
      {(onDelete || onRename) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            {onRename && (
              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onRename(); }}>
                <Pencil className="h-3.5 w-3.5 mr-2" />
                Rename
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="text-red-500 focus:text-red-500"
              >
                <Trash2 className="h-3.5 w-3.5 mr-2" />
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
