'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChatContainer } from '@/components/chat';
import { Toaster } from 'sonner';
import Loader from '@/components/ui/loader';
import { Button } from '@/components/ui/button';
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


  // Get the workspace ID to use
  const workspaceId = currentWorkspace?.id || workspaces[0]?.id;

  if (loading) {
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
          <Button onClick={() => router.push('/setup')}>
            Go to Setup
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="-m-4 md:-m-6 h-[calc(100vh-4rem)]">
      <ChatContainer workspaceId={workspaceId} className="h-full" />

      <Toaster
        position="top-right"
        richColors
        theme="light"
        toastOptions={{
          className: 'bg-card border-border text-foreground',
        }}
      />
    </div>
  );
}
