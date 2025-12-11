export class GoogleAuthClient {
  constructor() {}

  /**
   * Get Google OAuth login URL
   * @param redirectUri - The frontend callback URL
   * @returns The backend OAuth URL to redirect to
   */
  getLoginUrl(redirectUri: string): string {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    const params = new URLSearchParams({
      redirect_uri: redirectUri,
      code_challenge_method: 'S256'
    });

    return `${backendUrl}/api/v1/auth/login?${params.toString()}`;
  }
}
