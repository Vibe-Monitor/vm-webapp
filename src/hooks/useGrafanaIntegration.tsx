import { useState } from "react";
import { toast } from "sonner";
import posthog from "posthog-js";
import { grafanaService } from "@/services/integrations/grafanaService";
import { IntegrationConfig } from "@/types/integration";
import { CheckCircle2 } from "lucide-react";

export function useGrafanaIntegration(workspaceId: string | undefined) {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [grafanaUrl, setGrafanaUrl] = useState("");
  const [grafanaToken, setGrafanaToken] = useState("");

  const checkStatus = async () => {
    if (!workspaceId) return;
    try {
      const data = await grafanaService.getStatus(workspaceId);
      if (data?.connected) {
        setConnected(true);
        if (data.grafana_url) {
          setGrafanaUrl(data.grafana_url);
        }
      } else {
        setConnected(false);
      }
    } catch (error) {
      console.error('Failed to check Grafana status:', error);
    }
  };

  const connect = async () => {
    if (!workspaceId) {
      toast.error("Please select a workspace first");
      return;
    }

    if (!grafanaUrl.trim()) {
      toast.error('Please enter your Grafana URL');
      return;
    }

    if (!grafanaToken.trim()) {
      toast.error('Please enter your API token');
      return;
    }

    let formattedUrl = grafanaUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    try {
      new URL(formattedUrl);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    posthog.capture('integration_grafana_connect_clicked', {
      workspace_id: workspaceId,
      has_url: true,
      has_token: true
    });

    setLoading(true);

    try {
      const data = await grafanaService.connect({
        workspace_id: workspaceId,
        grafana_url: formattedUrl,
        api_token: grafanaToken.trim(),
      });

      setConnected(true);
      if (data.grafana_url) {
        setGrafanaUrl(data.grafana_url);
      }
      setGrafanaToken('');

      posthog.capture('integration_grafana_connected_successfully', {
        workspace_id: workspaceId,
        grafana_url: data.grafana_url
      });

      toast.success('Grafana connected successfully! 🚀');
    } catch (error) {
      console.error('Grafana connection failed:', error);

      posthog.capture('integration_grafana_connect_failed', {
        workspace_id: workspaceId,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error('Failed to connect Grafana. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const disconnect = async () => {
    if (!workspaceId) {
      toast.error("Please select a workspace first");
      return;
    }

    posthog.capture('integration_grafana_disconnect_clicked', {
      workspace_id: workspaceId
    });

    try {
      await grafanaService.disconnect(workspaceId);
      setConnected(false);
      setGrafanaUrl('');
      setGrafanaToken('');

      posthog.capture('integration_grafana_disconnected_successfully', {
        workspace_id: workspaceId
      });

      toast.success('Grafana disconnected successfully');
    } catch (error) {
      console.error('Grafana disconnection failed:', error);

      posthog.capture('integration_grafana_disconnect_failed', {
        workspace_id: workspaceId,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error('Failed to disconnect Grafana. Please try again.');
    }
  };

  const statusComponent = connected && grafanaUrl ? (
    <div className="w-full p-3 rounded-md border border-emerald-600/40 bg-emerald-500/10">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-600">Grafana Connected</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium" style={{ color: 'var(--color-text-tertiary)' }}>Connected to:</span>
          <span className="text-sm break-all" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{grafanaUrl}</span>
        </div>
      </div>
    </div>
  ) : null;

  const instructions = (
    <div className="flex flex-col items-start gap-3 w-full">
      <h4 className="text-sm leading-5 tracking-[-0.150391px]" style={{ color: 'var(--color-text-primary)' }}>
        Instructions to integrate
      </h4>

      <div className="flex flex-col items-start gap-3 w-full">
        {/* Step 1 */}
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-row items-start gap-2">
            <div className="flex items-center justify-center min-w-[20px] w-[20px] h-[20px] rounded border bg-transparent text-xs" style={{ borderColor: '#FED835', color: '#FED835' }}>
              1
            </div>
            <div className="flex flex-col items-start gap-1">
              <h5 className="text-sm leading-5 tracking-[-0.150391px]" style={{ color: 'var(--color-text-primary)' }}>
                Open Side Panel
              </h5>
              <p className="text-xs leading-4" style={{ color: 'var(--color-text-secondary)' }}>
                Click Grafana icon → Select &quot;Administration&quot; → &quot;Users and access&quot; → &quot;Service accounts&quot; → Add service account button.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-row items-start gap-2">
            <div className="flex items-center justify-center min-w-[20px] w-[20px] h-[20px] rounded border bg-transparent text-xs" style={{ borderColor: '#FED835', color: '#FED835' }}>
              2
            </div>
            <div className="flex flex-col items-start gap-1">
              <h5 className="text-sm leading-5 tracking-[-0.150391px]" style={{ color: 'var(--color-text-primary)' }}>
                Create Account
              </h5>
              <p className="text-xs leading-4" style={{ color: 'var(--color-text-secondary)' }}>
                Enter Name → Set Role dropdown to &quot;Viewer&quot; → Click &quot;Create&quot; button.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-row items-start gap-2">
            <div className="flex items-center justify-center min-w-[20px] w-[20px] h-[20px] rounded border bg-transparent text-xs" style={{ borderColor: '#FED835', color: '#FED835' }}>
              3
            </div>
            <div className="flex flex-col items-start gap-1">
              <h5 className="text-sm leading-5 tracking-[-0.150391px]" style={{ color: 'var(--color-text-primary)' }}>
                Add Token
              </h5>
              <p className="text-xs leading-4" style={{ color: 'var(--color-text-secondary)' }}>
                In new account details, click &quot;Add service account token&quot; link/button.
              </p>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-row items-start gap-2">
            <div className="flex items-center justify-center min-w-[20px] w-[20px] h-[20px] rounded border bg-transparent text-xs" style={{ borderColor: '#FED835', color: '#FED835' }}>
              4
            </div>
            <div className="flex flex-col items-start gap-1">
              <h5 className="text-sm leading-5 tracking-[-0.150391px]" style={{ color: 'var(--color-text-primary)' }}>
                Generate Token
              </h5>
              <p className="text-xs leading-4" style={{ color: 'var(--color-text-secondary)' }}>
                Enter token Name → Click &quot;Generate token&quot; → Copy full token (starts with glsa_... → visible once only, save securely).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const config: Omit<IntegrationConfig, 'title' | 'icon'> = {
    description: "Pull real-time dashboard metrics and alerts, giving your team instant visibility into performance trends without manual exports.",
    connected,
    loading,
    fields: connected ? [] : [
      {
        label: "Grafana URL",
        value: grafanaUrl,
        onChange: setGrafanaUrl,
        placeholder: "https://your-grafana-instance.com",
        type: "text"
      },
      {
        label: "Enter token",
        value: grafanaToken,
        onChange: setGrafanaToken,
        placeholder: "Token key",
        type: "password"
      }
    ],
    onConnect: connect,
    onDisconnect: disconnect,
    statusComponent,
    instructions,
    timeEstimate: "> 5 min"
  };

  return {
    ...config,
    checkStatus,
    setConnected,
    setGrafanaUrl
  };
}
