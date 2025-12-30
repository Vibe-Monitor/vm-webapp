import { BaseClient, ApiResponse } from '../baseClient';

export interface Member {
  user_id: string;
  user_name: string;
  user_email: string;
  role: 'owner' | 'user';
  joined_at: string;
}

export interface Invitation {
  id: string;
  invitee_email: string;
  role: 'owner' | 'user';
  status: 'pending' | 'accepted' | 'expired';
  expires_at: string;
  created_at: string;
  inviter_name: string;
  workspace_id: string;
  workspace_name: string;
}

export interface InviteMemberRequest {
  email: string;
  role: 'owner' | 'user';
}

export interface UpdateMemberRoleRequest {
  role: 'owner' | 'user';
}

export class MembersClient {
  constructor(private baseClient: BaseClient) {}

  async getMembers(workspaceId: string): Promise<ApiResponse<Member[]>> {
    return this.baseClient.get(`/api/v1/workspaces/${workspaceId}/members`);
  }

  async updateMemberRole(
    workspaceId: string,
    userId: string,
    data: UpdateMemberRoleRequest
  ): Promise<ApiResponse<Member>> {
    return this.baseClient.patch(`/api/v1/workspaces/${workspaceId}/members/${userId}`, data);
  }

  async removeMember(workspaceId: string, userId: string): Promise<ApiResponse<void>> {
    return this.baseClient.delete(`/api/v1/workspaces/${workspaceId}/members/${userId}`);
  }

  async getInvitations(workspaceId: string): Promise<ApiResponse<Invitation[]>> {
    return this.baseClient.get(`/api/v1/workspaces/${workspaceId}/invitations`);
  }

  async createInvitation(
    workspaceId: string,
    data: InviteMemberRequest
  ): Promise<ApiResponse<Invitation>> {
    return this.baseClient.post(`/api/v1/workspaces/${workspaceId}/invitations`, data);
  }

  async revokeInvitation(workspaceId: string, invitationId: string): Promise<ApiResponse<void>> {
    return this.baseClient.delete(`/api/v1/workspaces/${workspaceId}/invitations/${invitationId}`);
  }

  // Token-based invitation methods (for email links)
  async getInvitationByToken(token: string): Promise<ApiResponse<Invitation>> {
    return this.baseClient.get(`/api/v1/invitations/token/${token}`);
  }

  async acceptInvitationByToken(token: string): Promise<ApiResponse<{ id: string; name: string }>> {
    return this.baseClient.post(`/api/v1/invitations/token/${token}/accept`, {});
  }
}
