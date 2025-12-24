import { generatePKCEPair, generateOAuthState, storePKCEVerifier, storeOAuthState, retrievePKCEVerifier, retrieveOAuthState } from '@/utils/pkce';

export interface GitHubAuthTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface GitHubUserResponse {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export class GitHubAuthClient {
  private readonly backendUrl: string;

  constructor() {
    this.backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  }

  /**
   * Initiate GitHub OAuth flow with PKCE
   * Generates PKCE pair, stores code_verifier, and fetches OAuth URL from backend
   * @param redirectUri - The frontend callback URL
   * @returns Promise that redirects to GitHub OAuth page
   */
  async initiateOAuthFlow(redirectUri: string): Promise<void> {
    // Generate PKCE pair
    const { code_verifier, code_challenge } = await generatePKCEPair();

    // Generate state parameter for CSRF protection
    const state = generateOAuthState();

    // Store code_verifier and state in session storage for callback
    storePKCEVerifier(code_verifier);
    storeOAuthState(state);

    // Build backend auth URL with PKCE parameters
    const params = new URLSearchParams({
      redirect_uri: redirectUri,
      state: state,
      code_challenge: code_challenge,
      code_challenge_method: 'S256'
    });

    // Fetch the OAuth URL from backend (returns JSON, no redirect)
    const response = await fetch(
      `${this.backendUrl}/api/v1/auth/github/login?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Failed to get OAuth URL: ${response.status}`);
    }

    const data = await response.json();

    // Manually redirect to GitHub OAuth page
    window.location.href = data.auth_url;
  }

  /**
   * Exchange authorization code for tokens with optional PKCE
   * @param code - Authorization code from GitHub
   * @param redirectUri - The same redirect_uri used in authorization request
   * @param state - State parameter to verify CSRF protection
   * @returns Token response from backend
   */
  async exchangeCodeForTokens(
    code: string,
    redirectUri: string,
    state: string | null
  ): Promise<GitHubAuthTokenResponse> {
    // Retrieve stored values (may not exist if manually testing)
    const storedVerifier = retrievePKCEVerifier();
    const storedState = retrieveOAuthState();

    // Verify state parameter (CSRF protection) - only if we have a stored state
    if (storedState && state !== storedState) {
      throw new Error('Invalid state parameter - possible CSRF attack');
    }

    // Build params - PKCE is optional
    const params = new URLSearchParams({
      code: code,
      redirect_uri: redirectUri,
    });

    // Add PKCE code_verifier if available (from frontend PKCE flow)
    if (storedVerifier) {
      params.append('code_verifier', storedVerifier);
      console.log('Using PKCE flow with code_verifier');
    } else {
      console.log('No PKCE code_verifier found - using basic OAuth flow');
    }

    const response = await fetch(
      `${this.backendUrl}/api/v1/auth/github/callback?${params.toString()}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format from server');
    }

    return await response.json();
  }

  /**
   * Get current user information
   * @param accessToken - JWT access token
   * @returns User information
   */
  async getCurrentUser(accessToken: string): Promise<GitHubUserResponse> {
    const response = await fetch(`${this.backendUrl}/api/v1/auth/github/me`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to get user info: ${response.status}`);
    }

    return await response.json();
  }
}

export const githubAuthClient = new GitHubAuthClient();
