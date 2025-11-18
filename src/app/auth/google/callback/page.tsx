'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import posthog from 'posthog-js'
import { tokenService } from '@/services/tokenService'
import Loader from '@/components/ui/loader'

export default function GoogleCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState('Processing Google authentication...')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        const error = urlParams.get('error')

        posthog.capture('google_oauth_callback_received', {
          has_code: !!code,
          has_error: !!error,
          error_value: error
        })

        if (error) {
          setStatus('Authentication failed')
          console.error('OAuth error:', error)

          posthog.capture('google_oauth_failed', {
            error: error,
            stage: 'callback'
          })

          router.replace('/auth?error=' + encodeURIComponent(error))
          return
        }

        if (!code) {
          setStatus('No authorization code received')

          posthog.capture('google_oauth_failed', {
            error: 'no_code',
            stage: 'callback'
          })

          router.replace('/auth?error=no_code')
          return
        }

        setStatus('Exchanging code for tokens...')

        const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || window.location.origin
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

        const callbackParams = new URLSearchParams({
          code: code,
          redirect_uri: `${frontendUrl}/auth/google/callback`
        })

        console.log('Callback - Frontend URL:', frontendUrl)
        console.log('Callback - Backend URL:', backendUrl)
        console.log('Callback - redirect_uri:', `${frontendUrl}/auth/google/callback`)

        const response = await fetch(`${backendUrl}/api/v1/auth/callback?${callbackParams.toString()}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (data.access_token && data.refresh_token) {
          tokenService.setTokens({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_in: data.expires_in
          })

          const userResponse = await fetch(`${backendUrl}/api/v1/auth/me`, {
            headers: {
              'Authorization': `Bearer ${data.access_token}`
            }
          })

          if (userResponse.ok) {
            const userData = await userResponse.json()

            posthog.identify(userData.id, {
              email: userData.email,
              name: userData.name,
              created_at: userData.created_at
            })

            posthog.setPersonProperties({
              email: userData.email,
              name: userData.name,
              auth_method: 'google',
              user_type: 'authenticated'
            })
          }

          posthog.capture('user_authenticated_successfully', {
            auth_method: 'google_oauth',
            has_refresh_token: true
          })

          posthog.capture('funnel_stage', {
            stage: 'onboarding_started',
            stage_number: 1,
            description: 'User redirected to setup page after authentication'
          })
        }

        setStatus('Authentication successful! Redirecting...')
        router.replace('/setup')

      } catch (error) {
        console.error('Callback error:', error)
        setStatus('Authentication failed')

        posthog.capture('google_oauth_callback_failed', {
          error: error instanceof Error ? error.message : 'unknown_error',
          stage: 'token_exchange'
        })

        router.replace('/auth?error=callback_failed')
      }
    }

    handleCallback()
  }, [router])

  return <Loader message={status} />
}