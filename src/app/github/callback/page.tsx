'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import posthog from 'posthog-js'
import { api } from '@/services/api/apiFactory'
import Loader from '@/components/ui/loader'

export default function GithubCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState('Connecting GitHub App...')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const installation_id = urlParams.get('installation_id')
        const setup_action = urlParams.get('setup_action')
        const state = urlParams.get('state')

        posthog.capture('github_callback_received', {
          installation_id: installation_id,
          setup_action: setup_action,
          has_state: !!state
        })

        if (!installation_id) {
          setStatus('Missing installation ID')

          posthog.capture('github_callback_failed', {
            error: 'missing_installation_id',
            stage: 'validation'
          })

          router.replace('/setup?error=missing_installation_id')
          return
        }

        if (!setup_action) {
          setStatus('Missing setup action')

          posthog.capture('github_callback_failed', {
            error: 'missing_setup_action',
            stage: 'validation'
          })

          router.replace('/setup?error=missing_setup_action')
          return
        }

        setStatus('Finalizing GitHub integration...')

        const response = await api.github.handleCallback({
          installation_id,
          setup_action,
          ...(state && { state })
        })

        if (response.error || response.status !== 200) {
          throw new Error(response.error || 'GitHub integration failed')
        }

        posthog.capture('integration_github_callback_successful', {
          installation_id: installation_id,
          setup_action: setup_action
        })

        setStatus('GitHub connected successfully! Redirecting...')
        router.replace(`/setup?github=connected`)

      } catch (error) {
        console.error('GitHub callback error:', error)
        setStatus('GitHub integration failed')

        posthog.capture('github_callback_failed', {
          error: error instanceof Error ? error.message : 'unknown_error',
          stage: 'api_call'
        })

        router.replace('/setup?error=github_connection_failed')
      }
    }

    handleCallback()
  }, [router])

  return <Loader message={status} />
}
