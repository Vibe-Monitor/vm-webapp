'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChatContainer } from '@/components/chat';
import { Toaster } from 'sonner';
import Loader from '@/components/ui/loader';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchWorkspaces } from '@/lib/features/workspaceSlice';
import { tokenService } from '@/services/tokenService';

export default function ChatPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { workspaces, currentWorkspace, loading } = useAppSelector(
    (state) => state.workspace
  );

  // Check auth and load workspaces
  useEffect(() => {
    const hasValidToken = tokenService.hasValidToken();
    if (!hasValidToken) {
      router.push('/auth');
      return;
    }

    // Load workspaces if not loaded
    if (workspaces.length === 0) {
      dispatch(fetchWorkspaces());
    }
  }, [dispatch, router, workspaces.length]);

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Get the workspace ID to use
  const workspaceId = currentWorkspace?.id || workspaces[0]?.id;

  // Debug logging
  console.log('[ChatPage] Workspace state:', {
    workspaceId,
    currentWorkspace: currentWorkspace?.id,
    firstWorkspace: workspaces[0]?.id,
    totalWorkspaces: workspaces.length,
    loading
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        <Loader message="Loading workspace..." />
      </div>
    );
  }

  if (!workspaceId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
            No workspace found
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-4">
            Please complete the setup to create a workspace.
          </p>
          <button
            onClick={() => router.push('/setup')}
            className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity"
          >
            Go to Setup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[var(--color-background)]">
      <ChatContainer workspaceId={workspaceId} className="h-full" />

      <Toaster
        position="top-right"
        richColors
        theme="dark"
        toastOptions={{
          style: {
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-sans)',
          },
        }}
      />
    </div>
  );
}
