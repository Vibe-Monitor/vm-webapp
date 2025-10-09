"use client"

import { useState, useEffect, useCallback } from 'react'
import { apiService } from '@/services/apiService'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { toastManager } from '@/lib/toastManager'

interface GitHubConnectProps {
  workspaceId: string
}

export default function GitHubConnect({ workspaceId }: GitHubConnectProps) {
  const [loading, setLoading] = useState(false)
  const [disconnecting, setDisconnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const [githubUsername, setGithubUsername] = useState<string | null>(null)

  const checkConnectionStatus = useCallback(async () => {
    setCheckingStatus(true)
    try {
      const response = await apiService.getGithubStatus(workspaceId)
      if (response.data) {
        setIsConnected(response.data.connected)
        if (response.data.connected && response.data.integration) {
          setGithubUsername(response.data.integration.github_username)
        } else {
          setGithubUsername(null)
        }
      }
    } catch (error) {
      console.error('Failed to check GitHub status:', error)
    } finally {
      setCheckingStatus(false)
    }
  }, [workspaceId])

  // Check connection status on mount
  useEffect(() => {
    checkConnectionStatus()
  }, [checkConnectionStatus])

  // Listen for GitHub connection events from callback
  useEffect(() => {
    const handleGithubConnected = () => {
      checkConnectionStatus()
    }

    window.addEventListener('github-connected', handleGithubConnected)
    return () => window.removeEventListener('github-connected', handleGithubConnected)
  }, [checkConnectionStatus])

  // Simple GitHub install flow
  const handleConnectGitHub = async () => {
    setLoading(true)

    try {
      // Get GitHub install URL
      const installUrlResponse = await apiService.getGithubInstallUrl(workspaceId)

      if (!installUrlResponse.data?.install_url) {
        throw new Error('Failed to get GitHub install URL')
      }

      // Store workspace_id in sessionStorage for callback
      sessionStorage.setItem('github_workspace_id', workspaceId)

      // Redirect to GitHub to install the app
      window.location.href = installUrlResponse.data.install_url
    } catch (error) {
      console.error('GitHub connection failed:', error)
      toastManager.error('Failed to connect GitHub. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Disconnect GitHub App
  const handleDisconnectGitHub = async () => {
    setDisconnecting(true)

    try {
      const response = await apiService.disconnectGithub(workspaceId)

      if (response.status === 200) {
        setIsConnected(false)
        setGithubUsername(null)
        toastManager.success('GitHub disconnected successfully')
      } else {
        throw new Error('Failed to disconnect GitHub')
      }
    } catch (error) {
      console.error('GitHub disconnection failed:', error)
      toastManager.error('Failed to disconnect GitHub. Please try again.')
    } finally {
      setDisconnecting(false)
    }
  }

  // Show loading state while checking initial status
  if (checkingStatus) {
    return (
      <Button variant="outline" disabled className="gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        Checking...
      </Button>
    )
  }

  // Show connected state
  if (isConnected) {
    return (
      <div className="flex gap-2 items-center">
        <Button variant="default" disabled className="gap-2">
          <CheckCircle className="h-4 w-4" />
          {githubUsername ? `@${githubUsername}` : 'GitHub Connected'}
        </Button>
        <Button
          onClick={handleDisconnectGitHub}
          disabled={disconnecting}
          variant="destructive"
          className="gap-2"
        >
          {disconnecting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Disconnecting...
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4" />
              Disconnect
            </>
          )}
        </Button>
      </div>
    )
  }

  // Show connect button
  return (
    <Button
      onClick={handleConnectGitHub}
      disabled={loading}
      variant="outline"
      className="gap-2"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Connect GitHub
        </>
      )}
    </Button>
  )
}
