import { BaseClient, ApiResponse } from '../baseClient';

export class SlackClient {
  constructor(private baseClient: BaseClient) {}

  async getInstallUrl(workspaceId: string): Promise<ApiResponse<{ oauth_url: string }>> {
    return this.baseClient.get(`/api/v1/workspaces/${workspaceId}/slack/install`);
  }

  async getStatus(workspaceId: string): Promise<ApiResponse<{
    connected: boolean;
    message: string;
    data?: {
      team_id: string;
      team_name: string;
      bot_user_id: string;
      workspace_id: string;
      installed_at: string;
    };
  }>> {
    return this.baseClient.get(`/api/v1/workspaces/${workspaceId}/slack/status`);
  }

  async disconnect(workspaceId: string): Promise<ApiResponse<{ message: string }>> {
    return this.baseClient.delete(`/api/v1/workspaces/${workspaceId}/slack/disconnect`);
  }
}
