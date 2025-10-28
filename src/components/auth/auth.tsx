'use client'

import GoogleSignInButton from './GoogleSignInButton'

export default function Auth() {
  const handleGoogleError = (error: string | Error) => {
    console.error('Google Sign-In error:', error)
  }

  return (
    <div
      className="px-12 py-10"
      style={{
        width: '520px',
        backgroundColor: '#121A29',
        border: '1px solid var(--color-border-light)',
        borderRadius: 'var(--radius-12)',
        boxShadow: '0 0 50px -12px rgba(0, 0, 0, 0.25)'
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1
          className="mb-3"
          style={{
            color: 'var(--color-text-primary)',
            fontSize: 'var(--text-3xl)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 'var(--font-leight)',
            lineHeight: 'var(--leading-tight)'
          }}
        >
          Join Vibemonitor.ai
        </h1>

        <p
          style={{
            color: 'var(--color-text-tertiary)',
            fontSize: 'var(--text-base)',
            lineHeight: 'var(--leading-relaxed)'
          }}
        >
          Monitor your application vibes with elegance
        </p>
      </div>

      {/* Sign In Section */}
      <div className="mb-8">
        <GoogleSignInButton
          onError={handleGoogleError}
          text="Sign up with Google"
        />

        {/* Divider */}
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <span
              className="w-full border-t"
              style={{ borderColor: 'var(--color-border-light)' }}
            />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span
              className="px-3"
              style={{
                backgroundColor: '#121A29',
                color: 'var(--color-text-tertiary)',
                fontSize: 'var(--text-xs)',
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
      <div className="text-center space-y-4">
       

        <p
          className="px-4"
          style={{
            color: 'var(--color-text-tertiary)',
            fontSize: 'var(--text-xs)',
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