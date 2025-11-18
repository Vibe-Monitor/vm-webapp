'use client'

import { useEffect } from 'react'
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
      className="w-full max-w-[520px] px-6 py-8 sm:px-12 sm:py-10 mx-4"
      style={{
        backgroundColor: '#121A29',
        border: '1px solid var(--color-border-light)',
        borderRadius: 'var(--radius-12)',
        boxShadow: '0 0 50px -12px rgba(0, 0, 0, 0.25)'
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-6 sm:mb-8">
        <h1
          className="mb-2 sm:mb-3 text-2xl sm:text-3xl"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 'var(--font-leight)',
            lineHeight: 'var(--leading-tight)'
          }}
        >
          Join Vibemonitor.ai
        </h1>

        <p
          className="text-sm sm:text-base px-2 sm:px-0"
          style={{
            color: 'var(--color-text-tertiary)',
            lineHeight: 'var(--leading-relaxed)'
          }}
        >
          Monitor your application vibes with elegance
        </p>
      </div>

      {/* Sign In Section */}
      <div className="mb-6 sm:mb-8">
        <GoogleSignInButton
          onError={handleGoogleError}
          text="Sign up with Google"
        />

        {/* Divider */}
        <div className="relative mt-5 sm:mt-6">
          <div className="absolute inset-0 flex items-center">
            <span
              className="w-full border-t"
              style={{ borderColor: 'var(--color-border-light)' }}
            />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span
              className="px-2 sm:px-3 text-[10px] sm:text-xs"
              style={{
                backgroundColor: '#121A29',
                color: 'var(--color-text-tertiary)',
                fontWeight: 'var(--font-medium)',
                letterSpacing: '0.05em'
              }}
            >
              Secure Authentication
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center space-y-3 sm:space-y-4">


        <p
          className="px-2 sm:px-4 text-[11px] sm:text-xs leading-relaxed"
          style={{
            color: 'var(--color-text-tertiary)',
            lineHeight: '1.6'
          }}
        >
          By continuing, you agree to our{' '}
          <a
            href="#"
            className="underline hover:opacity-80 transition-opacity"
            style={{
              color: 'var(--color-text-brand)',
              transition: 'var(--transition-fast)'
            }}
          >
            Terms of Service
          </a>
          {' '}and{' '}
          <a
            href="#"
            className="underline hover:opacity-80 transition-opacity"
            style={{
              color: 'var(--color-text-brand)',
              transition: 'var(--transition-fast)'
            }}
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}