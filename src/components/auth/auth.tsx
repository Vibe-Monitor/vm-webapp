'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
        const errorDetail = response.error || `${mode === 'signin' ? 'Login' : 'Signup'} failed`
        setError(errorDetail)
        return
      }

      if (response.data.access_token && response.data.refresh_token) {
        tokenService.setTokens({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          expires_in: response.data.expires_in
        })
      }

      if (response.data.user?.email) {
        localStorage.setItem('user_email', response.data.user.email)
      }

      if (mode === 'signup') {
        setSignupSuccess(true)
        return
      }

      if (response.data.is_verified) {
        window.location.href = '/chat'
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
    <Card className="w-full max-w-[420px] mx-4 shadow-xl">
      <CardContent className="px-8 py-10">
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
          <div className="flex rounded-lg p-1 mb-4 mx-auto max-w-xs bg-secondary border border-border">
            <button
              type="button"
              onClick={() => mode !== 'signin' && switchMode()}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                mode === 'signin'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-muted-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => mode !== 'signup' && switchMode()}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                mode === 'signup'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-muted-foreground'
              }`}
            >
              Sign Up
            </button>
          </div>

          <p className="text-sm text-muted-foreground">
            {mode === 'signin'
              ? 'Welcome back! Sign in to your account.'
              : 'Create your account to get started with VibeMonitor.'}
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {signupSuccess && (
          <Alert className="mb-4 border-green-500 bg-green-500/10 text-green-600">
            <AlertDescription>
              Account created successfully! Please check your email inbox for a verification link to activate your account.
            </AlertDescription>
          </Alert>
        )}

        <form className="space-y-4 mb-6" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div>
              <Label htmlFor="name" className="mb-1 block text-sm text-muted-foreground">
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
              />
            </div>
          )}

          <div>
            <Label htmlFor="email" className="mb-1 block text-sm text-muted-foreground">
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
            />
          </div>

          <div>
            <Label htmlFor="password" className="mb-1 block text-sm text-muted-foreground">
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
            />
          </div>

          {mode === 'signup' && (
            <div>
              <Label htmlFor="confirmPassword" className="mb-1 block text-sm text-muted-foreground">
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
                <span className="text-sm text-muted-foreground">
                  Remember me
                </span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-primary underline hover:opacity-80 transition-opacity"
              >
                Forgot password?
              </Link>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
              </div>
            ) : (
              mode === 'signin' ? 'Sign In' : 'Create Account'
            )}
          </Button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              or Continue with
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <GoogleSignInButton text={mode === 'signin' ? "Sign in with Google" : "Sign up with Google"} />
          <GitHubSignInButton text={mode === 'signin' ? "Sign in with GitHub" : "Sign up with GitHub"} />
        </div>

        <p className="text-center text-xs mt-6 text-muted-foreground">
          By continuing, you agree to our{' '}
          <Link
            href="/terms"
            className="text-primary underline hover:opacity-80 transition-opacity"
          >
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link
            href="/privacy"
            className="text-primary underline hover:opacity-80 transition-opacity"
          >
            Privacy Policy
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
