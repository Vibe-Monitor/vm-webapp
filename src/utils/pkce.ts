/**
 * PKCE (Proof Key for Code Exchange) utility functions for OAuth 2.0
 * Implements RFC 7636 standard for secure OAuth flows
 */

import { encryptString, decryptString } from './encryption';

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
 * Store PKCE code verifier in session storage (encrypted)
 * @param codeVerifier - The code verifier to store
 */
export async function storePKCEVerifier(codeVerifier: string): Promise<void> {
  if (typeof window !== 'undefined') {
    const encrypted = await encryptString(codeVerifier);
    sessionStorage.setItem('pkce_code_verifier', encrypted);
  }
}

/**
 * Retrieve and remove PKCE code verifier from session storage (decrypted)
 * @returns The stored code verifier, or null if not found
 */
export async function retrievePKCEVerifier(): Promise<string | null> {
  if (typeof window !== 'undefined') {
    const encrypted = sessionStorage.getItem('pkce_code_verifier');
    if (encrypted) {
      sessionStorage.removeItem('pkce_code_verifier');
      return await decryptString(encrypted);
    }
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
 * Store OAuth state in session storage (encrypted)
 * @param state - The state parameter to store
 */
export async function storeOAuthState(state: string): Promise<void> {
  if (typeof window !== 'undefined') {
    const encrypted = await encryptString(state);
    sessionStorage.setItem('oauth_state', encrypted);
  }
}

/**
 * Retrieve and remove OAuth state from session storage (decrypted)
 * @returns The stored state, or null if not found
 */
export async function retrieveOAuthState(): Promise<string | null> {
  if (typeof window !== 'undefined') {
    const encrypted = sessionStorage.getItem('oauth_state');
    if (encrypted) {
      sessionStorage.removeItem('oauth_state');
      return await decryptString(encrypted);
    }
  }
  return null;
}
