'use client'

import { useState, useEffect, useCallback } from 'react'
import { checkGitHubStatusWithService } from '@/services/githubStatusService'
import { CheckCircle, XCircle, AlertTriangle, Loader2, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GitHubStatusIndicatorProps {
  workspaceId: string
  showDetails?: boolean
  className?: string
}

interface GitHubStatus {
  connected: boolean
  integration?: {
    id: string
    github_username: string
    installation_id: string
    last_synced_at: string
    is_active?: boolean
    suspended_at?: string
    suspension_reason?: string
  }
}

export default function GitHubStatusIndicator({ 
  workspaceId, 
  showDetails = true, 
  className = "" 
}: GitHubStatusIndicatorProps) {
  const [status, setStatus] = useState<GitHubStatus | null>(null)
  const [statusType, setStatusType] = useState<'connected' | 'suspended' | 'not-connected' | 'error'>('not-connected')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const checkGitHubStatus = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await checkGitHubStatusWithService(workspaceId)
      setStatusType(result.status)
      
      if (result.data) {
        setStatus(result.data)
      }
      
      if (result.error) {
        setError(result.error)
      }
    } catch (err) {
      console.error('Failed to check GitHub status:', err)
      setError('Failed to check GitHub status')
      setStatusType('error')
    } finally {
      setLoading(false)
    }
  }, [workspaceId])

  useEffect(() => {
    checkGitHubStatus()
    
    // Set up polling to check status periodically
    const interval = setInterval(checkGitHubStatus, 30000) // Check every 30 seconds
    
    return () => clearInterval(interval)
  }, [checkGitHubStatus])

  const getStatusDisplay = () => {
    if (loading) {
      return {
        icon: <Loader2 className="h-4 w-4 animate-spin" />,
        text: "Checking...",
        color: "text-gray-400",
        bgColor: "bg-gray-100"
      }
    }

    switch (statusType) {
      case 'error':
        return {
          icon: <XCircle className="h-4 w-4" />,
          text: "Error",
          color: "text-red-500",
          bgColor: "bg-red-100"
        }
      
      case 'not-connected':
        return {
          icon: <XCircle className="h-4 w-4" />,
          text: "Not Connected",
          color: "text-gray-500",
          bgColor: "bg-gray-100"
        }
      
      case 'suspended':
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          text: "Suspended",
          color: "text-yellow-500",
          bgColor: "bg-yellow-100"
        }
      
      case 'connected':
      default:
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          text: "Active",
          color: "text-green-500",
          bgColor: "bg-green-100"
        }
    }
  }

  const statusDisplay = getStatusDisplay()

  const showSuspendedMessage = () => {
    return (
      <div className="mt-2 p-3 rounded-md border border-yellow-200 bg-yellow-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Integration Suspended</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => window.open('https://github.com/settings/installations', '_blank')}
            className="h-7 px-2 text-xs text-yellow-700 border-yellow-300 hover:bg-yellow-100"
          >
            <Github className="h-3 w-3 mr-1" />
            Fix
          </Button>
        </div>
      </div>
    )
  }

  const showActiveStatus = () => {
    const username = status?.integration?.github_username
    
    return (
      <div className="mt-2 text-sm text-green-600">
        ✅ Connected as <strong>@{username}</strong>
      </div>
    )
  }

  const showNotConnectedMessage = () => {
    return (
      <div className="mt-2 text-xs text-gray-500">
        Connect GitHub to monitor repositories
      </div>
    )
  }

  return (
    <div className={`github-status-indicator ${className}`}>
      {/* Status Badge */}
      <div className="flex items-center space-x-2">
        <div 
          className="flex items-center space-x-2 px-2 py-1 rounded-md text-xs font-medium border"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-primary)'
          }}
        >
          <Github className="h-3 w-3" />
          <span className={statusDisplay.color}>
            {statusDisplay.icon}
          </span>
          <span className="text-xs">{statusDisplay.text}</span>
          {/* Show username and suspended status in compact mode */}
          {status?.integration?.github_username && (
            <>
              <span className="text-xs opacity-50">|</span>
              <span className="text-xs">
                @{status.integration.github_username}
              </span>
              {status.integration.is_active === false && (
                <span 
                  className="ml-1 px-1 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold cursor-pointer hover:bg-yellow-200 transition-colors"
                  onClick={() => window.open('https://github.com/settings/installations', '_blank')}
                  title="Click to unsuspend on GitHub"
                >
                  SUSPENDED
                </span>
              )}
            </>
          )}
        </div>
        
        {showDetails && (
          <Button
            size="sm"
            variant="ghost"
            onClick={checkGitHubStatus}
            disabled={loading}
            className="h-6 px-2 text-xs"
          >
            <Loader2 className={`h-3 w-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        )}
      </div>

      {/* Detailed Status Messages */}
      {showDetails && (
        <div className="mt-2">
          {statusType === 'connected' && showActiveStatus()}
          {statusType === 'suspended' && showSuspendedMessage()}
          {statusType === 'not-connected' && showNotConnectedMessage()}
          {statusType === 'error' && error && (
            <div className="text-xs text-red-500 mt-1">
              ❌ {error}
            </div>
          )}
        </div>
      )}
    </div>
  )
}