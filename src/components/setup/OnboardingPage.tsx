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
import { IntegrationSection } from "../integrations/IntegrationSection";
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
  useIntegrationStatusPoller({
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

        toast.success("Workspace setup complete! 🎉");
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

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      <BackButton />

      <Card className="w-full max-w-[794px] p-6 sm:p-10 lg:p-[50px] bg-[rgba(27,41,61,0.1)] border-[#2F4257] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-xl mt-16 sm:mt-0">
        <CardContent className="p-0 flex flex-col items-center">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-[448px] mb-5 sm:mb-7">
            <div className="flex flex-row items-center gap-[5px] px-2">
              <h1 className="text-xl sm:text-[24px] font-bold leading-tight tracking-[-0.3125px] text-[#E5E7EB]">
                Welcome to VibeMonitor!
              </h1>
              <span className="text-sm sm:text-[16px] leading-tight tracking-[-0.3125px] text-[#FFD11B]">✨</span>
            </div>

            <div className="flex flex-row items-center gap-[2px] w-full h-9">
              <Input
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="w-full h-9 px-3 py-1 text-sm bg-[rgba(27,41,61,0.3)] border-[#2F4257] rounded-md text-[#E5E7EB]"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-start gap-5 sm:gap-[22px] w-full max-w-[694px]">
            {/* Connect where work happens */}
            <div className="flex flex-col items-start gap-3 w-full">
              <div className="flex flex-row items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#6266FA] text-white text-sm">
                  1
                </div>
                <h3 className="text-sm font-semibold leading-6 tracking-[-0.3125px] text-[#E5E7EB]">
                  Connect where work happens
                </h3>
              </div>

              <IntegrationSection
                {...slack}
                title="Slack"
                icon={
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5E7EB] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                  </svg>
                }
                value="slack"
                defaultValue="slack"
              />
            </div>

            {/* Connect your data sources */}
            <div className="flex flex-col items-start gap-4 w-full">
              <div className="flex flex-row items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#6266FA] text-white text-sm">
                  2
                </div>
                <h3 className="text-sm font-semibold leading-6 tracking-[-0.3125px] text-[#E5E7EB]">
                  Connect your data sources
                </h3>
              </div>

              <div className="flex flex-col items-start gap-3 w-full">
                {/* GitHub */}
                <IntegrationSection
                  {...github}
                  title="GitHub"
                  icon={<GitHubLogoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5E7EB] flex-shrink-0" />}
                  value="github"
                />

                {/* Grafana */}
                <IntegrationSection
                  {...grafana}
                  title="Grafana"
                  icon={
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5E7EB] flex-shrink-0" viewBox="0 0 32 32" fill="currentColor">
                      <path d="M27.313 11.375c-0.063-1.25-0.25-2.438-0.563-3.563-1.063-3.688-3.75-6.438-7.375-7.563-1.125-0.313-2.313-0.5-3.563-0.563-0.125 0-0.188-0.063-0.188-0.188v-0.188h-0.625v0.188c0 0.125-0.063 0.188-0.188 0.188-1.25 0.063-2.438 0.25-3.563 0.563-3.688 1.063-6.438 3.75-7.563 7.375-0.313 1.125-0.5 2.313-0.563 3.563 0 0.125-0.063 0.188-0.188 0.188h-0.188v0.625h0.188c0.125 0 0.188 0.063 0.188 0.188 0.063 1.25 0.25 2.438 0.563 3.563 1.063 3.688 3.75 6.438 7.375 7.563 1.125 0.313 2.313 0.5 3.563 0.563 0.125 0 0.188 0.063 0.188 0.188v0.188h0.625v-0.188c0-0.125 0.063-0.188 0.188-0.188 1.25-0.063 2.438-0.25 3.563-0.563 3.688-1.063 6.438-3.75 7.563-7.375 0.313-1.125 0.5-2.313 0.563-3.563 0-0.125 0.063-0.188 0.188-0.188h0.188v-0.625h-0.188c-0.125 0-0.188-0.063-0.188-0.188zM16 26.5c-5.813 0-10.5-4.688-10.5-10.5s4.688-10.5 10.5-10.5 10.5 4.688 10.5 10.5-4.688 10.5-10.5 10.5z"/>
                      <path d="M21.875 13.188c-0.125-1.063-0.5-2.063-1.063-2.938-0.875-1.375-2.188-2.375-3.75-2.813-0.75-0.188-1.5-0.313-2.313-0.313-0.063 0-0.125 0-0.188 0-0.063 0-0.125-0.063-0.125-0.125v-0.125h-0.313v0.125c0 0.063-0.063 0.125-0.125 0.125-0.063 0-0.125 0-0.188 0-0.813 0-1.563 0.125-2.313 0.313-1.563 0.438-2.875 1.438-3.75 2.813-0.563 0.875-0.938 1.875-1.063 2.938 0 0.063-0.063 0.125-0.125 0.125h-0.125v0.313h0.125c0.063 0 0.125 0.063 0.125 0.125 0.125 1.063 0.5 2.063 1.063 2.938 0.875 1.375 2.188 2.375 3.75 2.813 0.75 0.188 1.5 0.313 2.313 0.313 0.063 0 0.125 0 0.188 0 0.063 0 0.125 0.063 0.125 0.125v0.125h0.313v-0.125c0-0.063 0.063-0.125 0.125-0.125 0.063 0 0.125 0 0.188 0 0.813 0 1.563-0.125 2.313-0.313 1.563-0.438 2.875-1.438 3.75-2.813 0.563-0.875 0.938-1.875 1.063-2.938 0-0.063 0.063-0.125 0.125-0.125h0.125v-0.313h-0.125c-0.063 0-0.125-0.063-0.125-0.125zM14.5 18.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"/>
                    </svg>
                  }
                  value="grafana"
                />

                {/* AWS CloudWatch */}
                <IntegrationSection
                  {...aws}
                  title="AWS CloudWatch"
                  icon={
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5E7EB] flex-shrink-0" viewBox="0 0 256 256" fill="currentColor">
                      <path d="M208 40H48a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16zm-72 152h-16v-16h16zm0-32h-16v-64h16zm0-80h-16V64h16zm40 112h-16v-16h16zm0-32h-16v-64h16zm0-80h-16V64h16zM96 192H80v-16h16zm0-32H80v-64h16zm0-80H80V64h16z"/>
                    </svg>
                  }
                  value="aws"
                />
                <IntegrationSection
                  {...datadog}
                  title="Datadog"
                  icon={
                     <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5E7EB] flex-shrink-0" viewBox="0 0 256 256" fill="currentColor">
                      <path d="M208 40H48a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16zm-72 152h-16v-16h16zm0-32h-16v-64h16zm0-80h-16V64h16zm40 112h-16v-16h16zm0-32h-16v-64h16zm0-80h-16V64h16zM96 192H80v-16h16zm0-32H80v-64h16zm0-80H80V64h16z"/>
                    </svg>
                  }
                  value="datadog"
                  />
                <IntegrationSection
                  {...newrelic}
                  title="New Relic"
                  icon={
                     <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5E7EB] flex-shrink-0" viewBox="0 0 256 256" fill="currentColor">
                      <path d="M208 40H48a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16zm-72 152h-16v-16h16zm0-32h-16v-64h16zm0-80h-16V64h16zm40 112h-16v-16h16zm0-32h-16v-64h16zm0-80h-16V64h16zM96 192H80v-16h16zm0-32H80v-64h16zm0-80H80V64h16z"/>
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
                    <span className="text-xs leading-4 text-[#9AA3B0]">✨</span>
                    <span className="text-sm sm:text-[16px] font-medium leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                      More coming soon!
                    </span>
                  </div>
                  <p className="text-xs leading-4 text-[#9AA3B0] text-center">
                    We&apos;re expanding context for richer results—stay tuned!
                  </p>
                </div>

                <div className="flex flex-row items-center justify-center flex-wrap gap-2 w-full">
                  <Badge className="h-[22px] px-[9px] py-[3px] bg-[rgba(47,66,87,0.5)] border-[rgba(47,66,87,0.5)] text-[#9AA3B0] text-xs font-medium leading-4 hover:bg-[rgba(47,66,87,0.5)]">
                    📋 Jira
                  </Badge>
                  <Badge className="h-[22px] px-[9px] py-[3px] bg-[rgba(47,66,87,0.5)] border-[rgba(47,66,87,0.5)] text-[#9AA3B0] text-xs font-medium leading-4 hover:bg-[rgba(47,66,87,0.5)]">
                    🐳 Docker
                  </Badge>
                  <Badge className="h-[22px] px-[9px] py-[3px] bg-[rgba(47,66,87,0.5)] border-[rgba(47,66,87,0.5)] text-[#9AA3B0] text-xs font-medium leading-4 hover:bg-[rgba(47,66,87,0.5)]">
                    🔧 Jenkins
                  </Badge>
                  <Badge className="h-[22px] px-[9px] py-[3px] bg-[rgba(47,66,87,0.5)] border-[rgba(47,66,87,0.5)] text-[#9AA3B0] text-xs font-medium leading-4 hover:bg-[rgba(47,66,87,0.5)]">
                    🐕 DataDog
                  </Badge>
                </div>
              </div>

              {/* Setup Button */}
              <Button
                onClick={handleContinue}
                className="w-full h-10 bg-[#3F5ECC] hover:bg-[#3F5ECC]/90 text-white rounded-md text-sm font-medium"
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
