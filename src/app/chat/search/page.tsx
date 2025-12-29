'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, MessageSquare, Loader2, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchWorkspaces } from '@/lib/features/workspaceSlice';
import { tokenService } from '@/services/tokenService';
import { api } from '@/services/api/apiFactory';
import { ChatSearchResult } from '@/types/chat';
import { cn } from '@/lib/utils';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function ChatSearchPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { workspaces, currentWorkspace, loading: workspaceLoading } = useAppSelector(
    (state) => state.workspace
  );

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ChatSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const debouncedQuery = useDebounce(query, 300);
  const workspaceId = currentWorkspace?.id || workspaces[0]?.id;

  // Check auth and load workspaces
  useEffect(() => {
    const hasValidToken = tokenService.hasValidToken();
    if (!hasValidToken) {
      router.push('/auth');
      return;
    }

    if (workspaces.length === 0) {
      dispatch(fetchWorkspaces());
    }
  }, [dispatch, router, workspaces.length]);

  // Search when debounced query changes
  const performSearch = useCallback(async () => {
    if (!workspaceId || !debouncedQuery || debouncedQuery.length < 2) {
      if (debouncedQuery.length < 2) {
        setResults([]);
        setHasSearched(false);
      }
      return;
    }

    setSearching(true);
    try {
      const response = await api.chat.searchSessions(workspaceId, debouncedQuery, {
        limit: 20,
      });

      if (response.status === 200 && response.data) {
        setResults(response.data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setSearching(false);
      setHasSearched(true);
    }
  }, [workspaceId, debouncedQuery]);

  useEffect(() => {
    performSearch();
  }, [performSearch]);

  if (workspaceLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Loader message="Loading workspace..." />
      </div>
    );
  }

  if (!workspaceId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            No workspace found
          </h2>
          <p className="text-muted-foreground mb-4">
            Please complete the setup to create a workspace.
          </p>
          <Button onClick={() => router.push('/setup')}>Go to Setup</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/chat')}
            className="h-8 w-8 p-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="font-semibold text-foreground">Search Chats</h1>
        </div>
      </div>

      {/* Search Input */}
      <div className="border-b border-border px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search conversations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {searching && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </div>
          {query.length > 0 && query.length < 2 && (
            <p className="text-xs text-muted-foreground mt-2">
              Type at least 2 characters to search
            </p>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto px-4 py-4">
          {!hasSearched && !query && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Search through your chat history
              </p>
            </div>
          )}

          {hasSearched && results.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                No conversations found for "{debouncedQuery}"
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              {results.map((result) => (
                <Link
                  key={result.session_id}
                  href={`/chat/${result.session_id}`}
                  className={cn(
                    'block p-4 rounded-lg border border-border bg-card',
                    'hover:bg-accent hover:border-ring transition-colors'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">
                        {result.title || 'Untitled Chat'}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {result.matched_content}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(result.updated_at || result.created_at)}
                      </span>
                      <span
                        className={cn(
                          'text-xs px-1.5 py-0.5 rounded',
                          result.match_type === 'title'
                            ? 'bg-blue-500/10 text-blue-500'
                            : 'bg-green-500/10 text-green-500'
                        )}
                      >
                        {result.match_type === 'title' ? 'Title' : 'Message'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
