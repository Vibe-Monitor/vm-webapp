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
    return response.data || { connected: false };
  },

  async disconnect(workspaceId: string): Promise<void> {
    const response = await api.slack.disconnect(workspaceId);
    if (response.status !== 200) {
      throw new Error(response.error || 'Failed to disconnect Slack');
    }
  }
};
