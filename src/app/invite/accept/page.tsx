'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Users, CheckCircle, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/services/api/apiFactory'
import { tokenService } from '@/services/tokenService'
import type { Invitation } from '@/services/api/clients/MembersClient'

export default function AcceptInvitationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [invitation, setInvitation] = useState<Invitation | null>(null)
  const [loading, setLoading] = useState(true)
  const [accepting, setAccepting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const hasToken = tokenService.getAccessToken()
    setIsAuthenticated(!!hasToken)

    // Fetch invitation details
    if (token) {
      fetchInvitation()
    } else {
      setError('Invalid invitation link - no token provided')
      setLoading(false)
    }
  }, [token])

  const fetchInvitation = async () => {
    if (!token) return

    try {
      const response = await api.members.getInvitationByToken(token)
      if (response.data) {
        setInvitation(response.data)

        // Check if already accepted/expired
        if (response.data.status === 'accepted') {
          setError('This invitation has already been accepted')
        } else if (response.data.status === 'expired') {
          setError('This invitation has expired. Please ask for a new invitation.')
        }
      } else {
        setError(response.error || 'Invalid or expired invitation link')
      }
    } catch (err) {
      setError('Failed to load invitation details')
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = async () => {
    if (!token || !isAuthenticated) return

    setAccepting(true)
    setError(null)

    try {
      const response = await api.members.acceptInvitationByToken(token)
      if (response.data) {
        setSuccess(true)
        // Redirect to the workspace after a short delay
        setTimeout(() => {
          router.push('/chat')
        }, 2000)
      } else {
        setError(response.error || 'Failed to accept invitation')
      }
    } catch (err) {
      setError('Failed to accept invitation. Please try again.')
    } finally {
      setAccepting(false)
    }
  }

  const handleSignIn = () => {
    // Store the token in localStorage so we can redirect back after auth
    if (token) {
      localStorage.setItem('pendingInviteToken', token)
    }
    router.push('/auth')
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading invitation...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h2 className="text-xl font-semibold mb-2">Welcome to the team!</h2>
            <p className="text-muted-foreground mb-4">
              You&apos;ve joined <span className="font-medium text-foreground">{invitation?.workspace_name}</span>
            </p>
            <p className="text-sm text-muted-foreground">Redirecting to your workspace...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-secondary"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(128, 128, 128, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(128, 128, 128, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    >
      <Card className="w-full max-w-md mx-4 shadow-xl">
        <CardContent className="p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/images/VibeMonitor1.png"
              alt="VibeMonitor"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>

          {error && !invitation ? (
            // Error state - no valid invitation
            <div className="text-center">
              <XCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <h2 className="text-xl font-semibold mb-2">Invalid Invitation</h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Go to Homepage
                </Button>
              </Link>
            </div>
          ) : invitation ? (
            // Valid invitation
            <>
              <div className="text-center mb-6">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h2 className="text-xl font-semibold mb-2">You&apos;re Invited!</h2>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">{invitation.inviter_name}</span> has invited you to join
                </p>
              </div>

              {/* Workspace card */}
              <div className="bg-secondary rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-lg">{invitation.workspace_name}</h3>
                <p className="text-sm text-muted-foreground">
                  Role: <span className="capitalize">{invitation.role}</span>
                </p>
              </div>

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {invitation.status === 'pending' && (
                <>
                  {isAuthenticated ? (
                    <Button
                      onClick={handleAccept}
                      disabled={accepting}
                      className="w-full"
                    >
                      {accepting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Accepting...
                        </>
                      ) : (
                        'Accept Invitation'
                      )}
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm text-center text-muted-foreground">
                        Sign in to accept this invitation
                      </p>
                      <Button onClick={handleSignIn} className="w-full">
                        Sign In to Accept
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        Don&apos;t have an account?{' '}
                        <Link href="/auth" className="text-primary underline">
                          Sign up
                        </Link>
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
