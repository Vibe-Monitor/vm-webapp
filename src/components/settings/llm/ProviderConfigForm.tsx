'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { VerifyButton } from './VerifyButton'
import type { LLMProvider } from '@/services/api/clients/LLMConfigClient'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProviderConfigFormProps {
  provider: LLMProvider
  apiKey: string
  onApiKeyChange: (value: string) => void
  model: string
  onModelChange: (value: string) => void
  endpointUrl: string
  onEndpointUrlChange: (value: string) => void
  deploymentName: string
  onDeploymentNameChange: (value: string) => void
  apiVersion: string
  onApiVersionChange: (value: string) => void
  onVerify: () => void
  verifying: boolean
  verifySuccess: boolean | null
  verifyError: string | null
  hasExistingKey?: boolean
}

const openAIModels = [
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
]

const geminiModels = [
  { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
  { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
  { value: 'gemini-2.0-flash-exp', label: 'Gemini 2.0 Flash (Experimental)' },
  { value: 'gemini-pro', label: 'Gemini Pro' },
]

const azureApiVersions = [
  { value: '2024-02-01', label: '2024-02-01' },
  { value: '2024-05-01-preview', label: '2024-05-01-preview' },
  { value: '2023-12-01-preview', label: '2023-12-01-preview' },
  { value: '2023-05-15', label: '2023-05-15' },
]

export function ProviderConfigForm({
  provider,
  apiKey,
  onApiKeyChange,
  model,
  onModelChange,
  endpointUrl,
  onEndpointUrlChange,
  deploymentName,
  onDeploymentNameChange,
  apiVersion,
  onApiVersionChange,
  onVerify,
  verifying,
  verifySuccess,
  verifyError,
  hasExistingKey = false,
}: ProviderConfigFormProps) {
  const [showApiKey, setShowApiKey] = React.useState(false)

  const canVerify = React.useMemo(() => {
    if (!apiKey && !hasExistingKey) return false

    switch (provider) {
      case 'openai':
        return (apiKey || hasExistingKey) && model
      case 'azure_openai':
        return (apiKey || hasExistingKey) && endpointUrl && deploymentName && apiVersion
      case 'google_gemini':
        return (apiKey || hasExistingKey) && model
      default:
        return false
    }
  }, [provider, apiKey, model, endpointUrl, deploymentName, apiVersion, hasExistingKey])

  if (provider === 'vibemonitor') {
    return null
  }

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-4">
      <div className="space-y-2">
        <Label htmlFor="api-key">API Key</Label>
        <div className="relative">
          <Input
            id="api-key"
            type={showApiKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder={hasExistingKey ? '••••••••••••••••' : 'Enter your API key'}
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-9 w-9"
            onClick={() => setShowApiKey(!showApiKey)}
          >
            {showApiKey ? (
              <EyeOff className="size-4 text-muted-foreground" />
            ) : (
              <Eye className="size-4 text-muted-foreground" />
            )}
          </Button>
        </div>
        {hasExistingKey && !apiKey && (
          <p className="text-xs text-muted-foreground">
            Leave empty to keep the existing key
          </p>
        )}
      </div>

      {provider === 'openai' && (
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Select value={model} onValueChange={onModelChange}>
            <SelectTrigger id="model" className="w-full">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {openAIModels.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {provider === 'azure_openai' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="endpoint-url">Endpoint URL</Label>
            <Input
              id="endpoint-url"
              type="url"
              value={endpointUrl}
              onChange={(e) => onEndpointUrlChange(e.target.value)}
              placeholder="https://your-resource.openai.azure.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deployment-name">Deployment Name</Label>
            <Input
              id="deployment-name"
              type="text"
              value={deploymentName}
              onChange={(e) => onDeploymentNameChange(e.target.value)}
              placeholder="my-gpt-4-deployment"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-version">API Version</Label>
            <Select value={apiVersion} onValueChange={onApiVersionChange}>
              <SelectTrigger id="api-version" className="w-full">
                <SelectValue placeholder="Select API version" />
              </SelectTrigger>
              <SelectContent>
                {azureApiVersions.map((v) => (
                  <SelectItem key={v.value} value={v.value}>
                    {v.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {provider === 'google_gemini' && (
        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Select value={model} onValueChange={onModelChange}>
            <SelectTrigger id="model" className="w-full">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {geminiModels.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <VerifyButton
        onClick={onVerify}
        loading={verifying}
        success={verifySuccess}
        error={verifyError}
        disabled={!canVerify}
      />
    </div>
  )
}
