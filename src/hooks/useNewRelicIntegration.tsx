import { useState } from "react";
import { toast } from "sonner";
import posthog from "posthog-js";
import { newrelicService } from "@/services/integrations/newrelicService";
import { IntegrationConfig } from "@/types/integration";
import { CheckCircle2 } from "lucide-react";

export function useNewRelicIntegration(workspaceId: string | undefined) {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [apiKey, setApiKey] = useState("");

  const checkStatus = async () => {
    if (!workspaceId) return;
    try {
      const data = await newrelicService.getStatus(workspaceId);
      if (data?.is_connected) {
        setConnected(true);
        if (data.integration?.account_id) {
          setAccountId(data.integration.account_id);
        }
      } else {
        setConnected(false);
      }
    } catch (error) {
      console.error('Failed to check New Relic status:', error);
    }
  };

  const connect = async () => {
    if (!workspaceId) {
      toast.error("Please select a workspace first");
      return;
    }

    if (!accountId.trim()) {
      toast.error('Please enter your New Relic Account ID');
      return;
    }

    if (!apiKey.trim()) {
      toast.error('Please enter your New Relic User API Key');
      return;
    }

    if (!apiKey.trim().startsWith('NRAK-')) {
      toast.error('User API Key must start with NRAK-');
      return;
    }

    posthog.capture('integration_newrelic_connect_clicked', {
      workspace_id: workspaceId,
      has_account_id: true,
      has_api_key: true
    });

    setLoading(true);

    try {
      const data = await newrelicService.connect({
        workspace_id: workspaceId,
        account_id: accountId.trim(),
        api_key: apiKey.trim(),
      });

      setConnected(true);
      if (data.integration?.account_id) {
        setAccountId(data.integration.account_id);
      }
      setApiKey('');

      posthog.capture('integration_newrelic_connected_successfully', {
        workspace_id: workspaceId,
        account_id: data.integration?.account_id
      });

      toast.success('New Relic connected successfully!');
    } catch (error) {
      console.error('New Relic connection failed:', error);

      posthog.capture('integration_newrelic_connect_failed', {
        workspace_id: workspaceId,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error('Failed to connect New Relic. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const disconnect = async () => {
    if (!workspaceId) {
      toast.error("Please select a workspace first");
      return;
    }

    posthog.capture('integration_newrelic_disconnect_clicked', {
      workspace_id: workspaceId
    });

    try {
      await newrelicService.disconnect(workspaceId);
      setConnected(false);
      setAccountId('');
      setApiKey('');

      posthog.capture('integration_newrelic_disconnected_successfully', {
        workspace_id: workspaceId
      });

      toast.success('New Relic disconnected successfully');
    } catch (error) {
      console.error('New Relic disconnection failed:', error);

      posthog.capture('integration_newrelic_disconnect_failed', {
        workspace_id: workspaceId,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error('Failed to disconnect New Relic. Please try again.');
    }
  };

  const statusComponent = connected && accountId ? (
    <div className="w-full p-3 rounded-md border border-emerald-600/40 bg-emerald-500/10">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-600">New Relic Connected</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium" style={{ color: 'var(--color-text-tertiary)' }}>Account ID:</span>
          <span className="text-sm" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{accountId}</span>
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
                Go to API Keys Section
              </h5>
              <p className="text-xs leading-4" style={{ color: 'var(--color-text-secondary)' }}>
                Inside New Relic, open your <strong>API Keys</strong> settings page where all keys for your account are managed.
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
                Create User API Key
              </h5>
              <p className="text-xs leading-4" style={{ color: 'var(--color-text-secondary)' }}>
                Click &quot;Create a Key&quot; → Select <strong>Key Type: User</strong>
              </p>
              <p className="text-xs leading-4 mt-1" style={{ color: '#F59E0B' }}>
                ⚠️ Must be &quot;User&quot; type, NOT Ingest-License or Ingest-Browser!
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
                Copy the Key
              </h5>
              <p className="text-xs leading-4" style={{ color: 'var(--color-text-secondary)' }}>
                After creating, copy the key value (starts with <strong>NRAK-</strong>)
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
                Paste your Account ID and User API Key (NRAK-...) above → Click &quot;Connect New Relic&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const config: Omit<IntegrationConfig, 'title' | 'icon'> = {
    description: "Monitor application performance, logs, and infrastructure metrics from New Relic for complete visibility into your systems.",
    connected,
    loading,
    fields: connected ? [] : [
      {
        label: "New Relic Account ID",
        value: accountId,
        onChange: setAccountId,
        placeholder: "Enter your New Relic Account ID",
        type: "text"
      },
      {
        label: "User API Key (NRAK-...)",
        value: apiKey,
        onChange: setApiKey,
        placeholder: "NRAK-...",
        type: "password"
      }
    ],
    onConnect: connect,
    onDisconnect: disconnect,
    statusComponent,
    instructions,
    timeEstimate: "> 3 min"
  };

  return {
    ...config,
    checkStatus,
    setConnected,
    setAccountId
  };
}
