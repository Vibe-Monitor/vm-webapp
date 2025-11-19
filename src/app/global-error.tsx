'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to console and error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en">
      <head>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}</style>
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: 'inter, system-ui, sans-serif' }}>
        <section
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            background: 'linear-gradient(180deg, #0C1829 0%, #1a1f35 100%)',
            minHeight: '100vh',
          }}
        >
          {/* Animated Grid Background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(98, 102, 250, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(98, 102, 250, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              backgroundPosition: 'center center',
              opacity: 0.4
            }}
          />

          {/* Red Glow for Error */}
          <div
            className="animate-pulse"
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              width: '800px',
              height: '800px',
              left: '-20%',
              top: '10%',
              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />

          {/* Purple Glow */}
          <div
            className="animate-pulse"
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              width: '700px',
              height: '700px',
              right: '-15%',
              bottom: '10%',
              background: 'radial-gradient(circle, rgba(163, 139, 244, 0.2) 0%, transparent 70%)',
              filter: 'blur(100px)',
              animationDelay: '1s'
            }}
          />

          {/* Content Container */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8rem 2rem',
              maxWidth: '42rem',
              margin: '0 auto',
            }}
          >
            {/* Error Badge */}
            <div
              style={{
                marginBottom: '2rem',
                padding: '0.5rem 1.5rem',
                borderRadius: '9999px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>⚠️</span>
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#fca5a5',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                System Error
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: 'clamp(2rem, 6vw, 3rem)',
                fontWeight: 700,
                marginBottom: '1rem',
                textAlign: 'center',
                color: '#F9FAFB',
                letterSpacing: '-0.02em',
              }}
            >
              Something Went Wrong
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: 'clamp(1rem, 3vw, 1.125rem)',
                marginBottom: '3rem',
                textAlign: 'center',
                maxWidth: '32rem',
                color: '#cbd5e1',
                lineHeight: '1.7'
              }}
            >
              We apologize for the inconvenience. Our team has been notified and is working to resolve the issue.
            </p>

            {/* Buttons */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1rem',
                width: '100%',
                maxWidth: '400px',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={() => reset()}
                style={{
                  flex: 1,
                  minWidth: '160px',
                  padding: '0.875rem 2rem',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  transition: 'all 0.2s',
                  background: 'linear-gradient(135deg, #6266fa 0%, #a38bf4 100%)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(98, 102, 250, 0.4)',
                  textAlign: 'center',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 25px rgba(98, 102, 250, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(98, 102, 250, 0.4)';
                }}
              >
                Reload Page
              </button>
              <Link
                href="/"
                style={{
                  flex: 1,
                  minWidth: '160px',
                  padding: '0.875rem 2rem',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  fontSize: '0.9375rem',
                  transition: 'all 0.2s',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#E5E7EB',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Go to Home
              </Link>
            </div>

            {/* Help Text */}
            <p
              style={{
                marginTop: '2.5rem',
                fontSize: '0.875rem',
                color: '#64748b',
                textAlign: 'center',
              }}
            >
              If this problem persists, please contact our support team.
            </p>
          </div>
        </section>
      </body>
    </html>
  )
}
