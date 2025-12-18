import { useState } from "react";
import { toast } from "sonner";
import posthog from "posthog-js";
import { datadogService } from "@/services/integrations/datadogService";
import { IntegrationConfig } from "@/types/integration";
import { CheckCircle2 } from "lucide-react";

export function useDatadogIntegration(workspaceId: string | undefined) {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [appKey, setAppKey] = useState("");
  const [region, setRegion] = useState("");

  const checkStatus = async () => {
    if (!workspaceId) return;
    try {
      const data = await datadogService.getStatus(workspaceId);
      if (data?.is_connected) {
        setConnected(true);
        if (data.integration?.region) {
          setRegion(data.integration.region);
        }
      } else {
        setConnected(false);
      }
    } catch (error) {
      console.error('Failed to check Datadog status:', error);
    }
  };

  const connect = async () => {
    if (!workspaceId) {
      toast.error("Please select a workspace first");
      return;
    }

    if (!apiKey.trim()) {
      toast.error('Please enter your Datadog API Key');
      return;
    }

    if (!appKey.trim()) {
      toast.error('Please enter your Datadog Application Key');
      return;
    }

    if (!region.trim()) {
      toast.error('Please enter your Datadog Region (e.g., us5.datadoghq.com)');
      return;
    }

    posthog.capture('integration_datadog_connect_clicked', {
      workspace_id: workspaceId,
      has_api_key: true,
      has_app_key: true,
      region: region.trim()
    });

    setLoading(true);

    try {
      const data = await datadogService.connect({
        workspace_id: workspaceId,
        api_key: apiKey.trim(),
        app_key: appKey.trim(),
        region: region.trim(),
      });

      setConnected(true);
      if (data.integration?.region) {
        setRegion(data.integration.region);
      }
      setApiKey('');
      setAppKey('');

      posthog.capture('integration_datadog_connected_successfully', {
        workspace_id: workspaceId,
        region: data.integration?.region || region.trim()
      });

      toast.success('Datadog connected successfully!');
    } catch (error) {
      console.error('Datadog connection failed:', error);

      posthog.capture('integration_datadog_connect_failed', {
        workspace_id: workspaceId,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error('Failed to connect Datadog. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const disconnect = async () => {
    if (!workspaceId) {
      toast.error("Please select a workspace first");
      return;
    }

    posthog.capture('integration_datadog_disconnect_clicked', {
      workspace_id: workspaceId
    });

    try {
      await datadogService.disconnect(workspaceId);
      setConnected(false);
      setApiKey('');
      setAppKey('');
      setRegion('');

      posthog.capture('integration_datadog_disconnected_successfully', {
        workspace_id: workspaceId
      });

      toast.success('Datadog disconnected successfully');
    } catch (error) {
      console.error('Datadog disconnection failed:', error);

      posthog.capture('integration_datadog_disconnect_failed', {
        workspace_id: workspaceId,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error('Failed to disconnect Datadog. Please try again.');
    }
  };

  const statusComponent = connected && region ? (
    <div className="w-full p-3 rounded-md border border-emerald-600/40 bg-emerald-500/10">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-600">Datadog Connected</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium" style={{ color: 'var(--color-text-tertiary)' }}>Region:</span>
          <span className="text-sm" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{region}</span>
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
                Create API Key
              </h5>
              <p className="text-xs leading-4" style={{ color: 'var(--color-text-secondary)' }}>
                Go to Organization Settings → API Keys → Create New Key (example name: Vibe_API_KEY)
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
                Create Application Key
              </h5>
              <p className="text-xs leading-4" style={{ color: 'var(--color-text-secondary)' }}>
                Go to Organization Settings → Application Keys → Create New Application Key (example name: Vibe_APP_KEY)
              </p>
              <p className="text-xs leading-4 mt-1" style={{ color: '#F59E0B' }}>
                ⚠️ Do NOT create under Personal Settings - it won&apos;t work!
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
                Assign Permissions
              </h5>
              <p className="text-xs leading-4" style={{ color: 'var(--color-text-secondary)' }}>
                Grant READ-ONLY permissions: <strong>logs_read_data, logs_read_index_data, logs_live_tail, metrics_read, timeseries_query, events_read</strong>
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
                Enter Credentials
              </h5>
              <p className="text-xs leading-4" style={{ color: 'var(--color-text-secondary)' }}>
                Paste your API Key, Application Key, and Region (e.g., us5.datadoghq.com) above → Click &quot;Connect Datadog&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const config: Omit<IntegrationConfig, 'title' | 'icon'> = {
    description: "Monitor logs and metrics from Datadog for comprehensive observability into your applications.",
    connected,
    loading,
    fields: connected ? [] : [
      {
        label: "Datadog API Key",
        value: apiKey,
        onChange: setApiKey,
        placeholder: "Enter your Datadog API Key",
        type: "password"
      },
      {
        label: "Datadog Application Key",
        value: appKey,
        onChange: setAppKey,
        placeholder: "Enter your Datadog Application Key",
        type: "password"
      },
      {
        label: "Datadog Region",
        value: region,
        onChange: setRegion,
        placeholder: "us5.datadoghq.com",
        type: "text"
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
    setRegion
  };
}
