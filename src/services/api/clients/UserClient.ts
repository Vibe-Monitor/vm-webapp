import { BaseClient, ApiResponse } from '../baseClient';

export class UserClient {
  constructor(private baseClient: BaseClient) {}

  async getProfile(): Promise<ApiResponse<{
    id: string;
    name: string;
    email: string;
    created_at: string;
  }>> {
    return this.baseClient.get('/api/v1/auth/me');
  }
  async logout(): Promise<ApiResponse<null>>{
    return this.baseClient.post('/api/v1/auth/logout', {});
  }
}
  
