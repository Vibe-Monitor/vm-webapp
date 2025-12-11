"use client";
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { api } from "@/services/api/apiFactory"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setIsLoading(true)

    try {
      const response = await api.credentialAuth.forgotPassword({ email })

      if (response.error || !response.data) {
        setError(response.error || 'Failed to send reset email')
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
            Forgot Password?
          </h2>
          <p
            className="text-xs mb-3"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            No worries, we&apos;ll send you reset instructions.
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
            Password reset email sent! Check your inbox for further instructions.
          </div>
        )}

        {!success ? (
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <Label
                htmlFor="email"
                className="mb-1 block text-xs"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="h-9 text-sm"
              />
            </div>
            <Button
              type="submit"
              className="w-full text-white hover:brightness-90 h-9 text-sm"
              style={{ backgroundColor: 'var(--color-text-brand)' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending...
                </div>
              ) : (
                'Send Reset Link'
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
                Back to Sign In
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
