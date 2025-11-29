import { api } from "@/services/api/apiFactory";
import { GrafanaIntegrationData } from "@/types/integration";

export const grafanaService = {
  async connect(params: {
    workspace_id: string;
    grafana_url: string;
    api_token: string;
  }): Promise<GrafanaIntegrationData> {
    const response = await api.grafana.connect(params);
    if (response.status === 200 && response.data) {
      return response.data;
    }
    throw new Error(response.error || 'Failed to connect Grafana');
  },

  async getStatus(workspaceId: string): Promise<GrafanaIntegrationData> {
    const response = await api.grafana.getStatus(workspaceId);
    return response.data || { connected: false };
  },

  async disconnect(workspaceId: string): Promise<void> {
    const response = await api.grafana.disconnect(workspaceId);
    if (response.status !== 200) {
      throw new Error(response.error || 'Failed to disconnect Grafana');
    }
  }
};
