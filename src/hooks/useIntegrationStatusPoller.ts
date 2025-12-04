import { useEffect } from "react";

interface IntegrationPoller {
  checkStatus: () => Promise<void>;
}

interface UseIntegrationStatusPollerProps {
  workspaceId: string | undefined;
  integrations: {
    slack?: IntegrationPoller;
    github?: IntegrationPoller;
    grafana?: IntegrationPoller;
    aws?: IntegrationPoller;
    datadog?: IntegrationPoller;
    newrelic?: IntegrationPoller;
  };
  pollingInterval?: number;
}

export function useIntegrationStatusPoller({
  workspaceId,
  integrations,
  pollingInterval = 30000, // 30 seconds default
}: UseIntegrationStatusPollerProps) {
  useEffect(() => {
    if (!workspaceId) return;

    // Initial check for all integrations
    const checkAllStatuses = async () => {
      const promises = Object.values(integrations)
        .filter((integration): integration is IntegrationPoller => integration !== undefined)
        .map(integration => integration.checkStatus());

      await Promise.all(promises);
    };

    // Check status immediately on mount
    checkAllStatuses();

    // Set up polling interval
    const interval = setInterval(() => {
      checkAllStatuses();
    }, pollingInterval);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [workspaceId, integrations, pollingInterval]);
}
