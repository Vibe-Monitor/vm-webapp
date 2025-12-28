"use client";
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
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
      if (hasVerified.current) return

      hasVerified.current = true
      setIsLoading(true)
      setError("")

      try {
        const response = await api.credentialAuth.verifyEmail({
          token: verificationToken
        })

        if (response.error || !response.data) {
          const errorDetail = response.error || 'Failed to verify email. The token may be invalid or expired.'
          setError(errorDetail)
          setSuccess(false)
          return
        }

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

    const tokenFromUrl = searchParams.get('token')
    if (tokenFromUrl) {
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
        const errorDetail = response.error || 'Failed to resend verification email. Please try again.'
        setError(errorDetail)
        return
      }

      setError("")
      alert('Verification email sent! Please check your inbox.')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 bg-background">
      <Card className="w-full max-w-[420px] shadow-xl">
        <CardContent className="space-y-4 px-8 py-10">
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
            <h2 className="text-xl font-semibold mb-2 text-foreground">
              {isLoading ? 'Verifying Email...' : success ? 'Email Verified!' : 'Email Verification'}
            </h2>
            <p className="text-sm mb-4 text-muted-foreground">
              {isLoading
                ? 'Please wait while we verify your email address...'
                : success
                  ? 'Your email has been successfully verified!'
                  : 'We\'re verifying your email address.'}
            </p>
          </div>

          {isLoading && !error && !success && (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-500 bg-green-500/10 text-green-600">
              <AlertDescription>
                Your email has been verified successfully! You can now access all features.
              </AlertDescription>
            </Alert>
          )}

          {success ? (
            <div className="text-center space-y-2">
              <Link href="/setup">
                <Button className="w-full">
                  Continue to Setup
                </Button>
              </Link>
            </div>
          ) : error && !isLoading ? (
            <div className="space-y-2">
              <Button
                onClick={handleResendVerification}
                className="w-full"
                disabled={isLoading}
              >
                Resend Verification Email
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
