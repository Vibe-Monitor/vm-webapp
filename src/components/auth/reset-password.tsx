"use client";
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { api } from "@/services/api/apiFactory"
import { useSearchParams } from "next/navigation"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const [token, setToken] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Get token from URL query params
    const tokenFromUrl = searchParams.get('token')
    if (tokenFromUrl) {
      setToken(tokenFromUrl)
    } else {
      setError('Invalid or missing reset token')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Validate password strength
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    if (!token) {
      setError("Invalid reset token")
      return
    }

    setIsLoading(true)

    try {
      const response = await api.credentialAuth.resetPassword({
        token,
        new_password: newPassword
      })

      if (response.error || !response.data) {
        setError(response.error || 'Failed to reset password')
        return
      }

      setSuccess(true)
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
            Reset Password
          </h2>
          <p
            className="text-xs mb-3"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Enter your new password below.
          </p>
        </div>

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
            Password reset successfully! You can now sign in with your new password.
          </div>
        )}

        {!success ? (
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <Label
                htmlFor="newPassword"
                className="mb-1 block text-xs"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                New Password
              </Label>
              <Input
                type="password"
                id="newPassword"
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={isLoading || !token}
                className="h-9 text-sm"
              />
            </div>
            <div>
              <Label
                htmlFor="confirmPassword"
                className="mb-1 block text-xs"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Confirm New Password
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Re-enter your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading || !token}
                className="h-9 text-sm"
              />
            </div>
            <Button
              type="submit"
              className="w-full text-white hover:brightness-90 h-9 text-sm"
              style={{ backgroundColor: 'var(--color-text-brand)' }}
              disabled={isLoading || !token}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Resetting password...
                </div>
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <Link href="/auth">
              <Button
                className="w-full text-white hover:brightness-90 h-9 text-sm"
                style={{ backgroundColor: 'var(--color-text-brand)' }}
              >
                Sign In
              </Button>
            </Link>
          </div>
        )}

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
