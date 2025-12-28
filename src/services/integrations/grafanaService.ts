import { api } from "@/services/api/apiFactory";
import { GrafanaIntegrationData } from "@/types/integration";

export const grafanaService = {
  async connect(params: {
    workspace_id: string;
    grafana_url: string;
    api_token: string;
  }): Promise<GrafanaIntegrationData> {
    const { workspace_id, grafana_url, api_token } = params;
    const response = await api.grafana.connect(workspace_id, { grafana_url, api_token });
    if (response.status === 200 && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to connect Grafana');
  },

  async getStatus(workspaceId: string): Promise<GrafanaIntegrationData> {
    const response = await api.grafana.getStatus(workspaceId);
    // 404 means integration not configured yet - this is expected, not an error
    if (response.status === 404 || response.status !== 200) {
      return { connected: false };
    }
    return response.data || { connected: false };
  },

  async disconnect(workspaceId: string): Promise<void> {
    const response = await api.grafana.disconnect(workspaceId);
    if (response.status !== 200) {
      throw new Error(response.error || 'Failed to disconnect Grafana');
    }
  }
};
