'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import {
  IntegrationsSection,
  IntegrationCategory,
  IntegrationStatusType,
} from '@/components/settings/integrations'
import { GrafanaLogo } from '@/components/vm-site-components/GrafanaLogo'
import { SlackLogo } from '@/components/vm-site-components/SlackLogo'
import { useGithubIntegration } from '@/hooks/useGithubIntegration'
import { useGrafanaIntegration } from '@/hooks/useGrafanaIntegration'
import { useSlackIntegration } from '@/hooks/useSlackIntegration'
import { useNewRelicIntegration } from '@/hooks/useNewRelicIntegration'
import { useDatadogIntegration } from '@/hooks/useDatadogIntegration'
import { useAwsIntegration } from '@/hooks/useAwsIntegration'
import { useAppSelector } from '@/lib/hooks'

// NewRelic logo component
function NewRelicLogo({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18l6.63 3.68L12 11.54 5.37 7.86 12 4.18zM5 8.82l6 3.33v6.67l-6-3.33V8.82zm14 6.67l-6 3.33v-6.67l6-3.33v6.67z"
        fill="currentColor"
      />
    </svg>
  )
}

// AWS CloudWatch logo component
function AwsCloudWatchLogo({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5 12c0-1.5-.5-3-1.5-4.2-.3-.4-.8-.5-1.2-.2-.4.3-.5.8-.2 1.2.7.9 1.1 2 1.1 3.2 0 2.8-2.2 5-5 5s-5-2.2-5-5c0-1.2.4-2.3 1.1-3.2.3-.4.2-.9-.2-1.2-.4-.3-.9-.2-1.2.2-1 1.2-1.5 2.7-1.5 4.2 0 3.9 3.1 7 7 7s7-3.1 7-7z"
        fill="currentColor"
      />
      <path
        d="M12 2c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1s1-.4 1-1V3c0-.6-.4-1-1-1z"
        fill="currentColor"
      />
    </svg>
  )
}

// Datadog logo component
function DatadogLogo({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 5.5c-.8-.8-2-.9-3-.3l-1.5 1-1.5-1c-1-.6-2.2-.5-3 .3-.8.8-.9 2-.3 3l1 1.5-1 1.5c-.6 1-.5 2.2.3 3 .8.8 2 .9 3 .3l1.5-1 1.5 1c1 .6 2.2.5 3-.3.8-.8.9-2 .3-3l-1-1.5 1-1.5c.6-1 .5-2.2-.3-3zM12 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function IntegrationsPage() {
  const searchParams = useSearchParams()
  const currentWorkspace = useAppSelector((state) => state.workspace.currentWorkspace)
  const workspaceId = currentWorkspace?.id
  const isPersonalSpace = currentWorkspace?.type === 'personal'

  // Integration hooks
  const github = useGithubIntegration(workspaceId)
  const grafana = useGrafanaIntegration(workspaceId)
  const slack = useSlackIntegration(workspaceId)
  const newRelic = useNewRelicIntegration(workspaceId)
  const datadog = useDatadogIntegration(workspaceId)
  const aws = useAwsIntegration(workspaceId)

  // Check statuses on mount
  useEffect(() => {
    if (workspaceId) {
      github.checkStatus()
      grafana.checkStatus()
      slack.checkStatus()
      newRelic.checkStatus()
      datadog.checkStatus()
      aws.checkStatus()
    }
  }, [workspaceId])

  // Handle callback query params (github=connected, slack=connected, error=...)
  useEffect(() => {
    const githubConnected = searchParams.get('github')
    const slackConnected = searchParams.get('slack')
    const error = searchParams.get('error')

    if (githubConnected === 'connected') {
      toast.success('GitHub connected successfully!')
      github.checkStatus()
    }

    if (slackConnected === 'connected') {
      toast.success('Slack connected successfully!')
      slack.checkStatus()
    }

    if (error) {
      toast.error(`Connection failed: ${error.replace(/_/g, ' ')}`)
    }

    // Clean up URL
    if (githubConnected || slackConnected || error) {
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', window.location.pathname)
      }
    }
  }, [searchParams])

  // Map hook status to our status type
  const mapStatus = (connected: boolean, status?: string): IntegrationStatusType => {
    if (status === 'error') return 'error'
    if (connected) return 'connected'
    return 'not_connected'
  }

  const handleCreateTeam = () => {
    // TODO: Navigate to team creation page or open modal
    console.log('Create team workspace')
  }

  const categories: IntegrationCategory[] = [
    {
      id: 'source-control',
      name: 'Source Control',
      integrations: [
        {
          id: 'github',
          name: 'GitHub',
          description: 'Monitor commits, issues, and pull requests in real time.',
          icon: <GitHubLogoIcon className="size-5 text-foreground" />,
          status: mapStatus(github.connected, github.status),
          onConnect: github.onConnect,
          onReconfigure: github.onConnect,
          loading: github.loading,
        },
      ],
    },
    {
      id: 'observability',
      name: 'Observability',
      integrations: [
        {
          id: 'newrelic',
          name: 'New Relic',
          description: 'Connect your New Relic account to import APM data.',
          icon: <NewRelicLogo size={20} />,
          status: mapStatus(newRelic.connected),
          onConnect: newRelic.onConnect,
          onReconfigure: newRelic.onConnect,
          loading: newRelic.loading,
        },
        {
          id: 'grafana',
          name: 'Grafana',
          description: 'Import dashboards and alerts from your Grafana instance.',
          icon: <GrafanaLogo size={20} className="text-[#F46800]" />,
          status: mapStatus(grafana.connected),
          isLocked: isPersonalSpace,
          lockMessage: 'Grafana is available for team spaces only',
          onConnect: grafana.onConnect,
          onReconfigure: grafana.onConnect,
          onCreateTeam: handleCreateTeam,
          loading: grafana.loading,
        },
        {
          id: 'aws-cloudwatch',
          name: 'AWS CloudWatch',
          description: 'Connect to AWS CloudWatch for logs and metrics.',
          icon: <AwsCloudWatchLogo size={20} />,
          status: mapStatus(aws.connected),
          isLocked: isPersonalSpace,
          lockMessage: 'AWS CloudWatch is available for team spaces only',
          onConnect: aws.onConnect,
          onReconfigure: aws.onConnect,
          onCreateTeam: handleCreateTeam,
          loading: aws.loading,
        },
        {
          id: 'datadog',
          name: 'Datadog',
          description: 'Sync metrics and monitors from your Datadog account.',
          icon: <DatadogLogo size={20} />,
          status: mapStatus(datadog.connected),
          isLocked: isPersonalSpace,
          lockMessage: 'Datadog is available for team spaces only',
          onConnect: datadog.onConnect,
          onReconfigure: datadog.onConnect,
          onCreateTeam: handleCreateTeam,
          loading: datadog.loading,
        },
      ],
    },
    {
      id: 'communication',
      name: 'Communication',
      integrations: [
        {
          id: 'slack',
          name: 'Slack',
          description: 'Receive alerts and updates directly in your Slack channels.',
          icon: <SlackLogo size={20} />,
          status: mapStatus(slack.connected),
          isLocked: isPersonalSpace,
          lockMessage: 'Slack is available for team spaces only',
          onConnect: slack.onConnect,
          onReconfigure: slack.onConnect,
          onCreateTeam: handleCreateTeam,
          loading: slack.loading,
        },
      ],
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-foreground">
          Integrations
        </h1>
        <p className="text-sm text-muted-foreground">
          Connect your tools and services to enhance your observability workflow.
        </p>
      </div>

      <IntegrationsSection categories={categories} />
    </div>
  )
}
