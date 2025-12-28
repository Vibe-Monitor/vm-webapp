import { BaseClient, ApiResponse } from '../baseClient';

export class GithubClient {
  constructor(private baseClient: BaseClient) {}

  async getInstallUrl(workspaceId: string): Promise<ApiResponse<{
    install_url: string;
    message: string;
  }>> {
    return this.baseClient.get(`/api/v1/github/install?workspace_id=${workspaceId}`);
  }

  async handleCallback(params: {
    installation_id: string;
    setup_action: string;
    state?: string;
  }): Promise<ApiResponse<{ message: string }>> {
    const queryParams = new URLSearchParams({
      installation_id: params.installation_id,
      setup_action: params.setup_action,
      ...(params.state && { state: params.state })
    });
    return this.baseClient.get(`/api/v1/github/callback?${queryParams.toString()}`);
  }

  async getStatus(workspaceId: string): Promise<ApiResponse<{
    connected: boolean;
    integration?: {
      id: string;
      github_username: string;
      installation_id: string;
      last_synced_at: string;
      is_active?: boolean;
      suspended_at?: string;
      suspension_reason?: string;
    };
  }>> {
    return this.baseClient.get(`/api/v1/github/status?workspace_id=${workspaceId}`);
  }

  async disconnect(workspaceId: string): Promise<ApiResponse<{ message: string }>> {
    return this.baseClient.delete(`/api/v1/github/disconnect?workspace_id=${workspaceId}`);
  }

  async suspend(workspaceId: string): Promise<ApiResponse<{ message: string }>> {
    return this.baseClient.post(`/api/v1/github/suspend?workspace_id=${workspaceId}`, {});
  }

  async unsuspend(workspaceId: string): Promise<ApiResponse<{ message: string }>> {
    return this.baseClient.post(`/api/v1/github/unsuspend?workspace_id=${workspaceId}`, {});
  }

  async getRepositories(workspaceId: string): Promise<ApiResponse<{
    full_name: string;
    default_branch: string;
  }[]>> {
    return this.baseClient.get(`/api/v1/github/repositories?workspace_id=${workspaceId}`);
  }
}
