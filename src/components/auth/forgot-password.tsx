"use client";
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
              Forgot Password?
            </h2>
            <p className="text-sm mb-4 text-muted-foreground">
              No worries, we&apos;ll send you reset instructions.
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-500 bg-green-500/10 text-green-600">
              <AlertDescription>
                Password reset email sent! Check your inbox for further instructions.
              </AlertDescription>
            </Alert>
          )}

          {!success ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email" className="mb-1 block text-sm text-muted-foreground">
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
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
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
                <Button className="w-full">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
