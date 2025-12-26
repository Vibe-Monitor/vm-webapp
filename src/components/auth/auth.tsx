'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import Link from "next/link"
import GoogleSignInButton from './GoogleSignInButton'
import GitHubSignInButton from './GitHubSignInButton'
import { api } from "@/services/api/apiFactory"
import { tokenService } from "@/services/tokenService"

type AuthMode = 'signin' | 'signup'

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [signupSuccess, setSignupSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setError("Passwords do not match")
        return
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters long and contain: one lowercase letter, one uppercase letter, and one digit")
        return
      }
    }

    setIsLoading(true)

    try {
      const response = mode === 'signin'
        ? await api.credentialAuth.login({ email, password })
        : await api.credentialAuth.signup({ email, password, name })

      if (response.error || !response.data) {
        // Extract detailed error message from backend
        const errorDetail = response.error || `${mode === 'signin' ? 'Login' : 'Signup'} failed`
        setError(errorDetail)
        return
      }

      // Store tokens securely using tokenService (same as Google auth)
      if (response.data.access_token && response.data.refresh_token) {
        tokenService.setTokens({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          expires_in: response.data.expires_in
        })
      }

      // Store user email for verification resend functionality
      if (response.data.user?.email) {
        localStorage.setItem('user_email', response.data.user.email)
      }

      // For signup, show success message instead of redirecting
      if (mode === 'signup') {
        setSignupSuccess(true)
        return
      }

      // For signin, redirect based on verification status
      if (response.data.is_verified) {
        window.location.href = '/setup'
      } else {
        setError('Please verify your email before signing in. Check your inbox for the verification link.')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    setError("")
    setSignupSuccess(false)
    setName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
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
      <div className="flex justify-center mb-6">
        <Image
          src="/images/VibeMonitor1.png"
          alt="VibeMonitor"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Mode Toggle */}
      <div className="text-center mb-6">
        <div
          className="flex rounded-lg p-1 mb-4 mx-auto max-w-xs"
          style={{
            backgroundColor: 'var(--color-surface-secondary, #F9FAFB)',
            border: '1px solid var(--color-border)'
          }}
        >
          <button
            type="button"
            onClick={() => mode !== 'signin' && switchMode()}
            className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all"
            style={{
              backgroundColor: mode === 'signin' ? 'var(--color-logo-blue, #0A2540)' : 'transparent',
              color: mode === 'signin' ? 'white' : 'var(--color-text-secondary)',
              background: mode === 'signin' ? 'linear-gradient(to bottom, #1a3a5f, #0A2540)' : 'transparent'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => mode !== 'signup' && switchMode()}
            className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all"
            style={{
              backgroundColor: mode === 'signup' ? 'var(--color-logo-blue, #0A2540)' : 'transparent',
              color: mode === 'signup' ? 'white' : 'var(--color-text-secondary)',
              background: mode === 'signup' ? 'linear-gradient(to bottom, #1a3a5f, #0A2540)' : 'transparent'
            }}
          >
            Sign Up
          </button>
        </div>

        <p
          className="text-sm"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {mode === 'signin'
            ? 'Welcome back! Sign in to your account.'
            : 'Create your account to get started with VibeMonitor.'}
        </p>
      </div>

      {error && (
        <div
          className="p-3 rounded-md text-sm mb-4"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            border: '1px solid #ef4444'
          }}
        >
          {error}
        </div>
      )}

      {signupSuccess && (
        <div
          className="p-3 rounded-md text-sm mb-4"
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            color: '#10b981',
            border: '1px solid #10b981'
          }}
        >
          Account created successfully! Please check your email inbox for a verification link to activate your account.
        </div>
      )}

      <form className="space-y-4 mb-6" onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <div>
            <Label htmlFor="name" className="mb-1 block text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Full Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="name"
              style={{
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text-primary)'
              }}
            />
          </div>
        )}

        <div>
          <Label htmlFor="email" className="mb-1 block text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            autoComplete="email"
            style={{
              backgroundColor: 'var(--color-background)',
              color: 'var(--color-text-primary)'
            }}
          />
        </div>

        <div>
          <Label htmlFor="password" className="mb-1 block text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Password
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder={mode === 'signup' ? "At least 8 characters" : "Enter your password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            autoComplete={mode === 'signup' ? "new-password" : "current-password"}
            style={{
              backgroundColor: 'var(--color-background)',
              color: 'var(--color-text-primary)'
            }}
          />
        </div>

        {mode === 'signup' && (
          <div>
            <Label htmlFor="confirmPassword" className="mb-1 block text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Confirm Password
            </Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="new-password"
              style={{
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-text-primary)'
              }}
            />
          </div>
        )}

        {mode === 'signin' && (
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-not-allowed opacity-50">
              <Checkbox
                checked={false}
                disabled={true}
              />
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Remember me
              </span>
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm underline hover:opacity-80 transition-opacity"
              style={{ color: 'var(--color-text-brand)' }}
            >
              Forgot password?
            </Link>
          </div>
        )}

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
              {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
            </div>
          ) : (
            mode === 'signin' ? 'Sign In' : 'Create Account'
          )}
        </Button>
      </form>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" style={{ borderColor: 'var(--color-border)' }} />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span
            className="px-2"
            style={{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-tertiary)'
            }}
          >
            or Continue with
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <GoogleSignInButton text={mode === 'signin' ? "Sign in with Google" : "Sign up with Google"} />
        <GitHubSignInButton text={mode === 'signin' ? "Sign in with GitHub" : "Sign up with GitHub"} />
      </div>

      <p
        className="text-center text-xs mt-6"
        style={{ color: 'var(--color-text-tertiary)' }}
      >
        By continuing, you agree to our{' '}
        <Link
          href="/terms"
          className="underline hover:opacity-80 transition-opacity"
          style={{ color: 'var(--color-text-brand)' }}
        >
          Terms of Service
        </Link>
        {' '}and{' '}
        <Link
          href="/privacy"
          className="underline hover:opacity-80 transition-opacity"
          style={{ color: 'var(--color-text-brand)' }}
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  )
}