'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import posthog from 'posthog-js'
import { tokenService } from '@/services/tokenService'
import Loader from '@/components/ui/loader'
import { googleAuthClient } from '@/services/api/auth/GoogleAuthClient'

export default function GoogleCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState('Processing Google authentication...')
  const hasProcessed = useRef(false)

  useEffect(() => {
    const handleCallback = async () => {
      // Prevent double execution (React Strict Mode runs useEffect twice)
      if (hasProcessed.current) {
        return
      }
      hasProcessed.current = true

      try {
        // If already authenticated, redirect to setup
        if (tokenService.hasValidToken()) {
          setStatus('Already authenticated! Redirecting...')
          router.replace('/chat')
          return
        }

        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        const state = urlParams.get('state')
        const error = urlParams.get('error')

        posthog.capture('google_oauth_callback_received', {
          has_code: !!code,
          has_state: !!state,
          has_error: !!error,
          error_value: error,
          uses_pkce: true
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

          // If no code and not authenticated, go to auth page
          router.replace('/auth')
          return
        }

        setStatus('Exchanging code for tokens with PKCE...')

        const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || window.location.origin
        const redirectUri = `${frontendUrl}/auth/google/callback`

        console.log('Callback - Frontend URL:', frontendUrl)
        console.log('Callback - redirect_uri:', redirectUri)
        console.log('Callback - Using PKCE flow')

        // Exchange code for tokens using PKCE
        // This retrieves code_verifier from session storage and sends it to backend
        const data = await googleAuthClient.exchangeCodeForTokens(code, redirectUri, state)

        if (data.access_token && data.refresh_token) {
          tokenService.setTokens({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_in: data.expires_in
          })

          // Store last visited workspace if provided
          if (data.last_visited_workspace_id) {
            localStorage.setItem('last_visited_workspace_id', data.last_visited_workspace_id)
          }

          // Get user information
          const userData = await googleAuthClient.getCurrentUser(data.access_token)

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

          posthog.capture('user_authenticated_successfully', {
            auth_method: 'google_oauth',
            has_refresh_token: true,
            uses_pkce: true
          })

          posthog.capture('funnel_stage', {
            stage: 'onboarding_started',
            stage_number: 1,
            description: 'User redirected to setup page after authentication'
          })
        }

        setStatus('Authentication successful! Redirecting...')

        // Check for return URL (e.g., from invitation flow)
        const returnUrl = localStorage.getItem('authReturnUrl')
        if (returnUrl) {
          localStorage.removeItem('authReturnUrl')
          router.replace(returnUrl)
        } else {
          router.replace('/chat')
        }

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