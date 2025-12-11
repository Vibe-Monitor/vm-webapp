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
          setError(response.error || 'Failed to verify email')
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
        setError(response.error || 'Failed to resend verification email')
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
        className="w-full max-w-[380px] sm:max-w-[420px] space-y-4 rounded-lg p-5 sm:p-7 shadow-xl"
        style={{
          backgroundColor: '#121A29',
          border: '1px solid var(--color-border-light)',
          boxShadow: '0 0 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        <div className="text-center">
          <div className="mb-3 flex items-center justify-center">
            <Image
              src="/images/logo.svg"
              alt="Vibe Monitor"
              width={32}
              height={32}
              className="mr-2 w-7 h-7 sm:w-8 sm:h-8"
            />
            <h1
              className="text-lg sm:text-xl font-semibold"
              style={{
                color: 'var(--color-text-primary)',
                fontWeight: 'var(--font-semibold)'
              }}
            >
              Vibe Monitor
            </h1>
          </div>
          <h2
            className="text-base sm:text-lg font-semibold mb-1.5"
            style={{
              color: 'var(--color-text-primary)',
              fontWeight: 'var(--font-semibold)'
            }}
          >
            {isLoading ? 'Verifying Email...' : success ? 'Email Verified!' : 'Email Verification'}
          </h2>
          <p
            className="text-xs mb-3"
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
          <div className="flex items-center justify-center py-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-current border-t-transparent"
              style={{ color: 'var(--color-text-brand)' }}
            />
          </div>
        )}

        {error && (
          <div
            className="p-2.5 rounded-md text-xs"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: 'var(--color-error)',
              border: '1px solid var(--color-error)'
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className="p-2.5 rounded-md text-xs"
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              color: 'var(--color-success)',
              border: '1px solid var(--color-success)'
            }}
          >
            Your email has been verified successfully! You can now access all features.
          </div>
        )}

        {success ? (
          <div className="text-center space-y-2">
            <Link href="/setup">
              <Button
                className="w-full text-white hover:brightness-90 h-9 text-sm"
                style={{ backgroundColor: 'var(--color-text-brand)' }}
              >
                Continue to Setup
              </Button>
            </Link>
          </div>
        ) : error && !isLoading ? (
          <div className="space-y-2">
            <Button
              onClick={handleResendVerification}
              className="w-full text-white hover:brightness-90 h-9 text-sm"
              style={{ backgroundColor: 'var(--color-text-brand)' }}
              disabled={isLoading}
            >
              Resend Verification Email
            </Button>
          </div>
        ) : null}

        <div className="text-center mt-3">
          <Link
            href="/auth"
            className="text-xs flex items-center justify-center hover:opacity-80 transition-opacity"
            style={{
              color: 'var(--color-text-secondary)',
              transition: 'var(--transition-fast)'
            }}
          >
            <svg
              className="mr-1.5 h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
