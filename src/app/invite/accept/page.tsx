'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/services/api/apiFactory'
import { tokenService } from '@/services/tokenService'

export default function AcceptInvitationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [status, setStatus] = useState<'loading' | 'error' | 'redirecting'>('loading')
  const [message, setMessage] = useState('Processing invitation...')
  const [errorDetail, setErrorDetail] = useState<string | null>(null)

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setErrorDetail('Invalid invitation link - no token provided')
      return
    }

    processInvitation()
  }, [token])

  const processInvitation = async () => {
    if (!token) return

    const isAuthenticated = !!tokenService.getAccessToken()

    if (!isAuthenticated) {
      // Not signed in - redirect to auth with return URL
      setMessage('Redirecting to sign in...')
      setStatus('redirecting')

      // Store the full invite URL to return to after auth
      const returnUrl = `/invite/accept?token=${token}`
      localStorage.setItem('authReturnUrl', returnUrl)

      // Small delay so user sees the message
      setTimeout(() => {
        router.push('/auth')
      }, 500)
      return
    }

    // User is authenticated - try to accept
    setMessage('Accepting invitation...')

    try {
      const response = await api.members.acceptInvitationByToken(token)

      if (response.data) {
        // Success! Set the newly joined workspace as the last visited
        localStorage.setItem('last_visited_workspace_id', response.data.id)
        // Redirect to workspace
        setMessage('Welcome! Redirecting to workspace...')
        setStatus('redirecting')
        setTimeout(() => {
          router.push('/chat')
        }, 1000)
      } else {
        // Handle specific errors
        const error = response.error || 'Failed to accept invitation'

        if (error.includes('different email')) {
          setErrorDetail('This invitation was sent to a different email address. Please sign in with the correct account.')
        } else if (error.includes('expired')) {
          setErrorDetail('This invitation has expired. Please ask for a new invitation.')
        } else if (error.includes('already been')) {
          setErrorDetail('This invitation has already been used.')
        } else {
          setErrorDetail(error)
        }
        setStatus('error')
      }
    } catch (err) {
      setErrorDetail('Failed to accept invitation. Please try again.')
      setStatus('error')
    }
  }

  // Loading/Processing state
  if (status === 'loading' || status === 'redirecting') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/images/VibeMonitor1.png"
                alt="VibeMonitor"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">{message}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Error state
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
          <div className="flex justify-center mb-6">
            <Image
              src="/images/VibeMonitor1.png"
              alt="VibeMonitor"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>

          <div className="text-center">
            <XCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-semibold mb-2">Unable to Accept Invitation</h2>
            <p className="text-muted-foreground mb-6">{errorDetail}</p>

            <div className="space-y-3">
              {errorDetail?.includes('different email') && (
                <Button
                  onClick={() => {
                    tokenService.clearTokens()
                    localStorage.setItem('authReturnUrl', `/invite/accept?token=${token}`)
                    router.push('/auth')
                  }}
                  className="w-full"
                >
                  Sign in with Different Account
                </Button>
              )}
              <Link href="/chat" className="block">
                <Button variant="outline" className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
