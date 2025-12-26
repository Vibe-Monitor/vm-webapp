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
        // Extract detailed error message from backend
        const errorDetail = response.error || 'Failed to send reset email. Please try again.'
        setError(errorDetail)
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
            Forgot Password?
          </h2>
          <p
            className="text-sm mb-4"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            No worries, we&apos;ll send you reset instructions.
          </p>
        </div>

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
            Password reset email sent! Check your inbox for further instructions.
          </div>
        )}

        {!success ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label
                htmlFor="email"
                className="mb-1 block text-sm"
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
                style={{
                  backgroundColor: 'var(--color-background)',
                  color: 'var(--color-text-primary)'
                }}
                className="placeholder:text-gray-400"
              />
            </div>
            <Button
              type="submit"
              className="w-full text-white hover:opacity-90"
              style={{
                backgroundColor: 'var(--color-logo-blue, #0A2540)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(to bottom, #1a3a5f, #0A2540)'
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
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
                className="w-full text-white hover:opacity-90"
                style={{
                  backgroundColor: 'var(--color-logo-blue, #0A2540)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  background: 'linear-gradient(to bottom, #1a3a5f, #0A2540)'
                }}
              >
                Back to Sign In
              </Button>
            </Link>
          </div>
        )}

     
      </div>
    </div>
  )
}
