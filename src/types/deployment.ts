/**
 * Deployment Types
 *
 * Types for deployment tracking per environment.
 */

export type DeploymentStatus =
  | 'pending'
  | 'in_progress'
  | 'success'
  | 'failed'
  | 'cancelled'

export type DeploymentSource =
  | 'manual'
  | 'webhook'
  | 'github_actions'
  | 'github_deployments'
  | 'argocd'
  | 'jenkins'

export interface Deployment {
  id: string
  environment_id: string
  repo_full_name: string
  branch: string | null
  commit_sha: string | null
  status: DeploymentStatus
  source: DeploymentSource
  deployed_at: string | null
  extra_data: Record<string, unknown> | null
  created_at: string
}

export interface CreateDeploymentInput {
  repo_full_name: string
  branch?: string
  commit_sha?: string
  status?: DeploymentStatus
  source?: DeploymentSource
  deployed_at?: string
  extra_data?: Record<string, unknown>
}

export interface DeploymentListResponse {
  deployments: Deployment[]
  total: number
}

// API Key types
export interface ApiKey {
  id: string
  name: string
  key_prefix: string
  last_used_at: string | null
  created_at: string
}

export interface ApiKeyCreateResponse {
  id: string
  name: string
  key: string // Full key, shown only once
  key_prefix: string
  created_at: string
}

export interface CreateApiKeyInput {
  name: string
}

export interface ApiKeyListResponse {
  api_keys: ApiKey[]
}
