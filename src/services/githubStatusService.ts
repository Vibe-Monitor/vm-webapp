import { apiService } from '@/services/apiService'

export interface GitHubIntegrationStatus {
  connected: boolean
  integration?: {
    id: string
    github_username: string
    installation_id: string
    last_synced_at: string
    is_active?: boolean
    suspended_at?: string
    suspension_reason?: string
  }
}

/**
 * Check GitHub integration status for a workspace
 * This function implements the logic you provided for checking GitHub status
 */
export const checkGitHubStatus = async (workspaceId: string, token: string): Promise<{
  status: 'connected' | 'suspended' | 'not-connected' | 'error'
  data?: GitHubIntegrationStatus
  error?: string
}> => {
  try {
    const response = await fetch(`/api/v1/github/status?workspace_id=${workspaceId}`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data: GitHubIntegrationStatus = await response.json()
    
    if (data.connected) {
      if (data.integration?.is_active === false) {
        // 🚨 SUSPENDED!
        return {
          status: 'suspended',
          data
        }
      } else {
        // ✅ Active and working
        return {
          status: 'connected',
          data
        }
      }
    } else {
      // Not connected at all
      return {
        status: 'not-connected',
        data
      }
    }
  } catch (error) {
    console.error('Failed to check GitHub status:', error)
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Alternative implementation using the existing API service
 */
export const checkGitHubStatusWithService = async (workspaceId: string): Promise<{
  status: 'connected' | 'suspended' | 'not-connected' | 'error'
  data?: GitHubIntegrationStatus
  error?: string
}> => {
  try {
    const response = await apiService.getGithubStatus(workspaceId)
    
    if (response.status !== 200 || !response.data) {
      throw new Error(response.error || 'Failed to get GitHub status')
    }
    
    const data = response.data
    
    if (data.connected) {
      if (data.integration?.is_active === false) {
        // 🚨 SUSPENDED!
        return {
          status: 'suspended',
          data
        }
      } else {
        // ✅ Active and working (assume active if is_active is not explicitly false)
        return {
          status: 'connected',
          data
        }
      }
    } else {
      // Not connected at all
      return {
        status: 'not-connected',
        data
      }
    }
  } catch (error) {
    console.error('Failed to check GitHub status:', error)
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}