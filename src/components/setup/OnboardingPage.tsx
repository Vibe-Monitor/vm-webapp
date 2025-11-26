"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { CheckCircle2, Circle, AlertTriangle } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { apiService } from "@/services/apiService";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { setCurrentWorkspace } from "@/lib/features/workspaceSlice";
import { checkGitHubStatusWithService } from "@/services/githubStatusService";
import { BackButton } from "../ui/BackButton";

interface OnboardingPageProps {
  onComplete: () => void;
  userName?: string;
}

export function OnboardingPage({ onComplete, userName = "Komal Bains" }: OnboardingPageProps) {
  const searchParams = useSearchParams();
  const [workspaceName, setWorkspaceName] = useState("");
  const [grafanaUrl, setGrafanaUrl] = useState("");
  const [grafanaToken, setGrafanaToken] = useState("");
  const [slackInstalling, setSlackInstalling] = useState(false);
  const [githubInstalling, setGithubInstalling] = useState(false);
  const [integrations, setIntegrations] = useState({
    github: false,
    grafana: false,
    slack: false,
    aws: false,
  });
  const [githubStatus, setGithubStatus] = useState<'connected' | 'suspended' | 'not-connected' | 'error'>('not-connected');
  const [githubUsername, setGithubUsername] = useState<string>('');
  const [slackTeamName, setSlackTeamName] = useState<string>('');
  const [awsRoleArn, setAwsRoleArn] = useState<string>('');
  const [awsExternalId, setAwsExternalId] = useState<string>('');
  const [awsRegion, setAwsRegion] = useState<string>('');
  const [awsConnecting, setAwsConnecting] = useState(false);

  const dispatch = useAppDispatch();
  const { currentWorkspace } = useAppSelector((state) => state.workspace);

  // Fetch workspace name on mount
  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const response = await apiService.getWorkspaces();
        if (response.data && response.data.length > 0) {
          // Get the first workspace (user's default workspace)
          const firstWorkspace = response.data[0];
          setWorkspaceName(firstWorkspace.name);
          // Set the current workspace in Redux state
          dispatch(setCurrentWorkspace(firstWorkspace));
        } else {
          // Fallback if no workspace found
          setWorkspaceName(`${userName}'s Workspace`);
        }
      } catch (error) {
        console.error('Failed to fetch workspace:', error);
        setWorkspaceName(`${userName}'s Workspace`);
      }
    };

    fetchWorkspace();
  }, [userName, dispatch]);

  // Check GitHub and Grafana connection status on mount
  useEffect(() => {
    const checkGithubStatus = async () => {
      if (currentWorkspace?.id) {
        try {
          const result = await checkGitHubStatusWithService(currentWorkspace.id);
          setGithubStatus(result.status);

          if (result.data?.connected) {
            setIntegrations((prev) => ({ ...prev, github: true }));

            // Store GitHub username if available
            if (result.data.integration?.github_username) {
              setGithubUsername(result.data.integration.github_username);
            }
          }
        } catch (error) {
          console.error('Failed to check GitHub status:', error);
          setGithubStatus('error');
        }
      }
    };

    const checkGrafanaStatus = async () => {
      if (currentWorkspace?.id) {
        try {
          const response = await apiService.getGrafanaStatus(currentWorkspace.id);
          if (response.data?.connected) {
            setIntegrations((prev) => ({ ...prev, grafana: true }));
            // Optionally set the Grafana URL to display
            if (response.data.grafana_url) {
              setGrafanaUrl(response.data.grafana_url);
            }
          } else {
            // If not connected, ensure state reflects this
            setIntegrations((prev) => ({ ...prev, grafana: false }));
          }
        } catch (error) {
          console.error('Failed to check Grafana status:', error);
        }
      }
    };

    const checkSlackStatus = async () => {
      if (currentWorkspace?.id) {
        try {
          const response = await apiService.getSlackStatus(currentWorkspace.id);
          if (response.data?.connected) {
            setIntegrations((prev) => ({ ...prev, slack: true }));
            // Store Slack team name if available
            if (response.data.data?.team_name) {
              setSlackTeamName(response.data.data.team_name);
            }
          }
        } catch (error) {
          console.error('Failed to check Slack status:', error);
        }
      }
    };

    const checkAwsStatus = async () => {
      if (currentWorkspace?.id) {
        try {
          const response = await apiService.getAwsStatus(currentWorkspace.id);
          console.log('AWS status response:', response);

          // Check if AWS is connected - handle both 200 with data or 404 for not connected
          if (response.status === 200 && response.data) {
            setIntegrations((prev) => ({ ...prev, aws: true }));
            // Store AWS details if available
            if (response.data.role_arn) {
              setAwsRoleArn(response.data.role_arn);
            }
            if (response.data.region || response.data.aws_region) {
              setAwsRegion(response.data.region || response.data.aws_region);
            }
          } else {
            // 404 or no data means not connected
            setIntegrations((prev) => ({ ...prev, aws: false }));
          }
        } catch (error) {
          console.error('Failed to check AWS status:', error);
          // On error, assume not connected
          setIntegrations((prev) => ({ ...prev, aws: false }));
        }
      }
    };

    // Check status immediately on mount
    checkGithubStatus();
    checkGrafanaStatus();
    checkSlackStatus();
    checkAwsStatus();

    // Set up polling to check all integration statuses periodically
    const interval = setInterval(() => {
      checkGithubStatus();
      checkGrafanaStatus();
      checkSlackStatus();
      checkAwsStatus();
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [currentWorkspace?.id]);

  // Listen for URL parameter changes when returning from OAuth
  useEffect(() => {
    const githubConnected = searchParams.get('github');
    const slackConnected = searchParams.get('slack');

    // If we just returned from GitHub or Slack OAuth, immediately update UI
    if (githubConnected === 'connected' || slackConnected === 'connected') {
      // Optimistically update UI immediately - don't wait for workspace or API
      if (githubConnected === 'connected') {
        setIntegrations((prev) => ({ ...prev, github: true }));
        setGithubStatus('connected');
        toast.success('GitHub connected successfully!');
      }

      if (slackConnected === 'connected') {
        setIntegrations((prev) => ({ ...prev, slack: true }));
        toast.success('Slack connected successfully!');
      }

      // Remove the query parameter to avoid re-processing
      if (typeof window !== 'undefined') {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }

      // Then verify with API call once workspace is available
      if (currentWorkspace?.id) {
        const recheckStatuses = async () => {
          try {
            // Verify GitHub status
            if (githubConnected === 'connected') {
              const result = await checkGitHubStatusWithService(currentWorkspace.id);
              setGithubStatus(result.status);
              if (result.data?.connected) {
                setIntegrations((prev) => ({ ...prev, github: true }));
                if (result.data.integration?.github_username) {
                  setGithubUsername(result.data.integration.github_username);
                }
              } else {
                // Revert if not actually connected
                setIntegrations((prev) => ({ ...prev, github: false }));
                setGithubStatus('not-connected');
              }
            }

            // Verify Slack status
            if (slackConnected === 'connected') {
              const slackResponse = await apiService.getSlackStatus(currentWorkspace.id);
              if (slackResponse.data?.connected) {
                setIntegrations((prev) => ({ ...prev, slack: true }));
                if (slackResponse.data.data?.team_name) {
                  setSlackTeamName(slackResponse.data.data.team_name);
                }
              } else {
                // Revert if not actually connected
                setIntegrations((prev) => ({ ...prev, slack: false }));
              }
            }
          } catch (error) {
            console.error('Failed to re-check integration status:', error);
          }
        };

        recheckStatuses();
      }
    }
  }, [searchParams, currentWorkspace?.id]);

  const handleConnectGitHub = async () => {
    if (!currentWorkspace?.id) {
      toast.error("Please select a workspace first");
      return;
    }

    posthog.capture('integration_github_connect_clicked', {
      workspace_id: currentWorkspace.id,
      workspace_name: currentWorkspace.name
    });

    setGithubInstalling(true);

    try {
      const response = await apiService.getGithubInstallUrl(currentWorkspace.id);

      if (!response.data?.install_url) {
        throw new Error('Failed to get GitHub install URL');
      }

      posthog.capture('integration_github_oauth_redirect', {
        workspace_id: currentWorkspace.id,
        install_url_obtained: true
      });

      window.location.href = response.data.install_url;
    } catch (error) {
      console.error('GitHub installation failed:', error);

      posthog.capture('integration_github_connect_failed', {
        workspace_id: currentWorkspace.id,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error("Failed to connect GitHub. Please try again.");
      setGithubInstalling(false);
    }
  };

  const handleConnectGrafana = async () => {
    if (!currentWorkspace?.id) {
      toast.error("Please select a workspace first");
      return;
    }

    if (!grafanaUrl.trim()) {
      toast.error('Please enter your Grafana URL');
      return;
    }

    if (!grafanaToken.trim()) {
      toast.error('Please enter your API token');
      return;
    }

    let formattedUrl = grafanaUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    try {
      new URL(formattedUrl);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    posthog.capture('integration_grafana_connect_clicked', {
      workspace_id: currentWorkspace.id,
      has_url: true,
      has_token: true
    });

    try {
      const response = await apiService.connectGrafana({
        workspace_id: currentWorkspace.id,
        grafana_url: formattedUrl,
        api_token: grafanaToken.trim(),
      });

      if (response.status === 200 && response.data) {
        setIntegrations((prev) => ({ ...prev, grafana: true }));
        if (response.data.grafana_url) {
          setGrafanaUrl(response.data.grafana_url);
        }
        setGrafanaToken('');

        posthog.capture('integration_grafana_connected_successfully', {
          workspace_id: currentWorkspace.id,
          grafana_url: response.data.grafana_url
        });

        toast.success('Grafana connected successfully! 🚀');
      } else {
        throw new Error(response.error || 'Failed to connect Grafana');
      }
    } catch (error) {
      console.error('Grafana connection failed:', error);

      posthog.capture('integration_grafana_connect_failed', {
        workspace_id: currentWorkspace.id,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error('Failed to connect Grafana. Please check your credentials and try again.');
    }
  };

  const handleDisconnectGrafana = async () => {
    if (!currentWorkspace?.id) {
      toast.error("Please select a workspace first");
      return;
    }

    posthog.capture('integration_grafana_disconnect_clicked', {
      workspace_id: currentWorkspace.id
    });

    try {
      const response = await apiService.disconnectGrafana(currentWorkspace.id);

      if (response.status === 200) {
        setIntegrations((prev) => ({ ...prev, grafana: false }));
        setGrafanaUrl('');
        setGrafanaToken('');

        posthog.capture('integration_grafana_disconnected_successfully', {
          workspace_id: currentWorkspace.id
        });

        toast.success('Grafana disconnected successfully');
      } else {
        throw new Error(response.error || 'Failed to disconnect Grafana');
      }
    } catch (error) {
      console.error('Grafana disconnection failed:', error);

      posthog.capture('integration_grafana_disconnect_failed', {
        workspace_id: currentWorkspace.id,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error('Failed to disconnect Grafana. Please try again.');
    }
  };

  const handleDisconnectGithub = async () => {
    if (!currentWorkspace?.id) {
      toast.error("Please select a workspace first");
      return;
    }

    posthog.capture('integration_github_disconnect_clicked', {
      workspace_id: currentWorkspace.id
    });

    try {
      const response = await apiService.disconnectGithub(currentWorkspace.id);

      if (response.status === 200) {
        setIntegrations((prev) => ({ ...prev, github: false }));
        setGithubStatus('not-connected');
        setGithubUsername('');

        posthog.capture('integration_github_disconnected_successfully', {
          workspace_id: currentWorkspace.id
        });

        toast.success('GitHub disconnected successfully');
      } else {
        throw new Error(response.error || 'Failed to disconnect GitHub');
      }
    } catch (error) {
      console.error('GitHub disconnection failed:', error);

      posthog.capture('integration_github_disconnect_failed', {
        workspace_id: currentWorkspace.id,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error('Failed to disconnect GitHub. Please try again.');
    }
  };

  const handleConnectSlack = async () => {
    if (!currentWorkspace?.id) {
      toast.error("Please select a workspace first");
      return;
    }

    posthog.capture('integration_slack_connect_clicked', {
      workspace_id: currentWorkspace.id,
      workspace_name: currentWorkspace.name
    });

    setSlackInstalling(true);

    try {
      const response = await apiService.getSlackInstallUrl(currentWorkspace.id);

      if (response.status === 200 && response.data?.oauth_url) {
        posthog.capture('integration_slack_oauth_redirect', {
          workspace_id: currentWorkspace.id,
          oauth_url_obtained: true
        });

        window.location.href = response.data.oauth_url;
      } else {
        throw new Error(response.error || 'Failed to get Slack OAuth URL');
      }
    } catch (error) {
      console.error('Slack installation failed:', error);

      posthog.capture('integration_slack_connect_failed', {
        workspace_id: currentWorkspace.id,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error("Failed to connect Slack. Please try again.");
      setSlackInstalling(false);
    }
  };

  const handleDisconnectSlack = async () => {
    if (!currentWorkspace?.id) {
      toast.error("Please select a workspace first");
      return;
    }

    posthog.capture('integration_slack_disconnect_clicked', {
      workspace_id: currentWorkspace.id
    });

    try {
      const response = await apiService.disconnectSlack(currentWorkspace.id);

      if (response.status === 200) {
        setIntegrations((prev) => ({ ...prev, slack: false }));
        setSlackTeamName('');

        posthog.capture('integration_slack_disconnected_successfully', {
          workspace_id: currentWorkspace.id
        });

        toast.success('Slack disconnected successfully');
      } else {
        throw new Error(response.error || 'Failed to disconnect Slack');
      }
    } catch (error) {
      console.error('Slack disconnection failed:', error);

      posthog.capture('integration_slack_disconnect_failed', {
        workspace_id: currentWorkspace.id,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error('Failed to disconnect Slack. Please try again.');
    }
  };

  const handleConnectAws = async () => {
    if (!currentWorkspace?.id) {
      toast.error("Please select a workspace first");
      return;
    }

    if (!awsRoleArn.trim()) {
      toast.error('Please enter your AWS Role ARN');
      return;
    }

    if (!awsExternalId.trim()) {
      toast.error('Please enter your External ID');
      return;
    }

    if (!awsRoleArn.trim().startsWith('arn:aws:iam::')) {
      toast.error('Please enter a valid AWS Role ARN (should start with arn:aws:iam::)');
      return;
    }

    const roleNameMatch = awsRoleArn.match(/role\/(.*?)$/);
    if (!roleNameMatch || !roleNameMatch[1].toLowerCase().startsWith('vibemonitor-')) {
      toast.error('Role name must start with "VibeMonitor-" or "Vibemonitor-"');
      return;
    }

    posthog.capture('integration_aws_connect_clicked', {
      workspace_id: currentWorkspace.id,
      has_role_arn: true,
      has_external_id: true,
      region: awsRegion.trim() || 'us-east-1'
    });

    setAwsConnecting(true);

    try {
      const response = await apiService.connectAws({
        workspace_id: currentWorkspace.id,
        role_arn: awsRoleArn.trim(),
        external_id: awsExternalId.trim(),
        region: awsRegion.trim() || 'us-east-1',
      });

      console.log('AWS connection response:', response);

      if (response.status >= 200 && response.status < 300) {
        setIntegrations((prev) => ({ ...prev, aws: true }));

        const statusCheck = await apiService.getAwsStatus(currentWorkspace.id);
        if (statusCheck.data?.role_arn) {
          setAwsRoleArn(statusCheck.data.role_arn);
        }
        if (statusCheck.data?.region) {
          setAwsRegion(statusCheck.data.region);
        }

        posthog.capture('integration_aws_connected_successfully', {
          workspace_id: currentWorkspace.id,
          region: statusCheck.data?.region || awsRegion.trim() || 'us-east-1'
        });

        toast.success('AWS CloudWatch connected successfully!');
      } else {
        console.error('AWS connection failed with status:', response.status);
        throw new Error(response.error || 'Failed to connect AWS CloudWatch');
      }
    } catch (error) {
      console.error('AWS CloudWatch connection failed:', error);

      posthog.capture('integration_aws_connect_failed', {
        workspace_id: currentWorkspace.id,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error('Failed to connect AWS CloudWatch. Please check your credentials and try again.');
    } finally {
      setAwsConnecting(false);
    }
  };

  const handleDisconnectAws = async () => {
    if (!currentWorkspace?.id) {
      toast.error("Please select a workspace first");
      return;
    }

    posthog.capture('integration_aws_disconnect_clicked', {
      workspace_id: currentWorkspace.id
    });

    try {
      const response = await apiService.disconnectAws(currentWorkspace.id);

      if (response.status === 200) {
        setIntegrations((prev) => ({ ...prev, aws: false }));
        setAwsRoleArn('');
        setAwsExternalId('');
        setAwsRegion('');

        posthog.capture('integration_aws_disconnected_successfully', {
          workspace_id: currentWorkspace.id
        });

        toast.success('AWS CloudWatch disconnected successfully');
      } else {
        throw new Error(response.error || 'Failed to disconnect AWS CloudWatch');
      }
    } catch (error) {
      console.error('AWS CloudWatch disconnection failed:', error);

      posthog.capture('integration_aws_disconnect_failed', {
        workspace_id: currentWorkspace.id,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error('Failed to disconnect AWS CloudWatch. Please try again.');
    }
  };

  const handleContinue = async () => {
    if (!currentWorkspace?.id) {
      toast.error("Please select a workspace first");
      return;
    }

    if (!workspaceName.trim()) {
      toast.error("Please enter a workspace name");
      return;
    }

    const connectedIntegrations = Object.entries(integrations)
      .filter(([_, connected]) => connected)
      .map(([type, _]) => type);

    posthog.capture('onboarding_complete_button_clicked', {
      workspace_id: currentWorkspace.id,
      workspace_name: workspaceName,
      integrations_connected: connectedIntegrations,
      total_integrations: connectedIntegrations.length
    });

    try {
      const response = await apiService.updateWorkspace(currentWorkspace.id, {
        name: workspaceName.trim()
      });

      if (response.status === 200 && response.data) {
        dispatch(setCurrentWorkspace(response.data));

        posthog.capture('onboarding_completed_successfully', {
          workspace_id: currentWorkspace.id,
          workspace_name: response.data.name,
          github_connected: integrations.github,
          grafana_connected: integrations.grafana,
          slack_connected: integrations.slack,
          aws_connected: integrations.aws,
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
      {/* Back Button */}
      <BackButton />

      <Card className="w-full max-w-[794px] p-6 sm:p-10 lg:p-[50px] bg-[rgba(27,41,61,0.1)] border-[#2F4257] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-xl mt-16 sm:mt-0">
        <CardContent className="p-0 flex flex-col items-center">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-[448px] mb-5 sm:mb-7">
            {/* Title */}
            <div className="flex flex-row items-center gap-[5px] px-2">
              <h1 className="text-xl sm:text-[24px] font-bold leading-tight tracking-[-0.3125px] text-[#E5E7EB]">
                Welcome to VibeMonitor!
              </h1>
              <span className="text-sm sm:text-[16px] leading-tight tracking-[-0.3125px] text-[#FFD11B]">✨</span>
            </div>

            {/* Workspace Input */}
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
              
              <Accordion type="single" collapsible defaultValue="slack" className="w-full">
                <AccordionItem value="slack" className="border-none">
                  <div className="bg-[rgba(47,66,87,0.2)] border-t border-r border-l border-[rgba(47,66,87,0.5)] rounded-lg">
                    <AccordionTrigger className="p-4 sm:p-6 hover:no-underline [&[data-state=open]]:pb-0">
                      <div className="flex flex-row justify-between items-center w-full gap-2">
                        <div className="flex flex-row items-center gap-3 sm:gap-4 min-w-0">
                          {integrations.slack ? (
                            <CheckCircle2 className="w-5 h-5 text-[#FFD11B] flex-shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-[rgba(154,163,176,0.4)] flex-shrink-0" />
                          )}
                          <div className="flex flex-row items-center gap-2 sm:gap-3 min-w-0">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5E7EB] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                            </svg>
                            <span className="text-sm sm:text-[16px] font-semibold leading-5 tracking-[-0.150391px] text-[#E5E7EB] truncate">
                              Slack
                            </span>
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm leading-5 tracking-[-0.150391px] text-[#FFD11B] flex-shrink-0">
                          {'> 2 min'}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 sm:px-16 lg:px-[92px] pb-6 pt-2">
                      <div className="flex flex-col items-start gap-4 sm:gap-[22px]">
                        <p className="text-xs sm:text-sm leading-5 tracking-[-0.150391px] text-[#9AA3B0]">
                          Access channels for bot-delivered vibes—team sync made simple.
                        </p>

                        {/* Connected Status */}
                        {integrations.slack && slackTeamName && (
                          <div className="w-full p-3 rounded-md border border-emerald-500/30 bg-emerald-500/10">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                              <span className="text-sm text-emerald-400">
                                Connected to <strong>{slackTeamName}</strong>
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Show Connect or Remove button based on integration status */}
                        {integrations.slack ? (
                          <Button
                            onClick={handleDisconnectSlack}
                            variant="outline"
                            className="h-10 px-5 rounded-md text-sm font-medium leading-5 tracking-[-0.150391px] transition-all duration-300 bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50"
                          >
                            Remove Integration
                          </Button>
                        ) : (
                          <Button
                            onClick={handleConnectSlack}
                            disabled={slackInstalling}
                            className="h-10 px-5 rounded-md text-sm font-medium leading-5 tracking-[-0.150391px] transition-all duration-300 bg-[#3F5ECC] hover:bg-[#3F5ECC]/90 text-white border border-[#3F5ECC]/20 hover:border-[#3F5ECC]"
                          >
                            {slackInstalling ? (
                              <span className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Connecting...
                              </span>
                            ) : (
                              <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                                </svg>
                                Connect Slack
                              </span>
                            )}
                          </Button>
                        )}
                      </div>
                    </AccordionContent>
                  </div>
                </AccordionItem>
              </Accordion>
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
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="github" className="border-none">
                    <div className="bg-[rgba(47,66,87,0.2)] border border-[rgba(47,66,87,0.5)] rounded-lg">
                      <AccordionTrigger className="p-4 sm:p-6 hover:no-underline [&[data-state=open]]:pb-0">
                        <div className="flex flex-row justify-between items-center w-full gap-2">
                          <div className="flex flex-row items-center gap-3 sm:gap-4 min-w-0">
                            {integrations.github ? (
                              <CheckCircle2 className="w-5 h-5 text-[#FFD11B] flex-shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-[rgba(154,163,176,0.4)] flex-shrink-0" />
                            )}
                            <div className="flex flex-row items-center gap-2 sm:gap-[10px] min-w-0">
                              <GitHubLogoIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5E7EB] flex-shrink-0" />
                              <span className="text-sm sm:text-[16px] font-semibold leading-5 tracking-[-0.150391px] text-[#E5E7EB] truncate">
                                GitHub
                              </span>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm leading-5 tracking-[-0.150391px] text-[#FFD11B] flex-shrink-0">
                            {'≥ 2 min'}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 sm:px-16 lg:px-[90px] pb-6 pt-2">
                        <div className="flex flex-col items-start gap-4 sm:gap-[22px]">
                          <p className="text-xs sm:text-sm leading-5 tracking-[-0.150391px] text-[#9AA3B0]">
                            Automatically monitor commits, issues, and PRs in real time to catch issues early and accelerate development with actionable insights.
                          </p>

                          {/* Suspended Warning */}
                          {githubStatus === 'suspended' && (
                            <div className="w-full p-3 rounded-md border border-yellow-500/30 bg-yellow-500/10">
                              <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                    <span className="text-sm font-semibold text-yellow-400">GitHub Integration Suspended</span>
                                  </div>
                                </div>
                                <p className="text-xs leading-5 text-[#9AA3B0]">
                                  Your GitHub integration (@{githubUsername}) is currently suspended. To restore functionality, please visit GitHub to unsuspend the installation manually.
                                </p>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => window.open('https://github.com/settings/installations', '_blank')}
                                  className="w-fit h-8 px-3 text-xs bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/50"
                                >
                                  <GitHubLogoIcon className="h-3 w-3 mr-1.5" />
                                  Unsuspend on GitHub
                                </Button>
                              </div>
                            </div>
                          )}

                          {/* Connected Status */}
                          {githubStatus === 'connected' && githubUsername && (
                            <div className="w-full p-3 rounded-md border border-emerald-500/30 bg-emerald-500/10">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                <span className="text-sm text-emerald-400">
                                  Connected as <strong>@{githubUsername}</strong>
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Show Connect or Remove button based on integration status */}
                          {integrations.github ? (
                            <Button
                              onClick={handleDisconnectGithub}
                              variant="outline"
                              className="h-10 px-5 rounded-md text-sm font-medium leading-5 tracking-[-0.150391px] transition-all duration-300 bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50"
                            >
                              Remove Integration
                            </Button>
                          ) : (
                            <Button
                              onClick={handleConnectGitHub}
                              disabled={githubInstalling}
                              className="h-10 px-5 rounded-md text-sm font-medium leading-5 tracking-[-0.150391px] transition-all duration-300 bg-[#3F5ECC] hover:bg-[#3F5ECC]/90 text-white border border-[#3F5ECC]/20 hover:border-[#3F5ECC]"
                            >
                              {githubInstalling ? (
                                <span className="flex items-center gap-2">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                  Connecting...
                                </span>
                              ) : (
                                <span className="flex items-center gap-2">
                                  <GitHubLogoIcon className="w-4 h-4" />
                                  Connect GitHub
                                </span>
                              )}
                            </Button>
                          )}
                        </div>
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                </Accordion>

                {/* Grafana */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="grafana" className="border-none">
                    <div className="bg-[rgba(47,66,87,0.2)] border border-[rgba(47,66,87,0.5)] rounded-lg">
                      <AccordionTrigger className="p-4 sm:p-6 hover:no-underline [&[data-state=open]]:pb-0">
                        <div className="flex flex-row justify-between items-center w-full gap-2">
                          <div className="flex flex-row items-center gap-3 sm:gap-4 min-w-0">
                            {integrations.grafana ? (
                              <CheckCircle2 className="w-5 h-5 text-[#FFD11B] flex-shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-[rgba(154,163,176,0.4)] flex-shrink-0" />
                            )}
                            <div className="flex flex-row items-center gap-2 sm:gap-3 min-w-0">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5E7EB] flex-shrink-0" viewBox="0 0 32 32" fill="currentColor">
                                <path d="M27.313 11.375c-0.063-1.25-0.25-2.438-0.563-3.563-1.063-3.688-3.75-6.438-7.375-7.563-1.125-0.313-2.313-0.5-3.563-0.563-0.125 0-0.188-0.063-0.188-0.188v-0.188h-0.625v0.188c0 0.125-0.063 0.188-0.188 0.188-1.25 0.063-2.438 0.25-3.563 0.563-3.688 1.063-6.438 3.75-7.563 7.375-0.313 1.125-0.5 2.313-0.563 3.563 0 0.125-0.063 0.188-0.188 0.188h-0.188v0.625h0.188c0.125 0 0.188 0.063 0.188 0.188 0.063 1.25 0.25 2.438 0.563 3.563 1.063 3.688 3.75 6.438 7.375 7.563 1.125 0.313 2.313 0.5 3.563 0.563 0.125 0 0.188 0.063 0.188 0.188v0.188h0.625v-0.188c0-0.125 0.063-0.188 0.188-0.188 1.25-0.063 2.438-0.25 3.563-0.563 3.688-1.063 6.438-3.75 7.563-7.375 0.313-1.125 0.5-2.313 0.563-3.563 0-0.125 0.063-0.188 0.188-0.188h0.188v-0.625h-0.188c-0.125 0-0.188-0.063-0.188-0.188zM16 26.5c-5.813 0-10.5-4.688-10.5-10.5s4.688-10.5 10.5-10.5 10.5 4.688 10.5 10.5-4.688 10.5-10.5 10.5z"/>
                                <path d="M21.875 13.188c-0.125-1.063-0.5-2.063-1.063-2.938-0.875-1.375-2.188-2.375-3.75-2.813-0.75-0.188-1.5-0.313-2.313-0.313-0.063 0-0.125 0-0.188 0-0.063 0-0.125-0.063-0.125-0.125v-0.125h-0.313v0.125c0 0.063-0.063 0.125-0.125 0.125-0.063 0-0.125 0-0.188 0-0.813 0-1.563 0.125-2.313 0.313-1.563 0.438-2.875 1.438-3.75 2.813-0.563 0.875-0.938 1.875-1.063 2.938 0 0.063-0.063 0.125-0.125 0.125h-0.125v0.313h0.125c0.063 0 0.125 0.063 0.125 0.125 0.125 1.063 0.5 2.063 1.063 2.938 0.875 1.375 2.188 2.375 3.75 2.813 0.75 0.188 1.5 0.313 2.313 0.313 0.063 0 0.125 0 0.188 0 0.063 0 0.125 0.063 0.125 0.125v0.125h0.313v-0.125c0-0.063 0.063-0.125 0.125-0.125 0.063 0 0.125 0 0.188 0 0.813 0 1.563-0.125 2.313-0.313 1.563-0.438 2.875-1.438 3.75-2.813 0.563-0.875 0.938-1.875 1.063-2.938 0-0.063 0.063-0.125 0.125-0.125h0.125v-0.313h-0.125c-0.063 0-0.125-0.063-0.125-0.125zM14.5 18.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"/>
                              </svg>
                              <span className="text-sm sm:text-[16px] font-semibold leading-5 tracking-[-0.150391px] text-[#E5E7EB] truncate">
                                Grafana
                              </span>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm leading-5 tracking-[-0.150391px] text-[#FFD11B] flex-shrink-0">
                            {'> 5 min'}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 sm:px-16 lg:px-[92px] pb-6 pt-2">
                        <div className="flex flex-col items-start gap-4 sm:gap-[22px]">
                          {/* Description */}
                          <p className="text-xs sm:text-sm leading-5 tracking-[-0.150391px] text-[#9AA3B0]">
                            Pull real-time dashboard metrics and alerts, giving your team instant visibility into performance trends without manual exports.
                          </p>

                          {/* Show connected URL or input fields */}
                          {integrations.grafana ? (
                            <>
                              {/* Connected Status */}
                              <div className="w-full p-3 rounded-md border border-emerald-500/30 bg-emerald-500/10">
                                <div className="flex flex-col gap-2">
                                  <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                    <span className="text-sm font-semibold text-emerald-400">Grafana Connected</span>
                                  </div>
                                  {grafanaUrl && (
                                    <div className="flex flex-col gap-1">
                                      <span className="text-xs text-[#9AA3B0]">Connected to:</span>
                                      <span className="text-sm text-[#E5E7EB] font-mono break-all">{grafanaUrl}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Remove Integration Button */}
                              <Button
                                onClick={handleDisconnectGrafana}
                                variant="outline"
                                className="h-9 px-4 rounded-md text-sm font-medium leading-5 tracking-[-0.150391px] bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50"
                              >
                                Remove Integration
                              </Button>
                            </>
                          ) : (
                            <>
                              {/* Grafana URL Input */}
                              <div className="flex flex-col items-start gap-2 w-full">
                                <label className="text-sm leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                                  Grafana URL
                                </label>
                                <Input
                                  value={grafanaUrl}
                                  onChange={(e) => setGrafanaUrl(e.target.value)}
                                  placeholder="https://your-grafana-instance.com"
                                  className="w-full h-9 px-3 py-1 text-sm bg-[rgba(27,41,61,0.3)] border-[#2F4257] rounded-md text-[#E5E7EB] placeholder:text-[#9AA3B0]"
                                />
                              </div>

                              {/* Token Input */}
                              <div className="flex flex-col items-start gap-2 w-full">
                                <label className="text-sm leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                                  Enter token
                                </label>
                                <Input
                                  type="password"
                                  value={grafanaToken}
                                  onChange={(e) => setGrafanaToken(e.target.value)}
                                  placeholder="Token key"
                                  className="w-full h-9 px-3 py-1 text-sm bg-[rgba(27,41,61,0.3)] border-[#2F4257] rounded-md text-[#E5E7EB] placeholder:text-[#9AA3B0]"
                                />
                              </div>

                              <Button
                                onClick={handleConnectGrafana}
                                className="h-10 px-5 rounded-md text-sm font-medium leading-5 tracking-[-0.150391px] transition-all duration-300 bg-[#3F5ECC] hover:bg-[#3F5ECC]/90 text-white border border-[#3F5ECC]/20 hover:border-[#3F5ECC]"
                              >
                                <span className="flex items-center gap-2">
                                  <svg className="w-4 h-4" viewBox="0 0 32 32" fill="currentColor">
                                    <path d="M27.313 11.375c-0.063-1.25-0.25-2.438-0.563-3.563-1.063-3.688-3.75-6.438-7.375-7.563-1.125-0.313-2.313-0.5-3.563-0.563-0.125 0-0.188-0.063-0.188-0.188v-0.188h-0.625v0.188c0 0.125-0.063 0.188-0.188 0.188-1.25 0.063-2.438 0.25-3.563 0.563-3.688 1.063-6.438 3.75-7.563 7.375-0.313 1.125-0.5 2.313-0.563 3.563 0 0.125-0.063 0.188-0.188 0.188h-0.188v0.625h0.188c0.125 0 0.188 0.063 0.188 0.188 0.063 1.25 0.25 2.438 0.563 3.563 1.063 3.688 3.75 6.438 7.375 7.563 1.125 0.313 2.313 0.5 3.563 0.563 0.125 0 0.188 0.063 0.188 0.188v0.188h0.625v-0.188c0-0.125 0.063-0.188 0.188-0.188 1.25-0.063 2.438-0.25 3.563-0.563 3.688-1.063 6.438-3.75 7.563-7.375 0.313-1.125 0.5-2.313 0.563-3.563 0-0.125 0.063-0.188 0.188-0.188h0.188v-0.625h-0.188c-0.125 0-0.188-0.063-0.188-0.188zM16 26.5c-5.813 0-10.5-4.688-10.5-10.5s4.688-10.5 10.5-10.5 10.5 4.688 10.5 10.5-4.688 10.5-10.5 10.5z"/>
                                    <path d="M21.875 13.188c-0.125-1.063-0.5-2.063-1.063-2.938-0.875-1.375-2.188-2.375-3.75-2.813-0.75-0.188-1.5-0.313-2.313-0.313-0.063 0-0.125 0-0.188 0-0.063 0-0.125-0.063-0.125-0.125v-0.125h-0.313v0.125c0 0.063-0.063 0.125-0.125 0.125-0.063 0-0.125 0-0.188 0-0.813 0-1.563 0.125-2.313 0.313-1.563 0.438-2.875 1.438-3.75 2.813-0.563 0.875-0.938 1.875-1.063 2.938 0 0.063-0.063 0.125-0.125 0.125h-0.125v0.313h0.125c0.063 0 0.125 0.063 0.125 0.125 0.125 1.063 0.5 2.063 1.063 2.938 0.875 1.375 2.188 2.375 3.75 2.813 0.75 0.188 1.5 0.313 2.313 0.313 0.063 0 0.125 0 0.188 0 0.063 0 0.125 0.063 0.125 0.125v0.125h0.313v-0.125c0-0.063 0.063-0.125 0.125-0.125 0.063 0 0.125 0 0.188 0 0.813 0 1.563-0.125 2.313-0.313 1.563-0.438 2.875-1.438 3.75-2.813 0.563-0.875 0.938-1.875 1.063-2.938 0-0.063 0.063-0.125 0.125-0.125h0.125v-0.313h-0.125c-0.063 0-0.125-0.063-0.125-0.125zM14.5 18.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"/>
                                  </svg>
                                  Connect Grafana
                                </span>
                              </Button>
                            </>
                          )}

                          {/* Instructions to integrate - only show when not connected */}
                          {!integrations.grafana && (
                            <div className="flex flex-col items-start gap-3 w-full">
                              <h4 className="text-sm leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                                Instructions to integrate
                              </h4>

                              <div className="flex flex-col items-start gap-3 w-full">
                                {/* Step 1 */}
                                <div className="flex flex-col items-start gap-1">
                                  <div className="flex flex-row items-start gap-2">
                                    <div className="flex items-center justify-center min-w-[20px] w-[20px] h-[20px] rounded border border-[#FFD11B] bg-transparent text-[#FFD11B] text-xs">
                                      1
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                      <h5 className="text-sm leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                                        Open Side Panel
                                      </h5>
                                      <p className="text-xs leading-4 text-[#9AA3B0]">
                                        Click Grafana icon → Select &quot;Administration&quot; → &quot;Users and access&quot; → &quot;Service accounts&quot; → Add service account button.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex flex-col items-start gap-1">
                                  <div className="flex flex-row items-start gap-2">
                                    <div className="flex items-center justify-center min-w-[20px] w-[20px] h-[20px] rounded border border-[#FFD11B] bg-transparent text-[#FFD11B] text-xs">
                                      2
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                      <h5 className="text-sm leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                                        Create Account
                                      </h5>
                                      <p className="text-xs leading-4 text-[#9AA3B0]">
                                        Enter Name → Set Role dropdown to &quot;Viewer&quot; → Click &quot;Create&quot; button.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex flex-col items-start gap-1">
                                  <div className="flex flex-row items-start gap-2">
                                    <div className="flex items-center justify-center min-w-[20px] w-[20px] h-[20px] rounded border border-[#FFD11B] bg-transparent text-[#FFD11B] text-xs">
                                      3
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                      <h5 className="text-sm leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                                        Add Token
                                      </h5>
                                      <p className="text-xs leading-4 text-[#9AA3B0]">
                                        In new account details, click &quot;Add service account token&quot; link/button.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Step 4 */}
                                <div className="flex flex-col items-start gap-1">
                                  <div className="flex flex-row items-start gap-2">
                                    <div className="flex items-center justify-center min-w-[20px] w-[20px] h-[20px] rounded border border-[#FFD11B] bg-transparent text-[#FFD11B] text-xs">
                                      4
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                      <h5 className="text-sm leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                                        Generate Token
                                      </h5>
                                      <p className="text-xs leading-4 text-[#9AA3B0]">
                                        Enter token Name → Click &quot;Generate token&quot; → Copy full token (starts with glsa_... → visible once only, save securely).
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                </Accordion>

                {/* AWS CloudWatch */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="aws" className="border-none">
                    <div className="bg-[rgba(47,66,87,0.2)] border border-[rgba(47,66,87,0.5)] rounded-lg">
                      <AccordionTrigger className="p-4 sm:p-6 hover:no-underline [&[data-state=open]]:pb-0">
                        <div className="flex flex-row justify-between items-center w-full gap-2">
                          <div className="flex flex-row items-center gap-3 sm:gap-4 min-w-0">
                            {integrations.aws ? (
                              <CheckCircle2 className="w-5 h-5 text-[#FFD11B] flex-shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-[rgba(154,163,176,0.4)] flex-shrink-0" />
                            )}
                            <div className="flex flex-row items-center gap-2 sm:gap-3 min-w-0">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5E7EB] flex-shrink-0" viewBox="0 0 256 256" fill="currentColor">
                                <path d="M208 40H48a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16zm-72 152h-16v-16h16zm0-32h-16v-64h16zm0-80h-16V64h16zm40 112h-16v-16h16zm0-32h-16v-64h16zm0-80h-16V64h16zM96 192H80v-16h16zm0-32H80v-64h16zm0-80H80V64h16z"/>
                              </svg>
                              <span className="text-sm sm:text-[16px] font-semibold leading-5 tracking-[-0.150391px] text-[#E5E7EB] truncate">
                                AWS CloudWatch
                              </span>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm leading-5 tracking-[-0.150391px] text-[#FFD11B] flex-shrink-0">
                            {'> 5 min'}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 sm:px-16 lg:px-[92px] pb-6 pt-2">
                        <div className="flex flex-col items-start gap-4 sm:gap-[22px]">
                          {/* Description */}
                          <p className="text-xs sm:text-sm leading-5 tracking-[-0.150391px] text-[#9AA3B0]">
                            Monitor AWS infrastructure logs and metrics from CloudWatch for comprehensive visibility into your cloud applications.
                          </p> 

                          {/* Show connected status or input fields */}
                          {integrations.aws ? (
                            <>
                              {/* Connected Status */}
                              <div className="w-full p-3 rounded-md border border-emerald-500/30 bg-emerald-500/10">
                                <div className="flex flex-col gap-2">
                                  <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                    <span className="text-sm font-semibold text-emerald-400">AWS CloudWatch Connected</span>
                                  </div>
                                  {awsRoleArn && (
                                    <div className="flex flex-col gap-1">
                                      <span className="text-xs text-[#9AA3B0]">Role ARN:</span>
                                      <span className="text-sm text-[#E5E7EB] font-mono break-all">{awsRoleArn}</span>
                                    </div>
                                  )}
                                  {awsRegion && (
                                    <div className="flex flex-col gap-1">
                                      <span className="text-xs text-[#9AA3B0]">Region:</span>
                                      <span className="text-sm text-[#E5E7EB]">{awsRegion}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Remove Integration Button */}
                              <Button
                                onClick={handleDisconnectAws}
                                variant="outline"
                                className="h-9 px-4 rounded-md text-sm font-medium leading-5 tracking-[-0.150391px] bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50"
                              >
                                Remove Integration
                              </Button>
                            </>
                          ) : (
                            <>
                              {/* Role ARN Input */}
                              <div className="flex flex-col items-start gap-2 w-full">
                                <label className="text-sm leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                                  IAM Role ARN
                                </label>
                                <Input
                                  value={awsRoleArn}
                                  onChange={(e) => setAwsRoleArn(e.target.value)}
                                  placeholder="arn:aws:iam::123456789012:role/VibeMonitor-CloudWatchRole"
                                  className="w-full h-9 px-3 py-1 text-sm bg-[rgba(27,41,61,0.3)] border-[#2F4257] rounded-md text-[#E5E7EB] placeholder:text-[#9AA3B0]"
                                />
                              </div>

                              {/* External ID Input */}
                              <div className="flex flex-col items-start gap-2 w-full">
                                <label className="text-sm leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                                  External ID
                                </label>
                                <Input
                                  value={awsExternalId}
                                  onChange={(e) => setAwsExternalId(e.target.value)}
                                  placeholder="Enter your external ID"
                                  className="w-full h-9 px-3 py-1 text-sm bg-[rgba(27,41,61,0.3)] border-[#2F4257] rounded-md text-[#E5E7EB] placeholder:text-[#9AA3B0]"
                                />
                              </div>

                              {/* Region Input (Optional) */}
                              <div className="flex flex-col items-start gap-2 w-full">
                                <label className="text-sm leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                                  AWS Region (Optional)
                                </label>
                                <Input
                                  value={awsRegion}
                                  onChange={(e) => setAwsRegion(e.target.value)}
                                  placeholder="us-east-1 (default)"
                                  className="w-full h-9 px-3 py-1 text-sm bg-[rgba(27,41,61,0.3)] border-[#2F4257] rounded-md text-[#E5E7EB] placeholder:text-[#9AA3B0]"
                                />
                              </div>

                              <Button
                                onClick={handleConnectAws}
                                disabled={awsConnecting}
                                className="h-10 px-5 rounded-md text-sm font-medium leading-5 tracking-[-0.150391px] transition-all duration-300 bg-[#3F5ECC] hover:bg-[#3F5ECC]/90 text-white border border-[#3F5ECC]/20 hover:border-[#3F5ECC]"
                              >
                                {awsConnecting ? (
                                  <span className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Connecting...
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4" viewBox="0 0 256 256" fill="currentColor">
                                      <path d="M208 40H48a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16zm-72 152h-16v-16h16zm0-32h-16v-64h16zm0-80h-16V64h16zm40 112h-16v-16h16zm0-32h-16v-64h16zm0-80h-16V64h16zM96 192H80v-16h16zm0-32H80v-64h16zm0-80H80V64h16z"/>
                                    </svg>
                                    Connect AWS CloudWatch
                                  </span>
                                )}
                              </Button>
                            </>
                          )}

                          {/* Instructions to integrate - only show when not connected */}
                          {!integrations.aws && (
                            <div className="flex flex-col items-start gap-3 w-full">
                              <h4 className="text-sm leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                                Instructions to integrate
                              </h4>

                              <div className="flex flex-col items-start gap-3 w-full">
                                {/* Step 1 */}
                                <div className="flex flex-col items-start gap-1">
                                  <div className="flex flex-row items-start gap-2">
                                    <div className="flex items-center justify-center min-w-[20px] w-[20px] h-[20px] rounded border border-[#FFD11B] bg-transparent text-[#FFD11B] text-xs">
                                      1
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                      <h5 className="text-sm leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                                        Create IAM Role
                                      </h5>
                                      <p className="text-xs leading-4 text-[#9AA3B0]">
                                        Go to AWS IAM Console → Roles → Create Role → Select &quot;AWS account&quot; as trusted entity type → Choose &quot;Another AWS account&quot; → Enter VibeMonitor&apos;s AWS Account ID.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex flex-col items-start gap-1">
                                  <div className="flex flex-row items-start gap-2">
                                    <div className="flex items-center justify-center min-w-[20px] w-[20px] h-[20px] rounded border border-[#FFD11B] bg-transparent text-[#FFD11B] text-xs">
                                      2
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                      <h5 className="text-sm leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                                        Configure Trust Policy
                                      </h5>
                                      <p className="text-xs leading-4 text-[#9AA3B0]">
                                        Check &quot;Require external ID&quot; → Enter the external ID provided above → Add VibeMonitor&apos;s AWS Principal to trust policy:
                                      </p>
                                      <div className="w-full mt-2 p-2 rounded bg-[rgba(27,41,61,0.5)] border border-[#2F4257]">
                                        <code className="text-xs text-[#FFD11B] font-mono break-all">
                                          &quot;AWS&quot;: &quot;arn:aws:iam::337502598894:role/ecsAppTaskRole&quot;
                                        </code>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex flex-col items-start gap-1">
                                  <div className="flex flex-row items-start gap-2">
                                    <div className="flex items-center justify-center min-w-[20px] w-[20px] h-[20px] rounded border border-[#FFD11B] bg-transparent text-[#FFD11B] text-xs">
                                      3
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                      <h5 className="text-sm leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                                        Attach Permissions
                                      </h5>
                                      <p className="text-xs leading-4 text-[#9AA3B0]">
                                        Add this AWS managed policy: <strong>CloudWatchReadOnlyAccess</strong> → This provides read access to CloudWatch logs and metrics.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Step 4 */}
                                <div className="flex flex-col items-start gap-1">
                                  <div className="flex flex-row items-start gap-2">
                                    <div className="flex items-center justify-center min-w-[20px] w-[20px] h-[20px] rounded border border-[#FFD11B] bg-transparent text-[#FFD11B] text-xs">
                                      4
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                      <h5 className="text-sm leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                                        Name Your Role
                                      </h5>
                                      <p className="text-xs leading-4 text-[#9AA3B0]">
                                        Role name <strong>must start with &quot;VibeMonitor-&quot;</strong> (e.g., VibeMonitor-CloudWatchRole) → Add optional description → Click &quot;Create role&quot; → Copy the Role ARN.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Step 5 */}
                                <div className="flex flex-col items-start gap-1">
                                  <div className="flex flex-row items-start gap-2">
                                    <div className="flex items-center justify-center min-w-[20px] w-[20px] h-[20px] rounded border border-[#FFD11B] bg-transparent text-[#FFD11B] text-xs">
                                      5
                                    </div>
                                    <div className="flex flex-col items-start gap-1">
                                      <h5 className="text-sm leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                                        Enter Credentials
                                      </h5>
                                      <p className="text-xs leading-4 text-[#9AA3B0]">
                                        Paste the Role ARN and External ID into the fields above → Optionally specify your primary AWS region → Click &quot;Connect AWS CloudWatch&quot;.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                </Accordion>
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
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
