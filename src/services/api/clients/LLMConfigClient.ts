import { BaseClient, ApiResponse } from '../baseClient';

export type LLMProvider = 'vibemonitor' | 'openai' | 'azure_openai' | 'google_gemini';

export interface LLMConfig {
  id: string;
  workspace_id: string;
  provider: LLMProvider;
  model?: string;
  api_key_set: boolean;
  endpoint_url?: string;
  deployment_name?: string;
  api_version?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface LLMConfigCreateRequest {
  provider: LLMProvider;
  api_key?: string;
  model?: string;
  endpoint_url?: string;
  deployment_name?: string;
  api_version?: string;
}

export type LLMConfigUpdateRequest = LLMConfigCreateRequest

export interface LLMConfigVerifyRequest {
  provider: LLMProvider;
  api_key: string;
  model?: string;
  endpoint_url?: string;
  deployment_name?: string;
  api_version?: string;
}

export interface LLMConfigVerifyResponse {
  success: boolean;
  message: string;
  model_name?: string;
}

export class LLMConfigClient {
  constructor(private baseClient: BaseClient) {}

  async getConfig(workspaceId: string): Promise<ApiResponse<LLMConfig>> {
    return this.baseClient.get(`/api/v1/workspaces/${workspaceId}/llm-config`);
  }

  async verifyCredentials(
    workspaceId: string,
    data: LLMConfigVerifyRequest
  ): Promise<ApiResponse<LLMConfigVerifyResponse>> {
    return this.baseClient.post(
      `/api/v1/workspaces/${workspaceId}/llm-config/verify`,
      data
    );
  }

  async updateConfig(
    workspaceId: string,
    data: LLMConfigUpdateRequest
  ): Promise<ApiResponse<LLMConfig>> {
    return this.baseClient.put(
      `/api/v1/workspaces/${workspaceId}/llm-config`,
      data
    );
  }

  async resetConfig(workspaceId: string): Promise<ApiResponse<LLMConfig>> {
    return this.baseClient.delete(`/api/v1/workspaces/${workspaceId}/llm-config`);
  }
}
