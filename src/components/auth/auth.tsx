'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import posthog from 'posthog-js'
import GoogleSignInButton from './GoogleSignInButton'

export default function Auth() {
  useEffect(() => {
    posthog.capture('auth_page_viewed', {
      page_type: 'signup_or_login'
    })
  }, [])

  const handleGoogleError = (error: string | Error) => {
    console.error('Google Sign-In error:', error)

    posthog.capture('google_oauth_error', {
      error_message: error instanceof Error ? error.message : String(error),
      source: 'auth_page'
    })
  }

  return (
    <div
      className="w-full max-w-[420px] px-8 py-10 mx-4"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '20px',
        boxShadow: '0 4px 40px rgba(0, 0, 0, 0.08)'
      }}
    >
      {/* Logo */}
      <div className="flex justify-center">
        <Image
          src="/images/VibeMonitor1.png"
          alt="VibeMonitor"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1
          className="text-2xl font-semibold mb-2"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Welcome to VibeMonitor
        </h1>
        <p
          className="text-sm"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          Sign in to continue to VibeMonitor
        </p>
      </div>

      {/* Sign In Button */}
      <div className="mb-8">
        <GoogleSignInButton
          onError={handleGoogleError}
          text="Continue with Google"
        />
      </div>

      {/* Footer */}
      <p
        className="text-center text-xs"
        style={{ color: 'var(--color-text-tertiary)' }}
      >
        By continuing, you agree to our{' '}
        <a
          href="/terms"
          className="underline"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Terms
        </a>
        {' '}and{' '}
        <a
          href="/privacy"
          className="underline"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Privacy Policy
        </a>
      </p>
    </div>
  )
}