import { BaseClient, ApiResponse } from '../baseClient';

export interface DeletionPreview {
  blocking_workspaces: Array<{
    id: string;
    name: string;
    reason: string;
  }>;
  workspaces_to_delete: Array<{
    id: string;
    name: string;
  }>;
  workspaces_to_leave: Array<{
    id: string;
    name: string;
  }>;
  can_delete: boolean;
}

export interface UpdateProfileData {
  name?: string;
  newsletter_subscribed?: boolean;
}

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  newsletter_subscribed: boolean;
  auth_provider: 'google' | 'credentials';
  created_at: string;
}

export interface DeleteAccountData {
  confirmation: string;
  password?: string;
}

export class AccountClient {
  constructor(private baseClient: BaseClient) {}

  async getProfile(): Promise<ApiResponse<ProfileData>> {
    return this.baseClient.get('/api/v1/account');
  }

  async updateProfile(data: UpdateProfileData): Promise<ApiResponse<ProfileData>> {
    return this.baseClient.patch('/api/v1/account', data);
  }

  async getDeletionPreview(): Promise<ApiResponse<DeletionPreview>> {
    return this.baseClient.get('/api/v1/account/deletion-preview');
  }

  async deleteAccount(data: DeleteAccountData): Promise<ApiResponse<null>> {
    return this.baseClient.request('/api/v1/account', {
      method: 'DELETE',
      body: JSON.stringify(data),
    });
  }
}
