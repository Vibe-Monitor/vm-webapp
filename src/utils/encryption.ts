/**
 * Browser-side encryption utilities using Web Crypto API
 * Provides AES-GCM encryption/decryption for sensitive data stored in sessionStorage
 */

/**
 * Derive a CryptoKey from a passphrase for AES-GCM encryption
 * Uses a static salt for consistency across sessions
 */
async function deriveKey(passphrase: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const passphraseKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  // Static salt for deterministic key derivation
  const salt = encoder.encode('vibemonitor-oauth-salt-v1');

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    passphraseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Get or create encryption key
 * In production, this should use a key from environment or secure source
 */
let cachedKey: CryptoKey | null = null;

async function getEncryptionKey(): Promise<CryptoKey> {
  if (cachedKey) {
    return cachedKey;
  }

  // Use a constant passphrase - in production, this could be from env
  const passphrase = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'vibemonitor-default-encryption-key-2024';
  cachedKey = await deriveKey(passphrase);
  return cachedKey;
}

/**
 * Convert base64url string back to Uint8Array
 */
function base64URLDecode(base64url: string): Uint8Array {
  // Convert base64url to base64
  const base64 = base64url
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  // Add padding if needed
  const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');

  // Decode base64 to binary string
  const binary = atob(padded);

  // Convert binary string to Uint8Array
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Convert Uint8Array to base64url string
 */
function base64URLEncode(buffer: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...buffer));
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Encrypt a string using AES-GCM
 * @param plaintext - The string to encrypt
 * @returns Base64URL-encoded encrypted data (IV + ciphertext)
 */
export async function encryptString(plaintext: string): Promise<string> {
  if (typeof window === 'undefined') {
    // Server-side: return plaintext (encryption only needed in browser)
    return plaintext;
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);

  // Generate random IV (12 bytes for AES-GCM)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const key = await getEncryptionKey();

  // Encrypt the data
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    data
  );

  // Concatenate IV + ciphertext
  const combined = new Uint8Array(iv.length + ciphertext.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertext), iv.length);

  // Encode as base64url
  return base64URLEncode(combined);
}

/**
 * Decrypt a string using AES-GCM
 * @param encryptedData - Base64URL-encoded encrypted data (IV + ciphertext)
 * @returns Decrypted plaintext string, or null if decryption fails
 */
export async function decryptString(encryptedData: string): Promise<string | null> {
  if (typeof window === 'undefined') {
    // Server-side: return as-is
    return encryptedData;
  }

  try {
    // Decode from base64url
    const combined = base64URLDecode(encryptedData);

    // Extract IV (first 12 bytes) and ciphertext (rest)
    const iv = combined.slice(0, 12);
    const ciphertext = combined.slice(12);

    const key = await getEncryptionKey();

    // Decrypt the data
    const decrypted = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      key,
      ciphertext
    );

    // Convert decrypted data back to string
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}
