import { BaseClient, ApiResponse } from '../baseClient';

export class DatadogClient {
  constructor(private baseClient: BaseClient) {}

  async connect(data: {
    workspace_id: string;
    api_key: string;
    app_key: string;
    region: string;
  }): Promise<ApiResponse<{
    id: string;
    workspace_id: string;
    region: string;
    connected: boolean;
    created_at: string;
    updated_at: string | null;
  }>> {
    return this.baseClient.post(`/api/v1/datadog/integration?workspace_id=${data.workspace_id}`, {
      api_key: data.api_key,
      app_key: data.app_key,
      region: data.region,
    });
  }

  async getStatus(workspaceId: string): Promise<ApiResponse<{
    is_connected: boolean;
    integration?: {
      id: string;
      workspace_id: string;
      region: string;
      created_at: string;
      updated_at: string | null;
    };
  }>> {
    return this.baseClient.get(`/api/v1/datadog/integration/status?workspace_id=${workspaceId}`);
  }

  async disconnect(workspaceId: string): Promise<ApiResponse<{
    message: string;
    workspace_id: string;
  }>> {
    return this.baseClient.delete(`/api/v1/datadog/integration?workspace_id=${workspaceId}`);
  }
}
