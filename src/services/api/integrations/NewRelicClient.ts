import { BaseClient, ApiResponse } from '../baseClient';

export class NewRelicClient {
  constructor(private baseClient: BaseClient) {}

  async connect(data: {
    workspace_id: string;
    account_id: string;
    api_key: string;
  }): Promise<ApiResponse<{
    id: string;
    workspace_id: string;
    account_id: string;
    connected: boolean;
    created_at: string;
    updated_at: string | null;
  }>> {
    return this.baseClient.post(`/api/v1/newrelic/integration?workspace_id=${data.workspace_id}`, {
      account_id: data.account_id,
      api_key: data.api_key,
    });
  }

  async getStatus(workspaceId: string): Promise<ApiResponse<{
    is_connected: boolean;
    integration?: {
      id: string;
      workspace_id: string;
      account_id: string;
      created_at: string;
      updated_at: string | null;
    };
  }>> {
    return this.baseClient.get(`/api/v1/newrelic/integration/status?workspace_id=${workspaceId}`);
  }

  async disconnect(workspaceId: string): Promise<ApiResponse<{
    message: string;
    workspace_id: string;
  }>> {
    return this.baseClient.delete(`/api/v1/newrelic/integration?workspace_id=${workspaceId}`);
  }
}
