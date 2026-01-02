'use client'

import { useEffect, useState } from 'react'
import { Key, Loader2, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { api } from '@/services/api/apiFactory'
import { ApiKey } from '@/types/deployment'
import { ApiKeyRow } from './ApiKeyRow'
import { CreateApiKeyModal } from './CreateApiKeyModal'

interface ApiKeysSectionProps {
  workspaceId: string
}

export function ApiKeysSection({ workspaceId }: ApiKeysSectionProps) {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)

  useEffect(() => {
    const fetchApiKeys = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await api.deployments.listApiKeys(workspaceId)
        if (response.status === 200 && response.data) {
          setApiKeys(response.data.api_keys)
        } else {
          setError(response.error || 'Failed to load API keys')
        }
      } catch {
        setError('Failed to load API keys')
      } finally {
        setLoading(false)
      }
    }

    if (workspaceId) {
      fetchApiKeys()
    }
  }, [workspaceId])

  const handleCreate = async (name: string): Promise<string | null> => {
    setCreateLoading(true)
    try {
      const response = await api.deployments.createApiKey(workspaceId, { name })
      if (response.status === 201 && response.data) {
        // Add the new key to the list (without the full key)
        setApiKeys((prev) => [
          {
            id: response.data!.id,
            name: response.data!.name,
            key_prefix: response.data!.key_prefix,
            created_at: response.data!.created_at,
            last_used_at: null,
          },
          ...prev,
        ])
        toast.success('API key created')
        return response.data.key
      } else {
        toast.error(response.error || 'Failed to create API key')
        return null
      }
    } catch {
      toast.error('Failed to create API key')
      return null
    } finally {
      setCreateLoading(false)
    }
  }

  const handleDelete = async (keyId: string) => {
    setDeleteLoading(keyId)
    try {
      const response = await api.deployments.deleteApiKey(workspaceId, keyId)
      if (response.status === 204) {
        setApiKeys((prev) => prev.filter((k) => k.id !== keyId))
        toast.success('API key deleted')
      } else {
        toast.error(response.error || 'Failed to delete API key')
      }
    } catch {
      toast.error('Failed to delete API key')
    } finally {
      setDeleteLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">API Keys</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage API keys for CI/CD deployment webhooks.
          </p>
        </div>

        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="size-4" />
          Create API Key
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card">
        {apiKeys.length === 0 ? (
          <div className="py-12 text-center">
            <Key className="size-8 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm font-medium text-foreground">No API keys yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Create an API key to enable deployment webhooks from your CI/CD.
            </p>
          </div>
        ) : (
          apiKeys.map((apiKey) => (
            <ApiKeyRow
              key={apiKey.id}
              apiKey={apiKey}
              onDelete={handleDelete}
              deleteLoading={deleteLoading === apiKey.id}
            />
          ))
        )}
      </div>

      {/* Usage Instructions */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h3 className="text-sm font-medium text-foreground">
          How to use API keys
        </h3>
        <p className="text-sm text-muted-foreground">
          Use your API key to report deployments from any CI/CD system. Include
          the key in the <code className="bg-muted px-1 py-0.5 rounded text-xs">X-Workspace-Key</code> header.
        </p>
        <div className="text-sm text-muted-foreground">
          <p className="font-medium mb-2">GitHub Actions Example:</p>
          <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
{`- name: Report Deployment
  run: |
    curl -X POST $\{{ secrets.VM_API_URL }}/api/v1/deployments/webhook \\
      -H "X-Workspace-Key: $\{{ secrets.VM_WORKSPACE_KEY }}" \\
      -H "Content-Type: application/json" \\
      -d '{
        "environment": "production",
        "repository": "$\{{ github.repository }}",
        "branch": "$\{{ github.ref_name }}",
        "commit_sha": "$\{{ github.sha }}"
      }'`}
          </pre>
        </div>
      </div>

      <CreateApiKeyModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onCreate={handleCreate}
        loading={createLoading}
      />
    </div>
  )
}
