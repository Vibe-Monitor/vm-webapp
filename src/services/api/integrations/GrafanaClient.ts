import { BaseClient, ApiResponse } from '../baseClient';

export class GrafanaClient {
  constructor(private baseClient: BaseClient) {}

  async connect(data: {
    workspace_id: string;
    grafana_url: string;
    api_token: string;
  }): Promise<ApiResponse<{
    id: string;
    workspace_id: string;
    grafana_url: string;
    connected: boolean;
    created_at: string;
    updated_at: string | null;
  }>> {
    return this.baseClient.post('/api/v1/grafana/connect', data);
  }

  async getStatus(workspaceId: string): Promise<ApiResponse<{
    id: string;
    workspace_id: string;
    grafana_url: string;
    connected: boolean;
    created_at: string;
    updated_at: string | null;
  }>> {
    return this.baseClient.get(`/api/v1/grafana/status/${workspaceId}`);
  }

  async disconnect(workspaceId: string): Promise<ApiResponse<{
    message: string;
    workspace_id: string;
  }>> {
    return this.baseClient.delete(`/api/v1/grafana/disconnect/${workspaceId}`);
  }
}
