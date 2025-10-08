'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiService } from '@/services/apiService'
import Loader from '@/components/ui/loader'

export default function GithubCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState('Connecting GitHub App...')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the URL parameters
        const urlParams = new URLSearchParams(window.location.search)
        const installation_id = urlParams.get('installation_id')
        const setup_action = urlParams.get('setup_action')
        const state = urlParams.get('state')
        let workspace_id = urlParams.get('workspace_id')

        // Validate required parameters
        if (!installation_id) {
          setStatus('Missing installation ID')
          router.replace('/workspace?error=missing_installation_id')
          return
        }

        if (!setup_action) {
          setStatus('Missing setup action')
          router.replace('/workspace?error=missing_setup_action')
          return
        }

        // Get workspace_id from sessionStorage (stored before redirect)
        if (!workspace_id) {
          workspace_id = sessionStorage.getItem('github_workspace_id')
          if (workspace_id) {
            // Clean up sessionStorage after retrieving
            sessionStorage.removeItem('github_workspace_id')
          }
        }

        if (!workspace_id) {
          setStatus('Missing workspace ID')
          router.replace('/workspace?error=missing_workspace_id')
          return
        }

        // Process GitHub callback
        setStatus('Finalizing GitHub integration...')

        const response = await apiService.handleGithubCallback({
          installation_id,
          setup_action,
          workspace_id,
          ...(state && { state })
        })

        if (response.error || response.status !== 200) {
          throw new Error(response.error || 'GitHub integration failed')
        }

        // Verify integration using status API
        setStatus('Verifying GitHub integration...')
        const statusResponse = await apiService.getGithubStatus(workspace_id)

        if (!statusResponse.data?.connected) {
          throw new Error('GitHub integration verification failed')
        }

        setStatus('GitHub connected successfully! Redirecting...')

        // Redirect to workspace page with success message
        setTimeout(() => {
          router.replace(`/workspace/${workspace_id}?github=connected`)
        }, 1000)

      } catch (error) {
        console.error('GitHub callback error:', error)
        setStatus('GitHub integration failed')

        // Try to get workspace_id for redirect (from URL params or sessionStorage)
        const urlParams = new URLSearchParams(window.location.search)
        let workspace_id = urlParams.get('workspace_id')

        if (!workspace_id) {
          workspace_id = sessionStorage.getItem('github_workspace_id')
          if (workspace_id) {
            sessionStorage.removeItem('github_workspace_id')
          }
        }

        if (workspace_id) {
          router.replace(`/workspace/${workspace_id}?error=github_connection_failed`)
        } else {
          router.replace('/workspace?error=github_callback_failed')
        }
      }
    }

    handleCallback()
  }, [router])

  return <Loader message={status} />
}
