import { api } from "@/services/api/apiFactory";
import { checkGitHubStatusWithService } from "@/services/githubStatusService";
import { GithubIntegrationData, GithubStatus } from "@/types/integration";

export const githubService = {
  async getInstallUrl(workspaceId: string): Promise<{ install_url: string }> {
    const response = await api.github.getInstallUrl(workspaceId);
    if (!response.data?.install_url) {
      throw new Error('Failed to get GitHub install URL');
    }
    return { install_url: response.data.install_url };
  },

  async getStatus(workspaceId: string): Promise<{ status: GithubStatus; data: GithubIntegrationData | null }> {
    const result = await checkGitHubStatusWithService(workspaceId);
    return {
      status: result.status,
      data: result.data || null
    };
  },

  async disconnect(workspaceId: string): Promise<void> {
    const response = await api.github.disconnect(workspaceId);
    if (response.status !== 200) {
      throw new Error(response.error || 'Failed to disconnect GitHub');
    }
  },

  async suspend(workspaceId: string): Promise<void> {
    const response = await api.github.suspend(workspaceId);
    if (response.status !== 200) {
      throw new Error(response.error || 'Failed to suspend GitHub integration');
    }
  },

  async unsuspend(workspaceId: string): Promise<void> {
    const response = await api.github.unsuspend(workspaceId);
    if (response.status !== 200) {
      throw new Error(response.error || 'Failed to unsuspend GitHub integration');
    }
  }
};
