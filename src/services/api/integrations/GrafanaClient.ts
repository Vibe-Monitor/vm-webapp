import { BaseClient, ApiResponse } from '../baseClient';

export class GrafanaClient {
  constructor(private baseClient: BaseClient) {}

  async connect(
    workspaceId: string,
    data: {
      grafana_url: string;
      api_token: string;
    }
  ): Promise<ApiResponse<{
    id: string;
    workspace_id: string;
    grafana_url: string;
    connected: boolean;
    created_at: string;
    updated_at: string | null;
  }>> {
    return this.baseClient.post(`/api/v1/workspaces/${workspaceId}/grafana/connect`, data);
  }

  async getStatus(workspaceId: string): Promise<ApiResponse<{
    id: string;
    workspace_id: string;
    grafana_url: string;
    connected: boolean;
    created_at: string;
    updated_at: string | null;
  }>> {
    return this.baseClient.get(`/api/v1/workspaces/${workspaceId}/grafana/status`);
  }

  async disconnect(workspaceId: string): Promise<ApiResponse<{
    message: string;
    workspace_id: string;
  }>> {
    return this.baseClient.delete(`/api/v1/workspaces/${workspaceId}/grafana/disconnect`);
  }
}
