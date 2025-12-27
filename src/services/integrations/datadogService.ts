import { api } from "@/services/api/apiFactory";

export interface DatadogIntegrationData {
  is_connected: boolean;
  integration?: {
    id: string;
    workspace_id: string;
    region: string;
    created_at: string;
    updated_at: string | null;
  };
}

export const datadogService = {
  async connect(params: {
    workspace_id: string;
    api_key: string;
    app_key: string;
    region: string;
  }): Promise<DatadogIntegrationData> {
    const response = await api.datadog.connect(params);
    if (response.status >= 200 && response.status < 300 && response.data) {
      // Re-fetch status to get the actual connection data
      const statusCheck = await api.datadog.getStatus(params.workspace_id);
      return statusCheck.data || { is_connected: false };
    }
    throw new Error(response.error || 'Failed to connect Datadog');
  },

  async getStatus(workspaceId: string): Promise<DatadogIntegrationData> {
    const response = await api.datadog.getStatus(workspaceId);
    // 404 means integration not configured yet - this is expected, not an error
    if (response.status === 404 || response.status !== 200) {
      return { is_connected: false };
    }
    return response.data || { is_connected: false };
  },

  async disconnect(workspaceId: string): Promise<void> {
    const response = await api.datadog.disconnect(workspaceId);
    if (response.status !== 200) {
      throw new Error(response.error || 'Failed to disconnect Datadog');
    }
  }
};
