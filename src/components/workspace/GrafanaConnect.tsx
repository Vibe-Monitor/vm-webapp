"use client"

import { useState, useEffect } from 'react'
import { apiService } from '@/services/apiService'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, XCircle } from 'lucide-react'
import { toastManager } from '@/lib/toastManager'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'

interface GrafanaConnectProps {
  workspaceId: string
  externalOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function GrafanaConnect({
  workspaceId,
  externalOpen,
  onOpenChange
}: GrafanaConnectProps) {
  const [loading, setLoading] = useState(false)
  const [disconnecting, setDisconnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
  const [grafanaUrl, setGrafanaUrl] = useState('')
  const [apiToken, setApiToken] = useState('')
  const [internalSheetOpen, setInternalSheetOpen] = useState(false)

  // Use external control if provided, otherwise use internal state
  const sheetOpen = externalOpen !== undefined ? externalOpen : internalSheetOpen
  const setSheetOpen = onOpenChange || setInternalSheetOpen
  // Check connection status on mount
  useEffect(() => {
    const checkStatus = async () => {
      setCheckingStatus(true)
      try {
        const response = await apiService.getGrafanaStatus(workspaceId)
        if (response.data && response.data.connected) {
          setIsConnected(true)
        } else {
          setIsConnected(false)
        }
      } catch (error) {
        console.error('Failed to check Grafana status:', error)
        setIsConnected(false)
      } finally {
        setCheckingStatus(false)
      }
    }

    checkStatus()
  }, [workspaceId])


  const handleConnectGrafana = async () => {
    // Validate inputs
    if (!grafanaUrl.trim()) {
      toastManager.error('Please enter your Grafana Cloud URL')
      return
    }

    if (!apiToken.trim()) {
      toastManager.error('Please enter your Access Policy token')
      return
    }

    // Add https:// if not present
    let formattedUrl = grafanaUrl.trim()
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`
    }

    // Validate URL format
    try {
      const url = new URL(formattedUrl)
      if (!url.hostname.includes('grafana.net')) {
        toastManager.error('Please enter a valid Grafana Cloud URL (e.g., https://mystack.grafana.net)')
        return
      }
    } catch {
      toastManager.error('Please enter a valid URL')
      return
    }

    setLoading(true)

    try {
      const response = await apiService.connectGrafana({
        workspace_id: workspaceId,
        grafana_url: formattedUrl,
        api_token: apiToken.trim(),
      })

      if (response.status === 200 && response.data) {
        setIsConnected(true)
        setSheetOpen(false)
        setGrafanaUrl('')
        setApiToken('')
        toastManager.success('Grafana Cloud connected successfully')
      } else {
        throw new Error(response.error || 'Failed to connect Grafana')
      }
    } catch (error) {
      console.error('Grafana connection failed:', error)
      toastManager.error('Failed to connect Grafana. Please check your credentials and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDisconnectGrafana = async () => {
    setDisconnecting(true)

    try {
      const response = await apiService.disconnectGrafana(workspaceId)

      if (response.status === 200) {
        setIsConnected(false)
        toastManager.success('Grafana disconnected successfully')
      } else {
        throw new Error('Failed to disconnect Grafana')
      }
    } catch (error) {
      console.error('Grafana disconnection failed:', error)
      toastManager.error('Failed to disconnect Grafana. Please try again.')
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

  // Show disconnect option when connected
  if (isConnected) {
    return (
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Grafana Connection</SheetTitle>
            <SheetDescription>
              Your workspace is connected to Grafana Cloud.
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 py-4">
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                ✓ Grafana Cloud Connected
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Your workspace is successfully connected to Grafana Cloud and receiving logs.
              </p>
            </div>
          </div>

          <SheetFooter>
            <Button
              onClick={handleDisconnectGrafana}
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
                  Disconnect Grafana
                </>
              )}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  }

  // Show connect sheet modal
  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Connect Grafana Cloud</SheetTitle>
            <SheetDescription>
              Connect your Grafana Cloud instance to enable log streaming and monitoring. You&apos;ll need your Grafana Cloud stack URL and an Access Policy token with logs:read permissions.
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="grafana-url">Grafana Cloud URL</Label>
              <Input
                id="grafana-url"
                type="url"
                placeholder="https://mystack.grafana.net"
                value={grafanaUrl}
                onChange={(e) => setGrafanaUrl(e.target.value)}
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">
                Your Grafana Cloud stack URL (e.g., https://mystack.grafana.net)
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="api-token">Access Policy Token</Label>
              <Input
                id="api-token"
                type="password"
                placeholder="glc_..."
                value={apiToken}
                onChange={(e) => setApiToken(e.target.value)}
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">
                Your Grafana Cloud Access Policy token with logs:read scope
              </p>
            </div>

            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm font-medium mb-2">How to get your credentials:</p>
              <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Go to your Grafana Cloud portal</li>
                <li>Navigate to Security &gt; Access Policies</li>
                <li>Create a new Access Policy with logs:read scope</li>
                <li>Generate a token and copy it here</li>
              </ol>
            </div>
          </div>

          <SheetFooter>
            <Button
              variant="outline"
              onClick={() => setSheetOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConnectGrafana}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect'
              )}
            </Button>
          </SheetFooter>
        </SheetContent>
    </Sheet>
  )
}
