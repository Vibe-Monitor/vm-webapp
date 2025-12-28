import { tokenService } from '../tokenService';
import { errorHandler } from '@/lib/errorHandler';
import { CookieUtils } from '@/utils/cookieUtils';

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  status: number;
}

export class BaseClient {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl || process.env.NEXT_PUBLIC_BACKEND_URL || '';
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      await this.ensureValidToken();

      const token = tokenService.getAccessToken();
      const headers = new Headers(options.headers);

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      } else {
        console.warn('[API] No access token available for request:', endpoint);
      }

      headers.set('Content-Type', 'application/json');
      headers.set('ngrok-skip-browser-warning', 'true');

      const url = `${this.baseUrl}${endpoint}`;
      console.log('[API] Request:', options.method || 'GET', url);

      const response = await fetch(url, {
        ...options,
        headers
      });

      console.log('[API] Response status:', response.status);

      // Handle empty responses (e.g., 204 No Content from DELETE)
      let data = null;
      const contentType = response.headers.get('content-type');
      const contentLength = response.headers.get('content-length');
      if (contentLength !== '0' && contentType?.includes('application/json')) {
        try {
          data = await response.json();
        } catch {
          // Response body is empty or not valid JSON
          data = null;
        }
      }

      if (response.status === 401 && token) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          headers.set('Authorization', `Bearer ${tokenService.getAccessToken()}`);
          headers.set('ngrok-skip-browser-warning', 'true');
          const retryResponse = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers
          });
          let retryData = null;
          const retryContentType = retryResponse.headers.get('content-type');
          if (retryContentType?.includes('application/json')) {
            try {
              retryData = await retryResponse.json();
            } catch {
              retryData = null;
            }
          }
          return { data: retryData, status: retryResponse.status };
        } else {
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
      console.error('[API] Request failed:', endpoint, error);
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
      const refreshed = await this.refreshToken();
      if (!refreshed) {
        errorHandler.handleAuthError('Token validation failed', {
          customMessage: 'Session expired. Redirecting to login...',
          redirectToAuth: true
        });
      }
    }
  }

  private async refreshToken(): Promise<boolean> {
    const refreshToken = tokenService.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${this.baseUrl}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({ refresh_token: refreshToken })
      });

      if (response.ok) {
        const tokenData = await response.json();

        if (tokenData.access_token && tokenData.expires_in) {
          tokenService.updateAccessToken(tokenData.access_token, tokenData.expires_in);
        }

        if (tokenData.refresh_token) {
          CookieUtils.setRefreshToken(tokenData.refresh_token);
        }

        return true;
      }

      const errorMessage = `Token refresh failed with status ${response.status}`;
      tokenService.clearTokens();
      CookieUtils.clearRefreshToken();
      errorHandler.handleAuthError(errorMessage, {
        customMessage: 'Your session has expired. Please log in again.',
        redirectToAuth: true
      });
      return false;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Token refresh network error';
      tokenService.clearTokens();
      CookieUtils.clearRefreshToken();
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

  async patch<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  /**
   * Make a public request without authentication
   * Use this for public endpoints that don't require tokens
   */
  async publicRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const headers = new Headers(options.headers);
      headers.set('Content-Type', 'application/json');
      headers.set('ngrok-skip-browser-warning', 'true');

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers
      });

      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Network error';
      errorHandler.handleNetworkError(errorMessage, {
        customMessage: 'Failed to connect to server. Please check your internet connection.'
      });
      return { error: errorMessage, status: 500 };
    }
  }

  async publicPost<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.publicRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}
