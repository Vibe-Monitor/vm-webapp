import { BaseClient, ApiResponse } from '../baseClient'
import {
  Deployment,
  DeploymentListResponse,
  CreateDeploymentInput,
  ApiKey,
  ApiKeyCreateResponse,
  ApiKeyListResponse,
  CreateApiKeyInput,
} from '@/types/deployment'

export class DeploymentsClient {
  constructor(private baseClient: BaseClient) {}

  /**
   * Create a deployment record (manual update)
   */
  async create(
    workspaceId: string,
    environmentId: string,
    data: CreateDeploymentInput
  ): Promise<ApiResponse<Deployment>> {
    return this.baseClient.post(
      `/api/v1/deployments/workspaces/${workspaceId}/environments/${environmentId}`,
      data
    )
  }

  /**
   * List deployments for an environment
   */
  async list(
    workspaceId: string,
    environmentId: string,
    options?: { repo?: string; limit?: number; offset?: number }
  ): Promise<ApiResponse<DeploymentListResponse>> {
    const params = new URLSearchParams()
    if (options?.repo) params.append('repo', options.repo)
    if (options?.limit) params.append('limit', options.limit.toString())
    if (options?.offset) params.append('offset', options.offset.toString())

    const query = params.toString() ? `?${params.toString()}` : ''
    return this.baseClient.get(
      `/api/v1/deployments/workspaces/${workspaceId}/environments/${environmentId}${query}`
    )
  }

  /**
   * Get the latest deployment for a specific repo in an environment
   */
  async getLatest(
    workspaceId: string,
    environmentId: string,
    repoFullName: string
  ): Promise<ApiResponse<Deployment | null>> {
    const encodedRepo = encodeURIComponent(repoFullName)
    return this.baseClient.get(
      `/api/v1/deployments/workspaces/${workspaceId}/environments/${environmentId}/repos/${encodedRepo}/latest`
    )
  }

  // ==================== API Key Methods ====================

  /**
   * Create a new API key for the workspace
   */
  async createApiKey(
    workspaceId: string,
    data: CreateApiKeyInput
  ): Promise<ApiResponse<ApiKeyCreateResponse>> {
    return this.baseClient.post(
      `/api/v1/deployments/workspaces/${workspaceId}/api-keys`,
      data
    )
  }

  /**
   * List API keys for a workspace
   */
  async listApiKeys(workspaceId: string): Promise<ApiResponse<ApiKeyListResponse>> {
    return this.baseClient.get(
      `/api/v1/deployments/workspaces/${workspaceId}/api-keys`
    )
  }

  /**
   * Delete an API key
   */
  async deleteApiKey(workspaceId: string, keyId: string): Promise<ApiResponse<void>> {
    return this.baseClient.delete(
      `/api/v1/deployments/workspaces/${workspaceId}/api-keys/${keyId}`
    )
  }
}
