import { useState } from "react";
import { toast } from "sonner";
import posthog from "posthog-js";
import { githubService } from "@/services/integrations/githubService";
import { IntegrationConfig } from "@/types/integration";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { GithubStatus } from "@/types/integration";

export function useGithubIntegration(workspaceId: string | undefined) {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<GithubStatus>('not-connected');

  const checkStatus = async () => {
    if (!workspaceId) return;
    try {
      const result = await githubService.getStatus(workspaceId);
      setStatus(result.status);

      if (result.data?.connected) {
        setConnected(true);
        if (result.data.integration?.github_username) {
          setUsername(result.data.integration.github_username);
        }
      } else {
        setConnected(false);
      }
    } catch (error) {
      console.error('Failed to check GitHub status:', error);
      setStatus('error');
    }
  };

  const connect = async () => {
    if (!workspaceId) {
      toast.error("Please select a workspace first");
      return;
    }

    posthog.capture('integration_github_connect_clicked', {
      workspace_id: workspaceId
    });

    setLoading(true);

    try {
      const { install_url } = await githubService.getInstallUrl(workspaceId);

      posthog.capture('integration_github_oauth_redirect', {
        workspace_id: workspaceId,
        install_url_obtained: true
      });

      window.location.href = install_url;
    } catch (error) {
      console.error('GitHub installation failed:', error);

      posthog.capture('integration_github_connect_failed', {
        workspace_id: workspaceId,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error("Failed to connect GitHub. Please try again.");
      setLoading(false);
    }
  };

  const disconnect = async () => {
    if (!workspaceId) {
      toast.error("Please select a workspace first");
      return;
    }

    posthog.capture('integration_github_disconnect_clicked', {
      workspace_id: workspaceId
    });

    try {
      await githubService.disconnect(workspaceId);
      setConnected(false);
      setStatus('not-connected');
      setUsername('');

      posthog.capture('integration_github_disconnected_successfully', {
        workspace_id: workspaceId
      });

      toast.success('GitHub disconnected successfully');
    } catch (error) {
      console.error('GitHub disconnection failed:', error);

      posthog.capture('integration_github_disconnect_failed', {
        workspace_id: workspaceId,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error('Failed to disconnect GitHub. Please try again.');
    }
  };

  const statusComponent = (
    <>
      {/* Suspended Warning */}
      {status === 'suspended' && (
        <div className="w-full p-3 rounded-md border border-yellow-600/40 bg-yellow-500/10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-semibold text-yellow-600">GitHub Integration Suspended</span>
              </div>
            </div>
            <p className="text-xs leading-5 text-muted-foreground">
              Your GitHub integration (@{username}) is currently suspended. To restore functionality, please visit GitHub to unsuspend the installation manually.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open('https://github.com/settings/installations', '_blank')}
              className="w-fit h-8 px-3 text-xs bg-yellow-500/10 border-yellow-600/40 text-yellow-600 hover:bg-yellow-500/20 hover:border-yellow-600/50"
            >
              <GitHubLogoIcon className="h-3 w-3 mr-1.5" />
              Unsuspend on GitHub
            </Button>
          </div>
        </div>
      )}

      {/* Connected Status */}
      {status === 'connected' && username && (
        <div className="w-full p-3 rounded-md border border-emerald-600/40 bg-emerald-500/10">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span className="text-sm text-emerald-600">
              Connected as <span className="font-mono font-semibold">@{username}</span>
            </span>
          </div>
        </div>
      )}
    </>
  );

  const config: Omit<IntegrationConfig, 'title' | 'icon'> = {
    description: "Automatically monitor commits, issues, and PRs in real time to catch issues early and accelerate development with actionable insights.",
    connected,
    loading,
    fields: [],
    onConnect: connect,
    onDisconnect: disconnect,
    statusComponent,
    timeEstimate: "≥ 2 min"
  };

  return {
    ...config,
    checkStatus,
    setConnected,
    setUsername,
    setStatus,
    status
  };
}
