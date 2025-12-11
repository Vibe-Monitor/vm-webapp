'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import Link from "next/link"
import GoogleSignInButton from './GoogleSignInButton'
import { api } from "@/services/api/apiFactory"
import { tokenService } from "@/services/tokenService"

type AuthMode = 'signin' | 'signup'

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
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
        setError("Password must be at least 8 characters long")
        return
      }
    }

    setIsLoading(true)

    try {
      const response = mode === 'signin'
        ? await api.credentialAuth.login({ email, password })
        : await api.credentialAuth.signup({ email, password, name })

      if (response.error || !response.data) {
        setError(response.error || `${mode === 'signin' ? 'Login' : 'Signup'} failed`)
        return
      }

      // Store tokens securely using tokenService (same as Google auth)
      tokenService.setTokens({
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        expires_in: response.data.expires_in
      })

      // Store user email for verification resend functionality
      localStorage.setItem('user_email', response.data.user.email)

      if (rememberMe && mode === 'signin') {
        localStorage.setItem('remember_me', 'true')
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
    setRememberMe(false)
  }

  return (
    <div
      className="w-full max-w-[380px] sm:max-w-[420px] px-5 py-6 sm:px-8 sm:py-7 mx-4"
      style={{
        backgroundColor: '#121A29',
        border: '1px solid var(--color-border-light)',
        borderRadius: 'var(--radius-12)',
        boxShadow: '0 0 50px -12px rgba(0, 0, 0, 0.25)'
      }}
    >
      <div className="text-center mb-4 sm:mb-5">
        <div className="mb-3 flex items-center justify-center">
          <Image
            src="/images/logo.svg"
            alt="Vibe Monitor"
            width={32}
            height={32}
            className="mr-2 w-7 h-7 sm:w-8 sm:h-8"
          />
          <h1
            className="text-lg sm:text-xl"
            style={{
              color: 'var(--color-text-primary)',
              fontWeight: 'var(--font-semibold)',
              lineHeight: 'var(--leading-tight)'
            }}
          >
            Vibe Monitor
          </h1>
        </div>

        <div
          className="flex rounded-lg p-0.5 mb-4"
          style={{
            backgroundColor: 'var(--color-background)',
            border: '1px solid var(--color-border)'
          }}
        >
          <button
            type="button"
            onClick={() => mode !== 'signin' && switchMode()}
            className="flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all"
            style={{
              backgroundColor: mode === 'signin' ? 'var(--color-text-brand)' : 'transparent',
              color: mode === 'signin' ? 'white' : 'var(--color-text-secondary)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => mode !== 'signup' && switchMode()}
            className="flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-all"
            style={{
              backgroundColor: mode === 'signup' ? 'var(--color-text-brand)' : 'transparent',
              color: mode === 'signup' ? 'white' : 'var(--color-text-secondary)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            Sign Up
          </button>
        </div>

        <p
          className="text-xs sm:text-sm"
          style={{
            color: 'var(--color-text-tertiary)',
            lineHeight: 'var(--leading-relaxed)'
          }}
        >
          {mode === 'signin'
            ? 'Welcome back! Sign in to your account.'
            : 'Start free in 30 seconds. No credit card required.'}
        </p>
      </div>

      {error && (
        <div
          className="p-2.5 rounded-md text-xs mb-3"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: 'var(--color-error)',
            border: '1px solid var(--color-error)'
          }}
        >
          {error}
        </div>
      )}

      {signupSuccess && (
        <div
          className="p-2.5 rounded-md text-xs mb-3"
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            color: 'var(--color-success)',
            border: '1px solid var(--color-success)'
          }}
        >
          Account created successfully! Please check your email inbox for a verification link to activate your account.
        </div>
      )}

      <form className="space-y-3 mb-4" onSubmit={handleSubmit}>
        {mode === 'signup' && (
          <div>
            <Label htmlFor="name" className="mb-1 block text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              Full Name
            </Label>
            <Input
              type="text"
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
              className="h-9 text-sm"
            />
          </div>
        )}

        <div>
          <Label htmlFor="email" className="mb-1 block text-xs" style={{ color: 'var(--color-text-secondary)' }}>
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

        <div>
          <Label htmlFor="password" className="mb-1 block text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            Password
          </Label>
          <Input
            type="password"
            id="password"
            placeholder={mode === 'signup' ? "At least 8 characters" : "Enter your password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="h-9 text-sm"
          />
        </div>

        {mode === 'signup' && (
          <div>
            <Label htmlFor="confirmPassword" className="mb-1 block text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              Confirm Password
            </Label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
              className="h-9 text-sm"
            />
          </div>
        )}

        {mode === 'signin' && (
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-1.5 cursor-pointer">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                disabled={isLoading}
              />
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                Remember me
              </span>
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-xs underline hover:opacity-80 transition-opacity"
              style={{ color: 'var(--color-text-brand)', transition: 'var(--transition-fast)' }}
            >
              Forgot password?
            </Link>
          </div>
        )}

        <Button
          type="submit"
          className="w-full text-white hover:brightness-90 h-9 text-sm"
          style={{ backgroundColor: 'var(--color-text-brand)' }}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="mr-2 h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
            </div>
          ) : (
            mode === 'signin' ? 'Sign In' : 'Create Account'
          )}
        </Button>
      </form>

      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" style={{ borderColor: 'var(--color-border-light)' }} />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span
            className="px-2 text-[10px]"
            style={{
              backgroundColor: '#121A29',
              color: 'var(--color-text-tertiary)',
              fontWeight: 'var(--font-medium)',
              letterSpacing: '0.05em'
            }}
          >
            or Continue with
          </span>
        </div>
      </div>

      <GoogleSignInButton text={mode === 'signin' ? "Sign in with Google" : "Sign up with Google"} />

      <div className="text-center mt-4">
        <p
          className="text-[10px] leading-relaxed"
          style={{
            color: 'var(--color-text-tertiary)',
            lineHeight: '1.5'
          }}
        >
          By continuing, you agree to our{' '}
          <Link
            href="/terms"
            className="underline hover:opacity-80 transition-opacity"
            style={{
              color: 'var(--color-text-brand)',
              transition: 'var(--transition-fast)'
            }}
          >
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link
            href="/privacy"
            className="underline hover:opacity-80 transition-opacity"
            style={{
              color: 'var(--color-text-brand)',
              transition: 'var(--transition-fast)'
            }}
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}