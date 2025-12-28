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
    return this.baseClient.get(`/api/v1/workspaces/${workspaceId}/environments`)
  }

  /**
   * Get a single environment
   */
  async getById(
    workspaceId: string,
    environmentId: string
  ): Promise<ApiResponse<EnvironmentWithRepos>> {
    return this.baseClient.get(
      `/api/v1/workspaces/${workspaceId}/environments/${environmentId}`
    )
  }

  /**
   * Create a new environment (workspace_id no longer needed in body)
   */
  async create(
    workspaceId: string,
    data: CreateEnvironmentInput
  ): Promise<ApiResponse<Environment>> {
    return this.baseClient.post(`/api/v1/workspaces/${workspaceId}/environments`, data)
  }

  /**
   * Update an environment
   */
  async update(
    workspaceId: string,
    environmentId: string,
    data: UpdateEnvironmentInput
  ): Promise<ApiResponse<Environment>> {
    return this.baseClient.patch(
      `/api/v1/workspaces/${workspaceId}/environments/${environmentId}`,
      data
    )
  }

  /**
   * Delete an environment
   */
  async delete(workspaceId: string, environmentId: string): Promise<ApiResponse<void>> {
    return this.baseClient.delete(
      `/api/v1/workspaces/${workspaceId}/environments/${environmentId}`
    )
  }

  /**
   * Set an environment as the default for its workspace
   */
  async setDefault(
    workspaceId: string,
    environmentId: string
  ): Promise<ApiResponse<Environment>> {
    return this.baseClient.post(
      `/api/v1/workspaces/${workspaceId}/environments/${environmentId}/set-default`,
      {}
    )
  }

  /**
   * Get available repositories for an environment (from GitHub integration)
   */
  async getAvailableRepositories(
    workspaceId: string,
    environmentId: string
  ): Promise<ApiResponse<AvailableRepository[]>> {
    return this.baseClient.get(
      `/api/v1/workspaces/${workspaceId}/environments/${environmentId}/available-repositories`
    )
  }

  /**
   * Get branches for a specific repository (moved to /github endpoint)
   */
  async getRepositoryBranches(
    workspaceId: string,
    repoFullName: string
  ): Promise<ApiResponse<RepositoryBranch[]>> {
    const encodedRepo = encodeURIComponent(repoFullName)
    return this.baseClient.get(
      `/api/v1/github/repositories/${encodedRepo}/branches?workspace_id=${workspaceId}`
    )
  }

  /**
   * Add a repository configuration to an environment
   */
  async addRepositoryConfig(
    workspaceId: string,
    environmentId: string,
    data: CreateRepositoryConfigInput
  ): Promise<ApiResponse<RepositoryConfig>> {
    return this.baseClient.post(
      `/api/v1/workspaces/${workspaceId}/environments/${environmentId}/repositories`,
      data
    )
  }

  /**
   * Update a repository configuration
   */
  async updateRepositoryConfig(
    workspaceId: string,
    environmentId: string,
    repoConfigId: string,
    data: UpdateRepositoryConfigInput
  ): Promise<ApiResponse<RepositoryConfig>> {
    return this.baseClient.patch(
      `/api/v1/workspaces/${workspaceId}/environments/${environmentId}/repositories/${repoConfigId}`,
      data
    )
  }

  /**
   * Remove a repository configuration from an environment
   */
  async removeRepositoryConfig(
    workspaceId: string,
    environmentId: string,
    repoConfigId: string
  ): Promise<ApiResponse<void>> {
    return this.baseClient.delete(
      `/api/v1/workspaces/${workspaceId}/environments/${environmentId}/repositories/${repoConfigId}`
    )
  }
}
