import { api } from "@/services/api/apiFactory";

export interface NewRelicIntegrationData {
  is_connected: boolean;
  integration?: {
    id: string;
    workspace_id: string;
    account_id: string;
    created_at: string;
    updated_at: string | null;
  };
}

export const newrelicService = {
  async connect(params: {
    workspace_id: string;
    account_id: string;
    api_key: string;
  }): Promise<NewRelicIntegrationData> {
    const response = await api.newrelic.connect(params);
    if (response.status >= 200 && response.status < 300 && response.data) {
      // Re-fetch status to get the actual connection data
      const statusCheck = await api.newrelic.getStatus(params.workspace_id);
      return statusCheck.data || { is_connected: false };
    }
    throw new Error(response.error || 'Failed to connect New Relic');
  },

  async getStatus(workspaceId: string): Promise<NewRelicIntegrationData> {
    const response = await api.newrelic.getStatus(workspaceId);
    // 404 means integration not configured yet - this is expected, not an error
    if (response.status === 404 || response.status !== 200) {
      return { is_connected: false };
    }
    return response.data || { is_connected: false };
  },

  async disconnect(workspaceId: string): Promise<void> {
    const response = await api.newrelic.disconnect(workspaceId);
    if (response.status !== 200) {
      throw new Error(response.error || 'Failed to disconnect New Relic');
    }
  }
};
