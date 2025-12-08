import { useEffect, useState, useRef } from "react";

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
  enablePolling?: boolean;
}

export function useIntegrationStatusPoller({
  workspaceId,
  integrations,
  pollingInterval = 30000, // 30 seconds default
  enablePolling = false, // Disabled by default - only check once on mount
}: UseIntegrationStatusPollerProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Use ref to store latest integrations without triggering re-renders
  const integrationsRef = useRef(integrations);

  // Update ref when integrations change
  useEffect(() => {
    integrationsRef.current = integrations;
  }, [integrations]);

  useEffect(() => {
    if (!workspaceId) {
      setIsLoading(false);
      return;
    }

    // Initial check for all integrations
    const checkAllStatuses = async () => {
      const promises = Object.values(integrationsRef.current)
        .filter((integration): integration is IntegrationPoller => integration !== undefined)
        .map(integration => integration.checkStatus());

      await Promise.all(promises);
    };

    // Check status immediately on mount
    const performInitialCheck = async () => {
      setIsLoading(true);
      try {
        await checkAllStatuses();
      } finally {
        setIsLoading(false);
      }
    };

    performInitialCheck();

    // Only set up polling interval if enabled
    if (!enablePolling) {
      return; // Skip polling - only performed initial check
    }

    // Set up polling interval
    const interval = setInterval(() => {
      checkAllStatuses();
    }, pollingInterval);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [workspaceId, pollingInterval, enablePolling]);

  return { isLoading };
}
