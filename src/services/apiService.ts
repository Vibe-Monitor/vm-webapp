import { tokenService } from './tokenService';
import { errorHandler } from '@/lib/errorHandler';
import { CookieUtils } from '@/utils/cookieUtils';

interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  status: number;
}

export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl || process.env.NEXT_PUBLIC_BACKEND_URL || '';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      // Check if token is expired or about to expire, and refresh if needed
      await this.ensureValidToken();

      const token = tokenService.getAccessToken();
      const headers = new Headers(options.headers);

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      headers.set('Content-Type', 'application/json');

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers
      });

      const data = await response.json();

      if (response.status === 401 && token) {
        // Token might be expired, try refresh
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry the original request with new token
          headers.set('Authorization', `Bearer ${tokenService.getAccessToken()}`);
          const retryResponse = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers
          });
          const retryData = await retryResponse.json();
          return { data: retryData, status: retryResponse.status };
        } else {
          // Refresh failed, handle auth error properly
          errorHandler.handleAuthError('Token refresh failed', {
            customMessage: 'Your session has expired. Please log in again.',
            redirectToAuth: true
          });
          return { error: 'Authentication failed', status: 401 };
        }
      }

      return { data, status: response.status };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Network error';
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Failed to connect to server. Please check your internet connection.'
      });
      return { error: errorMessage, status: 500 };
    }
  }

  private async ensureValidToken(): Promise<void> {
    const hasValidToken = tokenService.hasValidToken();
    const refreshToken = tokenService.getRefreshToken();

    if (!hasValidToken && refreshToken) {
      // Token is expired or about to expire, refresh it
      const refreshed = await this.refreshToken();
      if (!refreshed) {
        // Refresh failed, handle auth error properly
        errorHandler.handleAuthError('Token validation failed', {
          customMessage: 'Session expired. Redirecting to login...',
          redirectToAuth: true
        });
      }
    }
  }

  async refreshToken(): Promise<boolean> {
    const refreshToken = tokenService.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${this.baseUrl}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refresh_token: refreshToken
        })
      });

      if (response.ok) {
        const tokenData = await response.json();

        // Update the access token and expiration time in localStorage
        if (tokenData.access_token && tokenData.expires_in) {
          tokenService.updateAccessToken(tokenData.access_token, tokenData.expires_in);
        }

        // Store new refresh token in cookie if provided (with 30-day expiration)
        if (tokenData.refresh_token) {
          CookieUtils.setRefreshToken(tokenData.refresh_token);
        }

        return true;
      }

      // Handle non-200 responses from refresh endpoint - refresh token has expired
      const errorMessage = `Token refresh failed with status ${response.status}`;

      // Clear all tokens when refresh token expires
      tokenService.clearTokens();
      CookieUtils.clearRefreshToken();
      errorHandler.handleAuthError(errorMessage, {
        customMessage: 'Your session has expired. Please log in again.',
        redirectToAuth: true
      });
      return false;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Token refresh network error';

      // Clear tokens on network error during refresh (could indicate expired refresh token)
      tokenService.clearTokens();

      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Unable to refresh your session. Please log in again.',
        redirectToAuth: true
      });
      return false;
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // User-specific API methods
  async getUserProfile(): Promise<ApiResponse<{
    id: string;
    name: string;
    email: string;
    created_at: string;
  }>> {
    return this.get('/api/v1/auth/me');
  }

  // Workspace-specific API methods
  async getWorkspaces(): Promise<ApiResponse<{
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  }[]>> {
    return this.get('/api/v1/workspaces/');
  }

  async createWorkspace(data: {
    name: string;
  }): Promise<ApiResponse<{
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  }>> {
    return this.post('/api/v1/workspaces/', data);
  }

  async getWorkspaceById(workspaceId: string): Promise<ApiResponse<{
    id: string;
    name: string;
    is_paid?: boolean;
    created_at: string;
    user_role?: string;
  }>> {
    return this.get(`/api/v1/workspaces/${workspaceId}`);
  }

  // GitHub integration API methods
  async getGithubInstallUrl(workspaceId: string): Promise<ApiResponse<{ install_url: string; message: string }>> {
    return this.get(`/api/v1/github/install?workspace_id=${workspaceId}`);
  }


  async handleGithubCallback(params: {
    installation_id: string;
    setup_action: string;
    workspace_id: string;
    state?: string;
  }): Promise<ApiResponse<{ message: string }>> {
    const queryParams = new URLSearchParams({
      installation_id: params.installation_id,
      setup_action: params.setup_action,
      workspace_id: params.workspace_id,
      ...(params.state && { state: params.state })
    });
    return this.get(`/api/v1/github/callback?${queryParams.toString()}`);
  }

  async getGithubStatus(workspaceId: string): Promise<ApiResponse<{
    connected: boolean;
    integration?: {
      id: string;
      github_username: string;
      installation_id: string;
      last_synced_at: string;
    };
  }>> {
    return this.get(`/api/v1/github/status?workspace_id=${workspaceId}`);
  }

  async disconnectGithub(workspaceId: string): Promise<ApiResponse<{ message: string }>> {
    return this.delete(`/api/v1/github/disconnect?workspace_id=${workspaceId}`);
  }

  // Grafana integration API methods
  async connectGrafana(data: {
    workspace_id: string;
    grafana_url: string;
    api_token: string;
  }): Promise<ApiResponse<{
    id: string;
    workspace_id: string;
    grafana_url: string;
    connected: boolean;
    created_at: string;
    updated_at: string | null;
  }>> {
    return this.post('/api/v1/grafana/connect', data);
  }

  async getGrafanaStatus(workspaceId: string): Promise<ApiResponse<{
    id: string;
    workspace_id: string;
    grafana_url: string;
    connected: boolean;
    created_at: string;
    updated_at: string | null;
  }>> {
    return this.get(`/api/v1/grafana/status/${workspaceId}`);
  }

  async disconnectGrafana(workspaceId: string): Promise<ApiResponse<{
    message: string;
    workspace_id: string;
  }>> {
    return this.delete(`/api/v1/grafana/disconnect/${workspaceId}`);
  }

  // Slack integration API methods
  async getSlackInstallUrl(workspaceId: string): Promise<ApiResponse<{ oauth_url: string }>> {
    return this.get(`/api/v1/slack/install?workspace_id=${workspaceId}`);
  }

}

export const apiService = new ApiService();