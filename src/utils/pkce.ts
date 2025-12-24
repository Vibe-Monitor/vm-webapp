/**
 * PKCE (Proof Key for Code Exchange) utility functions for OAuth 2.0
 * Implements RFC 7636 standard for secure OAuth flows
 */

/**
 * Generate a cryptographically random code verifier
 * @returns Base64URL-encoded random string (43-128 characters)
 */
export function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64URLEncode(array);
}

/**
 * Generate code challenge from code verifier using SHA-256
 * @param codeVerifier - The code verifier to hash
 * @returns Base64URL-encoded SHA-256 hash of the verifier
 */
export async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return base64URLEncode(new Uint8Array(hash));
}

/**
 * Generate PKCE pair (verifier and challenge)
 * @returns Object containing code_verifier and code_challenge
 */
export async function generatePKCEPair(): Promise<{
  code_verifier: string;
  code_challenge: string;
}> {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  return {
    code_verifier: codeVerifier,
    code_challenge: codeChallenge,
  };
}

/**
 * Base64URL encode a byte array
 * @param buffer - Byte array to encode
 * @returns Base64URL-encoded string
 */
function base64URLEncode(buffer: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...buffer));
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Store PKCE code verifier in session storage
 * @param codeVerifier - The code verifier to store
 */
export function storePKCEVerifier(codeVerifier: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('pkce_code_verifier', codeVerifier);
  }
}

/**
 * Retrieve and remove PKCE code verifier from session storage
 * @returns The stored code verifier, or null if not found
 */
export function retrievePKCEVerifier(): string | null {
  if (typeof window !== 'undefined') {
    const verifier = sessionStorage.getItem('pkce_code_verifier');
    if (verifier) {
      sessionStorage.removeItem('pkce_code_verifier');
    }
    return verifier;
  }
  return null;
}

/**
 * Generate a random state parameter for OAuth flow
 * @returns Random URL-safe string
 */
export function generateOAuthState(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64URLEncode(array);
}

/**
 * Store OAuth state in session storage
 * @param state - The state parameter to store
 */
export function storeOAuthState(state: string): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('oauth_state', state);
  }
}

/**
 * Retrieve and remove OAuth state from session storage
 * @returns The stored state, or null if not found
 */
export function retrieveOAuthState(): string | null {
  if (typeof window !== 'undefined') {
    const state = sessionStorage.getItem('oauth_state');
    if (state) {
      sessionStorage.removeItem('oauth_state');
    }
    return state;
  }
  return null;
}
