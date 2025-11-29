import { useState } from "react";
import { toast } from "sonner";
import posthog from "posthog-js";
import { slackService } from "@/services/integrations/slackService";
import { IntegrationConfig } from "@/types/integration";
import { CheckCircle2 } from "lucide-react";

export function useSlackIntegration(workspaceId: string | undefined) {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState("");

  const checkStatus = async () => {
    if (!workspaceId) return;
    try {
      const data = await slackService.getStatus(workspaceId);
      if (data?.connected) {
        setConnected(true);
        if (data.data?.team_name) {
          setTeamName(data.data.team_name);
        }
      } else {
        setConnected(false);
      }
    } catch (error) {
      console.error('Failed to check Slack status:', error);
    }
  };

  const connect = async () => {
    if (!workspaceId) {
      toast.error("Please select a workspace first");
      return;
    }

    posthog.capture('integration_slack_connect_clicked', {
      workspace_id: workspaceId
    });

    setLoading(true);

    try {
      const { oauth_url } = await slackService.getInstallUrl(workspaceId);

      posthog.capture('integration_slack_oauth_redirect', {
        workspace_id: workspaceId,
        oauth_url_obtained: true
      });

      window.location.href = oauth_url;
    } catch (error) {
      console.error('Slack installation failed:', error);

      posthog.capture('integration_slack_connect_failed', {
        workspace_id: workspaceId,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error("Failed to connect Slack. Please try again.");
      setLoading(false);
    }
  };

  const disconnect = async () => {
    if (!workspaceId) {
      toast.error("Please select a workspace first");
      return;
    }

    posthog.capture('integration_slack_disconnect_clicked', {
      workspace_id: workspaceId
    });

    try {
      await slackService.disconnect(workspaceId);
      setConnected(false);
      setTeamName('');

      posthog.capture('integration_slack_disconnected_successfully', {
        workspace_id: workspaceId
      });

      toast.success('Slack disconnected successfully');
    } catch (error) {
      console.error('Slack disconnection failed:', error);

      posthog.capture('integration_slack_disconnect_failed', {
        workspace_id: workspaceId,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error('Failed to disconnect Slack. Please try again.');
    }
  };

  const statusComponent = connected && teamName ? (
    <div className="w-full p-3 rounded-md border border-emerald-500/30 bg-emerald-500/10">
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        <span className="text-sm text-emerald-400">
          Connected to <strong>{teamName}</strong>
        </span>
      </div>
    </div>
  ) : null;

  const config: Omit<IntegrationConfig, 'title' | 'icon'> = {
    description: "Access channels for bot-delivered vibes—team sync made simple.",
    connected,
    loading,
    fields: [],
    onConnect: connect,
    onDisconnect: disconnect,
    statusComponent,
    timeEstimate: "> 2 min"
  };

  return {
    ...config,
    checkStatus,
    setConnected,
    setTeamName
  };
}
