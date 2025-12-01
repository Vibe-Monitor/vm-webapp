import { api } from "@/services/api/apiFactory";
import { AwsIntegrationData } from "@/types/integration";

export const awsService = {
  async connect(params: {
    workspace_id: string;
    role_arn: string;
    external_id: string;
    region: string;
  }): Promise<AwsIntegrationData> {
    const response = await api.aws.connect(params);
    if (response.status >= 200 && response.status < 300) {
      // Re-fetch status to get the actual connection data
      const statusCheck = await api.aws.getStatus(params.workspace_id);
      return statusCheck.data || {};
    }
    throw new Error(response.error || 'Failed to connect AWS CloudWatch');
  },

  async getStatus(workspaceId: string): Promise<{ connected: boolean; data?: AwsIntegrationData }> {
    try {
      const response = await api.aws.getStatus(workspaceId);
      if (response.status === 200 && response.data) {
        return { connected: true, data: response.data };
      }
      return { connected: false };
    } catch (error) {
      return { connected: false };
    }
  },

  async disconnect(workspaceId: string): Promise<void> {
    const response = await api.aws.disconnect(workspaceId);
    if (response.status !== 200) {
      throw new Error(response.error || 'Failed to disconnect AWS CloudWatch');
    }
  }
};
