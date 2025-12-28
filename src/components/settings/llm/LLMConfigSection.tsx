'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { LLMProviderCard } from './LLMProviderCard'
import { ProviderConfigForm } from './ProviderConfigForm'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
  fetchLLMConfig,
  verifyLLMCredentials,
  updateLLMConfig,
  resetLLMConfig,
  clearVerifyState,
} from '@/lib/features/llmConfigSlice'
import type { LLMProvider } from '@/services/api/clients/LLMConfigClient'
import { AlertCircle, Loader2, RotateCcw, Save, ShieldAlert } from 'lucide-react'
import { toast } from 'sonner'

interface LLMConfigSectionProps {
  workspaceId: string
  isOwner: boolean
}

export function LLMConfigSection({ workspaceId, isOwner }: LLMConfigSectionProps) {
  const dispatch = useAppDispatch()
  const { config, loading, verifying, verifySuccess, verifyError, saving } = useAppSelector(
    (state) => state.llmConfig
  )

  const [selectedProvider, setSelectedProvider] = React.useState<LLMProvider>('vibemonitor')
  const [apiKey, setApiKey] = React.useState('')
  const [model, setModel] = React.useState('')
  const [endpointUrl, setEndpointUrl] = React.useState('')
  const [deploymentName, setDeploymentName] = React.useState('')
  const [apiVersion, setApiVersion] = React.useState('')
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false)

  // Fetch config on mount
  React.useEffect(() => {
    if (workspaceId) {
      dispatch(fetchLLMConfig(workspaceId))
    }
  }, [dispatch, workspaceId])

  // Initialize form from config
  React.useEffect(() => {
    if (config) {
      setSelectedProvider(config.provider)
      setModel(config.model || '')
      setEndpointUrl(config.endpoint_url || '')
      setDeploymentName(config.deployment_name || '')
      setApiVersion(config.api_version || '')
      // Don't set API key - it's masked on the server
    } else {
      setSelectedProvider('vibemonitor')
    }
  }, [config])

  // Track unsaved changes
  React.useEffect(() => {
    if (!config) {
      setHasUnsavedChanges(selectedProvider !== 'vibemonitor')
      return
    }

    const providerChanged = selectedProvider !== config.provider
    const modelChanged = model !== (config.model || '')
    const endpointChanged = endpointUrl !== (config.endpoint_url || '')
    const deploymentChanged = deploymentName !== (config.deployment_name || '')
    const versionChanged = apiVersion !== (config.api_version || '')
    const keyChanged = apiKey !== ''

    setHasUnsavedChanges(
      providerChanged || modelChanged || endpointChanged || deploymentChanged || versionChanged || keyChanged
    )
  }, [selectedProvider, apiKey, model, endpointUrl, deploymentName, apiVersion, config])

  // Clear verify state when provider changes
  const handleProviderChange = (provider: LLMProvider) => {
    setSelectedProvider(provider)
    setApiKey('')
    dispatch(clearVerifyState())

    // Set default model for provider
    if (provider === 'openai') {
      setModel('gpt-4-turbo')
    } else if (provider === 'google_gemini') {
      setModel('gemini-1.5-pro')
    } else if (provider === 'azure_openai') {
      setApiVersion('2024-02-01')
    }
  }

  const handleVerify = () => {
    if (!apiKey && !config?.api_key_set) {
      toast.error('Please enter an API key')
      return
    }

    dispatch(
      verifyLLMCredentials({
        workspaceId,
        data: {
          provider: selectedProvider,
          api_key: apiKey || '', // Server will use existing key if empty
          model: model || undefined,
          endpoint_url: endpointUrl || undefined,
          deployment_name: deploymentName || undefined,
          api_version: apiVersion || undefined,
        },
      })
    )
  }

  const handleSave = async () => {
    if (selectedProvider !== 'vibemonitor' && !verifySuccess && !config?.is_verified) {
      toast.error('Please verify your credentials before saving')
      return
    }

    const result = await dispatch(
      updateLLMConfig({
        workspaceId,
        data: {
          provider: selectedProvider,
          api_key: apiKey || undefined,
          model: model || undefined,
          endpoint_url: endpointUrl || undefined,
          deployment_name: deploymentName || undefined,
          api_version: apiVersion || undefined,
        },
      })
    )

    if (updateLLMConfig.fulfilled.match(result)) {
      toast.success('LLM configuration saved successfully')
      setApiKey('') // Clear API key input after save
      setHasUnsavedChanges(false)
    }
  }

  const handleReset = async () => {
    const result = await dispatch(resetLLMConfig(workspaceId))

    if (resetLLMConfig.fulfilled.match(result)) {
      toast.success('Reset to VibeMonitor AI')
      setSelectedProvider('vibemonitor')
      setApiKey('')
      setModel('')
      setEndpointUrl('')
      setDeploymentName('')
      setApiVersion('')
      setHasUnsavedChanges(false)
    }
  }

  if (!isOwner) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>LLM Configuration</CardTitle>
          <CardDescription>Configure AI model settings for your workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <ShieldAlert className="size-4" />
            <AlertTitle>Owner Access Required</AlertTitle>
            <AlertDescription>
              Only workspace owners can configure LLM settings. Contact your workspace owner to make changes.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>LLM Configuration</CardTitle>
          <CardDescription>Configure AI model settings for your workspace</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="size-6 animate-spin text-[var(--color-text-tertiary)]" />
        </CardContent>
      </Card>
    )
  }

  const canSave =
    selectedProvider === 'vibemonitor' ||
    verifySuccess ||
    (config?.is_verified && config.provider === selectedProvider && !apiKey)

  return (
    <Card>
      <CardHeader>
        <CardTitle>LLM Configuration</CardTitle>
        <CardDescription>
          Configure AI model settings for your workspace. Choose between VibeMonitor&apos;s default AI or bring your own LLM provider.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-[var(--color-text-primary)]">Select Provider</h3>
          <LLMProviderCard
            selectedProvider={selectedProvider}
            onSelectProvider={handleProviderChange}
            currentProvider={config?.provider}
            isVerified={config?.is_verified}
          />
        </div>

        {selectedProvider !== 'vibemonitor' && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-[var(--color-text-primary)]">Configuration</h3>
            <ProviderConfigForm
              provider={selectedProvider}
              apiKey={apiKey}
              onApiKeyChange={setApiKey}
              model={model}
              onModelChange={setModel}
              endpointUrl={endpointUrl}
              onEndpointUrlChange={setEndpointUrl}
              deploymentName={deploymentName}
              onDeploymentNameChange={setDeploymentName}
              apiVersion={apiVersion}
              onApiVersionChange={setApiVersion}
              onVerify={handleVerify}
              verifying={verifying}
              verifySuccess={verifySuccess}
              verifyError={verifyError}
              hasExistingKey={config?.api_key_set && config.provider === selectedProvider}
            />
          </div>
        )}

        {verifyError && (
          <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>Verification Failed</AlertTitle>
            <AlertDescription>{verifyError}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={saving || (selectedProvider === 'vibemonitor' && !config)}
          >
            <RotateCcw className="size-4" />
            Reset to Default
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={saving || !hasUnsavedChanges || !canSave}
          >
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
