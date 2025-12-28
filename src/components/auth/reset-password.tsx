"use client";
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
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

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long and contain: one lowercase letter, one uppercase letter, and one digit")
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
        const errorDetail = response.error || 'Failed to reset password. Please try again.'
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
              Reset Password
            </h2>
            <p className="text-sm mb-4 text-muted-foreground">
              Enter your new password below.
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
                Password reset successfully! You can now sign in with your new password.
              </AlertDescription>
            </Alert>
          )}

          {!success ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="newPassword" className="mb-1 block text-sm text-muted-foreground">
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
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="mb-1 block text-sm text-muted-foreground">
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
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !token}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
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
                <Button className="w-full">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
