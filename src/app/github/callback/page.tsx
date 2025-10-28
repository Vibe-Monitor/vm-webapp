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

        // Validate required parameters
        if (!installation_id) {
          setStatus('Missing installation ID')
          router.replace('/setup?error=missing_installation_id')
          return
        }

        if (!setup_action) {
          setStatus('Missing setup action')
          router.replace('/setup?error=missing_setup_action')
          return
        }

        // Get workspace_id from sessionStorage (stored before redirect)
        // const workspace_id = sessionStorage.getItem('github_workspace_id')

        // if (!workspace_id) {
        //   setStatus('Missing workspace ID')
        //   router.replace('/setup?error=missing_workspace_id')
        //   return
        // }

        // Process GitHub callback
        setStatus('Finalizing GitHub integration...')

        const response = await apiService.handleGithubCallback({
          installation_id,
          setup_action,
          // workspace_id,
          ...(state && { state })
        })

        if (response.error || response.status !== 200) {
          throw new Error(response.error || 'GitHub integration failed')
        }

        setStatus('GitHub connected successfully! Redirecting...')

        // Redirect to setup page immediately with success message
        router.replace(`/setup?github=connected`)

      } catch (error) {
        console.error('GitHub callback error:', error)
        setStatus('GitHub integration failed')
        router.replace('/setup?error=github_connection_failed')
      }
    }

    handleCallback()
  }, [router])

  return <Loader message={status} />
}
