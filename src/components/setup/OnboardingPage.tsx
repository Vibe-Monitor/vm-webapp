"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { api } from "@/services/api/apiFactory";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setCurrentWorkspace } from "@/lib/features/workspaceSlice";
import { BackButton } from "../ui/BackButton";
import { LogoutButton } from "../ui/LogoutButton";
import { IntegrationSection } from "../integrations/IntegrationSection";
import Loader from "../ui/loader";
import { useSlackIntegration } from "@/hooks/useSlackIntegration";
import { useGithubIntegration } from "@/hooks/useGithubIntegration";
import { useGrafanaIntegration } from "@/hooks/useGrafanaIntegration";
import { useAwsIntegration } from "@/hooks/useAwsIntegration";
import { useIntegrationStatusPoller } from "@/hooks/useIntegrationStatusPoller";
import { useDatadogIntegration } from "@/hooks/useDatadogIntegration";
import { useNewRelicIntegration } from "@/hooks/useNewRelicIntegration";

interface OnboardingPageProps {
  onComplete: () => void;
  userName?: string;
}

export function OnboardingPage({ onComplete, userName = "" }: OnboardingPageProps) {
  const searchParams = useSearchParams();
  const [workspaceName, setWorkspaceName] = useState("");
  const dispatch = useAppDispatch();
  const { currentWorkspace } = useAppSelector((state) => state.workspace);

  // Initialize all integration hooks
  const slack = useSlackIntegration(currentWorkspace?.id);
  const github = useGithubIntegration(currentWorkspace?.id);
  const grafana = useGrafanaIntegration(currentWorkspace?.id);
  const aws = useAwsIntegration(currentWorkspace?.id);
  const datadog = useDatadogIntegration(currentWorkspace?.id);
  const newrelic = useNewRelicIntegration(currentWorkspace?.id);

  // Set up status polling for all integrations
  const { isLoading: isLoadingStatuses } = useIntegrationStatusPoller({
    workspaceId: currentWorkspace?.id,
    integrations: { slack, github, grafana, aws, datadog, newrelic }
  });

  // Fetch workspace name on mount
  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const response = await api.workspace.getAll();
        if (response.data && response.data.length > 0) {
          const firstWorkspace = response.data[0];
          setWorkspaceName(firstWorkspace.name);
          dispatch(setCurrentWorkspace(firstWorkspace));
        } else {
          setWorkspaceName(`${userName}'s Workspace`);
        }
      } catch (error) {
        console.error('Failed to fetch workspace:', error);
        setWorkspaceName(`${userName}'s Workspace`);
      }
    };

    fetchWorkspace();
  }, [userName, dispatch]);

  // Listen for URL parameter changes when returning from OAuth
  useEffect(() => {
    const githubConnected = searchParams.get('github');
    const slackConnected = searchParams.get('slack');

    if (githubConnected === 'connected' || slackConnected === 'connected') {
      // Optimistically update UI immediately
      if (githubConnected === 'connected') {
        github.setConnected(true);
        github.setStatus('connected');
        toast.success('GitHub connected successfully!');
      }

      if (slackConnected === 'connected') {
        slack.setConnected(true);
        toast.success('Slack connected successfully!');
      }

      // Remove the query parameter
      if (typeof window !== 'undefined') {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }

      // Verify with API call once workspace is available
      if (currentWorkspace?.id) {
        const recheckStatuses = async () => {
          try {
            if (githubConnected === 'connected') {
              await github.checkStatus();
            }
            if (slackConnected === 'connected') {
              await slack.checkStatus();
            }
          } catch (error) {
            console.error('Failed to re-check integration status:', error);
          }
        };

        recheckStatuses();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, currentWorkspace?.id]);

  const handleContinue = async () => {
    if (!currentWorkspace?.id) {
      toast.error("Please select a workspace first");
      return;
    }

    if (!workspaceName.trim()) {
      toast.error("Please enter a workspace name");
      return;
    }

    const connectedIntegrations = [
      slack.connected && 'slack',
      github.connected && 'github',
      grafana.connected && 'grafana',
      aws.connected && 'aws',
    ].filter(Boolean);

    posthog.capture('onboarding_complete_button_clicked', {
      workspace_id: currentWorkspace.id,
      workspace_name: workspaceName,
      integrations_connected: connectedIntegrations,
      total_integrations: connectedIntegrations.length
    });

    try {
      const response = await api.workspace.update(currentWorkspace.id, {
        name: workspaceName.trim()
      });

      if (response.status === 200 && response.data) {
        dispatch(setCurrentWorkspace(response.data));

        posthog.capture('onboarding_completed_successfully', {
          workspace_id: currentWorkspace.id,
          workspace_name: response.data.name,
          github_connected: github.connected,
          grafana_connected: grafana.connected,
          slack_connected: slack.connected,
          aws_connected: aws.connected,
          total_integrations: connectedIntegrations.length
        });

        posthog.capture('funnel_stage', {
          stage: 'onboarding_completed',
          stage_number: 2,
          description: 'User completed workspace setup'
        });

        toast.success("Workspace setup complete!");
        onComplete();
      } else {
        throw new Error(response.error || 'Failed to update workspace');
      }
    } catch (error) {
      console.error('Failed to update workspace:', error);

      posthog.capture('onboarding_completion_failed', {
        workspace_id: currentWorkspace.id,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error('Failed to complete setup. Please try again.');
    }
  };

  // Show loader while fetching workspace or integration statuses
  // Wait for workspace to load first, then wait for statuses
  if (!currentWorkspace || isLoadingStatuses) {
    return <Loader message="Loading workspace and integration statuses..." />;
  }

  return (
    <main className="theme-light min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative bg-secondary bg-[length:40px_40px]">
      <BackButton />
      <LogoutButton />

      <Card className="w-full max-w-[794px] p-6 sm:p-10 lg:p-[50px] rounded-xl mt-16 sm:mt-0 bg-card border-border shadow-lg">
        <CardContent className="p-0 flex flex-col items-center">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-[448px] mb-5 sm:mb-7">
            <div className="flex flex-row items-center gap-[5px] px-2">
              <h1 className="text-xl sm:text-[24px] font-bold leading-tight tracking-tight text-foreground">
                Welcome to VibeMonitor!
              </h1>
              <span className="text-sm sm:text-[16px] leading-tight tracking-tight text-primary">
                ✨
              </span>
            </div>

            <div className="flex flex-row items-center gap-[2px] w-full h-9">
              <Input
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="w-full h-9 px-3 py-1 text-sm rounded-md"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-start gap-5 sm:gap-[22px] w-full max-w-[694px]">
            {/* Connect where work happens */}
            <div className="flex flex-col items-start gap-3 w-full">
              <div className="flex flex-row items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full text-sm bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="text-sm font-semibold leading-6 tracking-tight text-foreground">
                  Connect where work happens
                </h3>
              </div>

              <IntegrationSection
                {...slack}
                title="Slack"
                icon={
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
                    <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
                    <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
                    <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
                  </svg>
                }
                value="slack"
                defaultValue="slack"
              />
            </div>

            {/* Connect your data sources */}
            <div className="flex flex-col items-start gap-4 w-full">
              <div className="flex flex-row items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full text-sm bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="text-sm font-semibold leading-6 tracking-tight text-foreground">
                  Connect your data sources
                </h3>
              </div>

              <div className="flex flex-col items-start gap-3 w-full">
                {/* GitHub */}
                <IntegrationSection
                  {...github}
                  title="GitHub"
                  icon={<GitHubLogoIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-foreground" />}
                  value="github"
                />

                {/* Grafana */}
                <IntegrationSection
                  {...grafana}
                  title="Grafana"
                  icon={
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 32 32">
                      <path d="M27.313 11.375c-0.063-1.25-0.25-2.438-0.563-3.563-1.063-3.688-3.75-6.438-7.375-7.563-1.125-0.313-2.313-0.5-3.563-0.563-0.125 0-0.188-0.063-0.188-0.188v-0.188h-0.625v0.188c0 0.125-0.063 0.188-0.188 0.188-1.25 0.063-2.438 0.25-3.563 0.563-3.688 1.063-6.438 3.75-7.563 7.375-0.313 1.125-0.5 2.313-0.563 3.563 0 0.125-0.063 0.188-0.188 0.188h-0.188v0.625h0.188c0.125 0 0.188 0.063 0.188 0.188 0.063 1.25 0.25 2.438 0.563 3.563 1.063 3.688 3.75 6.438 7.375 7.563 1.125 0.313 2.313 0.5 3.563 0.563 0.125 0 0.188 0.063 0.188 0.188v0.188h0.625v-0.188c0-0.125 0.063-0.188 0.188-0.188 1.25-0.063 2.438-0.25 3.563-0.563 3.688-1.063 6.438-3.75 7.563-7.375 0.313-1.125 0.5-2.313 0.563-3.563 0-0.125 0.063-0.188 0.188-0.188h0.188v-0.625h-0.188c-0.125 0-0.188-0.063-0.188-0.188zM16 26.5c-5.813 0-10.5-4.688-10.5-10.5s4.688-10.5 10.5-10.5 10.5 4.688 10.5 10.5-4.688 10.5-10.5 10.5z" fill="#F46800"/>
                      <path d="M21.875 13.188c-0.125-1.063-0.5-2.063-1.063-2.938-0.875-1.375-2.188-2.375-3.75-2.813-0.75-0.188-1.5-0.313-2.313-0.313-0.063 0-0.125 0-0.188 0-0.063 0-0.125-0.063-0.125-0.125v-0.125h-0.313v0.125c0 0.063-0.063 0.125-0.125 0.125-0.063 0-0.125 0-0.188 0-0.813 0-1.563 0.125-2.313 0.313-1.563 0.438-2.875 1.438-3.75 2.813-0.563 0.875-0.938 1.875-1.063 2.938 0 0.063-0.063 0.125-0.125 0.125h-0.125v0.313h0.125c0.063 0 0.125 0.063 0.125 0.125 0.125 1.063 0.5 2.063 1.063 2.938 0.875 1.375 2.188 2.375 3.75 2.813 0.75 0.188 1.5 0.313 2.313 0.313 0.063 0 0.125 0 0.188 0 0.063 0 0.125 0.063 0.125 0.125v0.125h0.313v-0.125c0-0.063 0.063-0.125 0.125-0.125 0.063 0 0.125 0 0.188 0 0.813 0 1.563-0.125 2.313-0.313 1.563-0.438 2.875-1.438 3.75-2.813 0.563-0.875 0.938-1.875 1.063-2.938 0-0.063 0.063-0.125 0.125-0.125h0.125v-0.313h-0.125c-0.063 0-0.125-0.063-0.125-0.125zM14.5 18.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z" fill="#F46800"/>
                    </svg>
                  }
                  value="grafana"
                />

                {/* AWS CloudWatch */}
                <IntegrationSection
                  {...aws}
                  title="AWS CloudWatch"
                  icon={
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 256 153" fill="none">
                      <path d="M72.392 42.011c0 9.724-2.635 17.8-7.134 23.456-4.624 5.781-11.006 8.672-19.146 8.672-7.889 0-14.146-2.891-18.77-8.672C22.758 59.811 20 51.735 20 42.011c0-9.724 2.758-17.8 7.342-23.456 4.624-5.781 10.881-8.796 18.77-8.796 8.14 0 14.522 3.015 19.146 8.796 4.499 5.656 7.134 13.732 7.134 23.456zm-12.012 0c0-12.738-4.248-19.162-12.768-19.162-8.391 0-12.639 6.424-12.639 19.162 0 12.863 4.248 19.287 12.639 19.287 8.52 0 12.768-6.424 12.768-19.287zm36.169-16.897c1.506-2.516 3.513-4.532 6.023-5.906 2.51-1.375 5.396-2.141 8.657-2.141 5.522 0 9.77 1.75 12.768 5.281 2.998 3.407 4.498 8.422 4.498 14.92v34.94h-11.634V37.855c0-4.032-.75-6.924-2.384-8.796-1.633-1.873-4.123-2.766-7.468-2.766-4.123 0-7.343 1.375-9.728 4.157-2.384 2.782-3.512 6.673-3.512 11.706v30.052H81.137V6.551h11.412v18.563zm87.08-1.749c2.384-5.656 5.773-10.046 10.146-13.357 4.373-3.312 9.77-4.906 15.919-4.906 5.146 0 9.77 1.25 13.768 3.657 4.123 2.407 7.343 5.906 9.853 10.421 2.384-4.515 5.648-8.014 9.728-10.421 4.206-2.407 8.831-3.657 14.021-3.657 7.343 0 13.241 2.391 17.739 7.173 4.499 4.782 6.774 11.33 6.774 19.662v41.238h-11.635V33.198c0-5.031-1.13-8.797-3.387-11.08-2.258-2.407-5.396-3.532-9.394-3.532-4.498 0-8.139 1.5-11.007 4.407-2.867 2.907-4.248 7.048-4.248 12.33v37.883h-11.635V33.198c0-5.031-1.129-8.797-3.387-11.08-2.258-2.407-5.396-3.532-9.394-3.532-4.498 0-8.139 1.5-11.007 4.407-2.867 2.907-4.248 7.048-4.248 12.33v37.883h-11.635V6.551h11.034v16.814z" fill="#FF9900"/>
                      <path d="M190.645 98.522c-28.771 21.316-70.552 32.614-106.528 32.614-50.401 0-95.822-18.659-130.117-49.645-2.697-2.438-.283-5.781 2.947-3.875 37.042 21.566 82.839 34.548 130.117 34.548 31.902 0 67.002-6.611 99.279-20.343 4.872-2.063 8.95 3.218 4.302 6.701z" fill="#FF9900"/>
                      <path d="M204.043 82.961c-3.674-4.719-24.348-2.235-33.674-1.125-2.839.343-3.283-2.125-.717-3.906 16.469-11.588 43.501-8.241 46.624-4.36 3.124 3.938-.81 31.239-16.427 44.252-2.394 1.999-4.677.937-3.619-1.718 3.479-8.641 11.287-28.024 7.613-32.743z" fill="#FF9900"/>
                    </svg>
                  }
                  value="aws"
                />
                <IntegrationSection
                  {...datadog}
                  title="Datadog"
                  icon={
                     <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 256 294" fill="none">
                      <path d="M118.5 73.8l-5.1-14.5c-.2-.5-.8-.8-1.3-.6l-6.4 2.4c-.5.2-.8.8-.6 1.3l5.1 14.5c.2.5.8.8 1.3.6l6.4-2.4c.5-.2.8-.8.6-1.3z" fill="#632CA6"/>
                      <path d="M223.1 122.3l-8.4-8.4c-.4-.4-1-.4-1.4 0l-5 5c-.4.4-.4 1 0 1.4l8.4 8.4c.4.4 1 .4 1.4 0l5-5c.4-.4.4-1 0-1.4zM31.1 122.3l8.4-8.4c.4-.4 1-.4 1.4 0l5 5c.4.4.4 1 0 1.4l-8.4 8.4c-.4.4-1 .4-1.4 0l-5-5c-.4-.4-.4-1 0-1.4z" fill="#632CA6"/>
                      <path d="M127.8 0C57.3 0 0 57.3 0 127.8c0 19.6 4.4 38.1 12.3 54.7L46.5 240c1.3 3.8 4.8 6.4 8.8 6.4h145.5c4 0 7.5-2.6 8.8-6.4l34.2-57.5c7.9-16.6 12.3-35.1 12.3-54.7C256 57.3 198.7 0 127.8 0zm0 210.2c-45.6 0-82.4-36.9-82.4-82.4 0-45.6 36.9-82.4 82.4-82.4 45.6 0 82.4 36.9 82.4 82.4 0 45.5-36.8 82.4-82.4 82.4z" fill="#632CA6"/>
                      <path d="M127.8 61.6c-36.5 0-66.2 29.7-66.2 66.2 0 36.5 29.7 66.2 66.2 66.2 36.5 0 66.2-29.7 66.2-66.2 0-36.5-29.7-66.2-66.2-66.2zm31.8 96.8c-.5.5-1.2.5-1.6 0l-9.6-9.6c-.5-.5-.5-1.2 0-1.6l5.5-5.5-13.1-13.1-5.5 5.5c-.5.5-1.2.5-1.6 0l-9.6-9.6c-.5-.5-.5-1.2 0-1.6l5.5-5.5-13.1-13.1-5.5 5.5c-.5.5-1.2.5-1.6 0l-9.6-9.6c-.5-.5-.5-1.2 0-1.6l20.7-20.7c.5-.5 1.2-.5 1.6 0l9.6 9.6c.5.5.5 1.2 0 1.6l-5.5 5.5 13.1 13.1 5.5-5.5c.5-.5 1.2-.5 1.6 0l9.6 9.6c.5.5.5 1.2 0 1.6l-5.5 5.5 13.1 13.1 5.5-5.5c.5-.5 1.2-.5 1.6 0l9.6 9.6c.5.5.5 1.2 0 1.6l-20.7 20.7z" fill="#632CA6"/>
                    </svg>
                  }
                  value="datadog"
                  />
                <IntegrationSection
                  {...newrelic}
                  title="New Relic"
                  icon={
                     <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 256 233" fill="none">
                      <path d="M126.834 0L0 72.8v87.6l31.656 18.2V96.2l95.178-54.6 95.178 54.6v109.2l31.656-18.2V72.8L126.834 0z" fill="#008C99"/>
                      <path d="M126.834 64.4L64.489 100.8v72.8l31.656 18.2v-54.6l30.689-17.6 30.689 17.6v54.6l31.656-18.2v-72.8l-62.345-36.4z" fill="#1CE783"/>
                      <path d="M95.178 173.6L63.522 191.8 95.178 210v23.2L31.656 196.8v-46.4l31.656-18.2 31.866 18.2v23.2z" fill="#1D252C"/>
                    </svg>
                  }
                  value="newrelic"
                  />


              </div>
            </div>

            {/* More coming soon */}
            <div className="flex flex-col items-center gap-6 sm:gap-8 w-full">
              <div className="flex flex-col items-start gap-4 sm:gap-5 w-full max-w-[333px] px-4 sm:px-0">
                <div className="flex flex-col items-center gap-1 w-full">
                  <div className="flex flex-row items-center gap-[9px]">
                    <span className="text-xs leading-4 text-primary">✨</span>
                    <span className="text-sm sm:text-[16px] font-medium leading-5 tracking-tight text-foreground">
                      More coming soon!
                    </span>
                  </div>
                  <p className="text-xs leading-4 text-center text-muted-foreground">
                    We&apos;re expanding context for richer results—stay tuned!
                  </p>
                </div>

                <div className="flex flex-row items-center justify-center flex-wrap gap-2 w-full">
                  <Badge variant="secondary" className="h-[22px] px-[9px] py-[3px] text-xs font-medium leading-4">
                    📋 Jira
                  </Badge>
                  <Badge variant="secondary" className="h-[22px] px-[9px] py-[3px] text-xs font-medium leading-4">
                    🐳 Docker
                  </Badge>
                  <Badge variant="secondary" className="h-[22px] px-[9px] py-[3px] text-xs font-medium leading-4">
                    🔧 Jenkins
                  </Badge>
                  <Badge variant="secondary" className="h-[22px] px-[9px] py-[3px] text-xs font-medium leading-4">
                    🐕 DataDog
                  </Badge>
                </div>
              </div>

              {/* Setup Button */}
              <Button
                onClick={handleContinue}
                className="w-full h-10 rounded-md text-sm font-medium"
              >
                Complete Setup
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
