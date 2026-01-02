'use client'

import { useState } from 'react'
import { Check, Copy, Key, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface CreateApiKeyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (name: string) => Promise<string | null>
  loading: boolean
}

export function CreateApiKeyModal({
  open,
  onOpenChange,
  onCreate,
  loading,
}: CreateApiKeyModalProps) {
  const [name, setName] = useState('')
  const [createdKey, setCreatedKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error('Please enter a name for the API key')
      return
    }

    const key = await onCreate(name.trim())
    if (key) {
      setCreatedKey(key)
    }
  }

  const handleCopy = async () => {
    if (createdKey) {
      await navigator.clipboard.writeText(createdKey)
      setCopied(true)
      toast.success('API key copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset state when closing
      setName('')
      setCreatedKey(null)
      setCopied(false)
    }
    onOpenChange(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="size-5" />
            {createdKey ? 'API Key Created' : 'Create API Key'}
          </DialogTitle>
          <DialogDescription>
            {createdKey
              ? 'Copy your API key now. You won\'t be able to see it again.'
              : 'Create an API key for CI/CD webhook integration.'}
          </DialogDescription>
        </DialogHeader>

        {createdKey ? (
          <div className="space-y-4 py-4">
            <Alert>
              <AlertDescription className="text-sm">
                Make sure to copy your API key now. For security reasons, it won&apos;t be shown again.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label>Your API Key</Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={createdKey}
                  className="font-mono text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="size-4 text-green-500" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium">Usage example:</p>
              <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
{`curl -X POST https://api.vibemonitor.com/api/v1/deployments/webhook \\
  -H "X-Workspace-Key: ${createdKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "environment": "production",
    "repository": "owner/repo",
    "branch": "main",
    "commit_sha": "abc123..."
  }'`}
              </pre>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Key Name</Label>
              <Input
                id="name"
                placeholder="e.g., GitHub Actions, Jenkins CI"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                A descriptive name to help identify this key.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          {createdKey ? (
            <Button onClick={() => handleClose(false)}>
              Done
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleClose(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={loading || !name.trim()}>
                {loading ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Key'
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
