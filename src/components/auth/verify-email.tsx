"use client";
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { api } from "@/services/api/apiFactory"
import { useSearchParams } from "next/navigation"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const hasVerified = useRef(false)

  useEffect(() => {
    const verifyToken = async (verificationToken: string) => {
      if (hasVerified.current) return // Prevent duplicate calls

      hasVerified.current = true
      setIsLoading(true)
      setError("") // Clear any existing errors

      try {
        const response = await api.credentialAuth.verifyEmail({
          token: verificationToken
        })

        if (response.error || !response.data) {
          // Extract detailed error message from backend
          const errorDetail = response.error || 'Failed to verify email. The token may be invalid or expired.'
          setError(errorDetail)
          setSuccess(false)
          return
        }

        // Clear error and set success
        setError("")
        setSuccess(true)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
        setError(errorMessage)
        setSuccess(false)
      } finally {
        setIsLoading(false)
      }
    }

    // Get token from URL query params
    const tokenFromUrl = searchParams.get('token')
    if (tokenFromUrl) {
      // Automatically verify if token is present
      verifyToken(tokenFromUrl)
    } else {
      setError('Invalid or missing verification token')
    }
  }, [searchParams])

  const handleResendVerification = async () => {
    const userEmail = localStorage.getItem('user_email')
    if (!userEmail) {
      setError('No email found. Please sign up again.')
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await api.credentialAuth.resendVerification({
        email: userEmail
      })

      if (response.error || !response.data) {
        // Extract detailed error message from backend
        const errorDetail = response.error || 'Failed to resend verification email. Please try again.'
        setError(errorDetail)
        return
      }

      setError("") // Clear any existing errors
      alert('Verification email sent! Please check your inbox.')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div
        className="w-full max-w-[420px] space-y-4 rounded-lg px-8 py-10 shadow-xl"
        style={{
          backgroundColor: 'var(--color-surface)',
          boxShadow: '0 4px 40px rgba(0, 0, 0, 0.08)'
        }}
      >
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center">
            <Image
              src="/images/VibeMonitor1.png"
              alt="VibeMonitor"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <h2
            className="text-xl font-semibold mb-2"
            style={{
              color: 'var(--color-text-primary)'
            }}
          >
            {isLoading ? 'Verifying Email...' : success ? 'Email Verified!' : 'Email Verification'}
          </h2>
          <p
            className="text-sm mb-4"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {isLoading
              ? 'Please wait while we verify your email address...'
              : success
                ? 'Your email has been successfully verified!'
                : 'We\'re verifying your email address.'}
          </p>
        </div>

        {isLoading && !error && !success && (
          <div className="flex items-center justify-center py-6">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-current border-t-transparent"
              style={{ color: 'var(--color-text-brand)' }}
            />
          </div>
        )}

        {error && (
          <div
            className="p-3 rounded-md text-sm"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              border: '1px solid #ef4444'
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="p-3 rounded-md text-sm"
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981',
              border: '1px solid #10b981'
            }}
          >
            Your email has been verified successfully! You can now access all features.
          </div>
        )}

        {success ? (
          <div className="text-center space-y-2">
            <Link href="/setup">
              <Button
                className="w-full text-white hover:opacity-90"
                style={{
                  backgroundColor: 'var(--color-logo-blue, #0A2540)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  background: 'linear-gradient(to bottom, #1a3a5f, #0A2540)'
                }}
              >
                Continue to Setup
              </Button>
            </Link>
          </div>
        ) : error && !isLoading ? (
          <div className="space-y-2">
            <Button
              onClick={handleResendVerification}
              className="w-full text-white hover:opacity-90"
              style={{
                backgroundColor: 'var(--color-logo-blue, #0A2540)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(to bottom, #1a3a5f, #0A2540)'
              }}
              disabled={isLoading}
            >
              Resend Verification Email
            </Button>
          </div>
        ) : null}

 
      </div>
    </div>
  )
}
