import { api } from "@/services/api/apiFactory";
import { SlackIntegrationData } from "@/types/integration";

export const slackService = {
  async getInstallUrl(workspaceId: string): Promise<{ oauth_url: string }> {
    const response = await api.slack.getInstallUrl(workspaceId);
    if (response.status === 200 && response.data?.oauth_url) {
      return { oauth_url: response.data.oauth_url };
    }
    throw new Error(response.error || 'Failed to get Slack OAuth URL');
  },

  async getStatus(workspaceId: string): Promise<SlackIntegrationData> {
    const response = await api.slack.getStatus(workspaceId);
    // 404 means integration not configured yet - this is expected, not an error
    if (response.status === 404 || response.status !== 200) {
      return { connected: false };
    }
    return response.data || { connected: false };
  },

  async disconnect(workspaceId: string): Promise<void> {
    const response = await api.slack.disconnect(workspaceId);
    if (response.status !== 200) {
      throw new Error(response.error || 'Failed to disconnect Slack');
    }
  }
};
