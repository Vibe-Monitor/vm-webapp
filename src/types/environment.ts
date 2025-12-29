/**
 * Environment Types
 *
 * Types for environment configuration and repository mappings.
 */

export interface Environment {
  id: string
  name: string
  workspace_id: string
  is_default: boolean
  auto_discovery_enabled: boolean
  created_at: string
  updated_at: string
}

export interface RepositoryBranch {
  name: string
  is_default: boolean
}

export interface RepositoryConfig {
  id: string
  repo_full_name: string // owner/repo format
  branch_name: string | null
  is_enabled: boolean
  created_at: string
  updated_at: string | null
}

export interface AvailableRepository {
  full_name: string // owner/repo format
  default_branch: string
  is_private: boolean
}

export interface EnvironmentWithRepos extends Environment {
  repository_configs: RepositoryConfig[]
}

export interface CreateEnvironmentInput {
  name: string
  auto_discovery_enabled?: boolean
}

export interface UpdateEnvironmentInput {
  name?: string
  auto_discovery_enabled?: boolean
}

export interface CreateRepositoryConfigInput {
  repo_full_name: string
  branch_name?: string
  is_enabled?: boolean
}

export interface UpdateRepositoryConfigInput {
  branch_name?: string
  is_enabled?: boolean
}
