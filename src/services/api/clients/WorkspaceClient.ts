import { BaseClient, ApiResponse } from '../baseClient';

export class WorkspaceClient {
  constructor(private baseClient: BaseClient) {}

  async getAll(): Promise<ApiResponse<{
    id: string;
    name: string;
    type: 'personal' | 'team';
    is_paid: boolean;
    created_at: string;
    updated_at: string;
    user_role: 'owner' | 'user';
  }[]>> {
    return this.baseClient.get('/api/v1/workspaces/');
  }

  async create(data: { name: string }): Promise<ApiResponse<{
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  }>> {
    return this.baseClient.post('/api/v1/workspaces/', data);
  }

  async getById(workspaceId: string): Promise<ApiResponse<{
    id: string;
    name: string;
    type: 'personal' | 'team';
    is_paid: boolean;
    created_at: string;
    user_role: 'owner' | 'user';
  }>> {
    return this.baseClient.get(`/api/v1/workspaces/${workspaceId}`);
  }

  async update(workspaceId: string, data: { name: string }): Promise<ApiResponse<{
    id: string;
    name: string;
    domain: string;
    visible_to_org: boolean;
    is_paid: boolean;
    created_at: string;
  }>> {
    return this.baseClient.patch(`/api/v1/workspaces/${workspaceId}`, data);
  }
}
