'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff'
        }}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{
              marginBottom: '1.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              display: 'inline-block'
            }}>
              <span style={{ color: '#dc2626', fontWeight: 600, fontSize: '0.875rem' }}>
                System Error
              </span>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem', color: '#171717' }}>
              Something Went Wrong
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              We apologize for the inconvenience.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => reset()}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: 500,
                  backgroundColor: '#171717',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Try Again
              </button>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Global error cannot use Link as Next.js router may have failed */}
              <a
                href="/"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: 500,
                  backgroundColor: '#fff',
                  color: '#171717',
                  border: '1px solid #e5e7eb',
                  textDecoration: 'none'
                }}
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
