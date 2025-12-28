import { BaseClient, ApiResponse } from '../baseClient'
import {
  Environment,
  EnvironmentWithRepos,
  AvailableRepository,
  RepositoryBranch,
  RepositoryConfig,
  CreateEnvironmentInput,
  UpdateEnvironmentInput,
  CreateRepositoryConfigInput,
  UpdateRepositoryConfigInput,
} from '@/types/environment'

export class EnvironmentsClient {
  constructor(private baseClient: BaseClient) {}

  /**
   * Get all environments for a workspace
   */
  async getByWorkspace(workspaceId: string): Promise<ApiResponse<EnvironmentWithRepos[]>> {
    return this.baseClient.get(`/api/v1/environments/workspace/${workspaceId}`)
  }

  /**
   * Create a new environment
   */
  async create(
    workspaceId: string,
    data: CreateEnvironmentInput
  ): Promise<ApiResponse<Environment>> {
    return this.baseClient.post('/api/v1/environments', {
      ...data,
      workspace_id: workspaceId,
    })
  }

  /**
   * Update an environment
   */
  async update(
    environmentId: string,
    data: UpdateEnvironmentInput
  ): Promise<ApiResponse<Environment>> {
    return this.baseClient.put(`/api/v1/environments/${environmentId}`, data)
  }

  /**
   * Delete an environment
   */
  async delete(environmentId: string): Promise<ApiResponse<void>> {
    return this.baseClient.delete(`/api/v1/environments/${environmentId}`)
  }

  /**
   * Set an environment as the default for its workspace
   */
  async setDefault(environmentId: string): Promise<ApiResponse<Environment>> {
    return this.baseClient.post(`/api/v1/environments/${environmentId}/set-default`, {})
  }

  /**
   * Get available repositories for an environment (from GitHub integration)
   */
  async getAvailableRepositories(
    environmentId: string
  ): Promise<ApiResponse<AvailableRepository[]>> {
    return this.baseClient.get(`/api/v1/environments/${environmentId}/available-repositories`)
  }

  /**
   * Get branches for a specific repository
   */
  async getRepositoryBranches(
    workspaceId: string,
    repoFullName: string
  ): Promise<ApiResponse<RepositoryBranch[]>> {
    const encodedRepo = encodeURIComponent(repoFullName)
    return this.baseClient.get(
      `/api/v1/environments/workspace/${workspaceId}/repositories/${encodedRepo}/branches`
    )
  }

  /**
   * Add a repository configuration to an environment
   */
  async addRepositoryConfig(
    environmentId: string,
    data: CreateRepositoryConfigInput
  ): Promise<ApiResponse<RepositoryConfig>> {
    return this.baseClient.post(`/api/v1/environments/${environmentId}/repositories`, data)
  }

  /**
   * Update a repository configuration
   */
  async updateRepositoryConfig(
    environmentId: string,
    repoConfigId: string,
    data: UpdateRepositoryConfigInput
  ): Promise<ApiResponse<RepositoryConfig>> {
    return this.baseClient.put(
      `/api/v1/environments/${environmentId}/repositories/${repoConfigId}`,
      data
    )
  }

  /**
   * Remove a repository configuration from an environment
   */
  async removeRepositoryConfig(
    environmentId: string,
    repoConfigId: string
  ): Promise<ApiResponse<void>> {
    return this.baseClient.delete(
      `/api/v1/environments/${environmentId}/repositories/${repoConfigId}`
    )
  }
}
