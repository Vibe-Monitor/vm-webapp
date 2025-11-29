import { BaseClient, ApiResponse } from '../baseClient';

export class AwsClient {
  constructor(private baseClient: BaseClient) {}

  async connect(data: {
    workspace_id: string;
    role_arn: string;
    external_id: string;
    region?: string;
  }): Promise<ApiResponse<{
    id: string;
    workspace_id: string;
    role_arn: string;
    external_id: string;
    region: string;
    connected: boolean;
    created_at: string;
    updated_at: string | null;
  }>> {
    return this.baseClient.post(`/api/v1/aws/integration?workspace_id=${data.workspace_id}`, {
      role_arn: data.role_arn,
      external_id: data.external_id,
      aws_region: data.region || 'us-east-1',
    });
  }

  async getStatus(workspaceId: string): Promise<ApiResponse<{
    aws_region: string;
    id: string;
    workspace_id: string;
    role_arn: string;
    region: string;
    connected: boolean;
    created_at: string;
    updated_at: string | null;
  }>> {
    return this.baseClient.get(`/api/v1/aws/integration/status?workspace_id=${workspaceId}`);
  }

  async disconnect(workspaceId: string): Promise<ApiResponse<{
    message: string;
    workspace_id: string;
  }>> {
    return this.baseClient.delete(`/api/v1/aws/integration?workspace_id=${workspaceId}`);
  }
}
