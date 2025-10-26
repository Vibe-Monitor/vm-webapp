import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { CheckCircle2, Circle, Check } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { apiService } from "@/services/apiService";
import { useAppSelector } from "@/lib/hooks";

interface OnboardingPageProps {
  onComplete: () => void;
  userName?: string;
}

export function OnboardingPage({ onComplete, userName = "Komal Bains" }: OnboardingPageProps) {
  const [workspaceName, setWorkspaceName] = useState(`${userName}'s Workspace`);
  const [grafanaUrl, setGrafanaUrl] = useState("");
  const [grafanaToken, setGrafanaToken] = useState("");
  const [slackInstalling, setSlackInstalling] = useState(false);
  const [githubInstalling, setGithubInstalling] = useState(false);
  const [integrations, setIntegrations] = useState({
    github: false,
    grafana: false,
    slack: false,
  });

  const { currentWorkspace } = useAppSelector((state) => state.workspace);

  // Check GitHub and Grafana connection status on mount
  useEffect(() => {
    const checkGithubStatus = async () => {
      if (currentWorkspace?.id) {
        try {
          const response = await apiService.getGithubStatus(currentWorkspace.id);
          if (response.data?.connected) {
            setIntegrations((prev) => ({ ...prev, github: true }));
          }
        } catch (error) {
          console.error('Failed to check GitHub status:', error);
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
          }
        } catch (error) {
          console.error('Failed to check Grafana status:', error);
        }
      }
    };

    checkGithubStatus();
    checkGrafanaStatus();
  }, [currentWorkspace?.id]);



  const handleConnectGitHub = async () => {
    if (!currentWorkspace?.id) {
      toast.error("Please select a workspace first");
      return;
    }

    setGithubInstalling(true);

    try {
      const response = await apiService.getGithubInstallUrl(currentWorkspace.id);

      if (!response.data?.install_url) {
        throw new Error('Failed to get GitHub install URL');
      }

      // Store workspace_id in sessionStorage for callback
      sessionStorage.setItem('github_workspace_id', currentWorkspace.id);

      // Redirect to GitHub to install the app
      window.location.href = response.data.install_url;
    } catch (error) {
      console.error('GitHub installation failed:', error);
      toast.error("Failed to connect GitHub. Please try again.");
      setGithubInstalling(false);
    }
  };

  const handleConnectGrafana = async () => {
    if (!currentWorkspace?.id) {
      toast.error("Please select a workspace first");
      return;
    }

    // Validate inputs
    if (!grafanaUrl.trim()) {
      toast.error('Please enter your Grafana URL');
      return;
    }

    if (!grafanaToken.trim()) {
      toast.error('Please enter your API token');
      return;
    }

    // Add https:// if not present
    let formattedUrl = grafanaUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    // Validate URL format
    try {
      new URL(formattedUrl);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

    try {
      const response = await apiService.connectGrafana({
        workspace_id: currentWorkspace.id,
        grafana_url: formattedUrl,
        api_token: grafanaToken.trim(),
      });

      if (response.status === 200 && response.data) {
        setIntegrations((prev) => ({ ...prev, grafana: true }));
        setGrafanaUrl('');
        setGrafanaToken('');
        toast.success('Grafana connected successfully! 🚀');
      } else {
        throw new Error(response.error || 'Failed to connect Grafana');
      }
    } catch (error) {
      console.error('Grafana connection failed:', error);
      toast.error('Failed to connect Grafana. Please check your credentials and try again.');
    }
  };

  const handleConnectSlack = async () => {
    if (!currentWorkspace?.id) {
      toast.error("Please select a workspace first");
      return;
    }

    setSlackInstalling(true);

    try {
      const response = await apiService.getSlackInstallUrl(currentWorkspace.id);

      if (response.status === 200 && response.data?.oauth_url) {
        // Redirect to Slack OAuth URL
        window.location.href = response.data.oauth_url;
      } else {
        throw new Error(response.error || 'Failed to get Slack OAuth URL');
      }
    } catch (error) {
      console.error('Slack installation failed:', error);
      toast.error("Failed to connect Slack. Please try again.");
      setSlackInstalling(false);
    }
  };

  const handleContinue = () => {
    toast.success("Workspace setup complete! 🎉");
    onComplete();
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-[794px] p-[50px] bg-[rgba(27,41,61,0.1)] border-[#2F4257] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-xl">
        <CardContent className="p-0 flex flex-col items-center">
          {/* Header */}
          <div className="flex flex-col items-center gap-6 w-[448px] mb-7">
            {/* Title */}
            <div className="flex flex-row items-center gap-[5px]">
              <h1 className="text-[24px] font-bold leading-4 tracking-[-0.3125px] text-[#E5E7EB]">
                Welcome to VibeMonitor!
              </h1>
              <span className="text-[16px] leading-4 tracking-[-0.3125px] text-[#FFD11B]">✨</span>
            </div>
            
            {/* Workspace Input */}
            <div className="flex flex-row items-center gap-[2px] w-full h-9">
              <Input
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="w-[448px] h-9 px-3 py-1 text-sm bg-[rgba(27,41,61,0.3)] border-[#2F4257] rounded-md text-[#E5E7EB]"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-start gap-[22px] w-[694px]">
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
                    <AccordionTrigger className="p-6 hover:no-underline [&[data-state=open]]:pb-0">
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row items-center gap-4">
                          {integrations.slack ? (
                            <CheckCircle2 className="w-5 h-5 text-[#FFD11B] flex-shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-[rgba(154,163,176,0.4)] flex-shrink-0" />
                          )}
                          <div className="flex flex-row items-center gap-3">
                            <svg className="w-5 h-5 text-[#E5E7EB]" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                            </svg>
                            <span className="text-[16px] font-semibold leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                              Slack
                            </span>
                          </div>
                        </div>
                        <span className="text-sm leading-5 tracking-[-0.150391px] text-[#FFD11B]">
                          {'> 2 min'}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-[92px] pb-6 pt-2">
                      <div className="flex flex-col items-start gap-[22px]">
                        <p className="text-sm leading-5 tracking-[-0.150391px] text-[#9AA3B0]">
                          Access channels for bot-delivered vibes—team sync made simple.
                        </p>
                        <Button
                          onClick={handleConnectSlack}
                          disabled={slackInstalling || integrations.slack}
                          className={`h-9 px-4 rounded-md text-sm font-medium leading-5 tracking-[-0.150391px] transition-all duration-300 ${
                            integrations.slack
                              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 cursor-not-allowed hover:bg-emerald-500/10"
                              : "bg-secondary hover:bg-secondary/90 text-secondary-foreground border border-transparent"
                          }`}
                        >
                          {slackInstalling ? (
                            "Connecting..."
                          ) : integrations.slack ? (
                            <span className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5" />
                              Integrated
                            </span>
                          ) : (
                            "Connect Slack"
                          )}
                        </Button>
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
                      <AccordionTrigger className="p-6 hover:no-underline [&[data-state=open]]:pb-0">
                        <div className="flex flex-row justify-between items-center w-full">
                          <div className="flex flex-row items-center gap-4">
                            {integrations.github ? (
                              <CheckCircle2 className="w-5 h-5 text-[#FFD11B] flex-shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-[rgba(154,163,176,0.4)] flex-shrink-0" />
                            )}
                            <div className="flex flex-row items-center gap-[10px]">
                              <GitHubLogoIcon className="w-5 h-5 text-[#E5E7EB]" />
                              <span className="text-[16px] font-semibold leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                                GitHub
                              </span>
                            </div>
                          </div>
                          <span className="text-sm leading-5 tracking-[-0.150391px] text-[#FFD11B]">
                            {'≥ 2 min'}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-[90px] pb-6 pt-2">
                        <div className="flex flex-col items-start gap-[22px]">
                          <p className="text-sm leading-5 tracking-[-0.150391px] text-[#9AA3B0]">
                            Automatically monitor commits, issues, and PRs in real time to catch issues early and accelerate development with actionable insights.
                          </p>
                          <Button
                            onClick={handleConnectGitHub}
                            disabled={githubInstalling || integrations.github}
                            className={`h-9 px-4 rounded-md text-sm font-medium leading-5 tracking-[-0.150391px] transition-all duration-300 ${
                              integrations.github
                                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 cursor-not-allowed hover:bg-emerald-500/10"
                                : "bg-secondary hover:bg-secondary/90 text-secondary-foreground border border-transparent"
                            }`}
                          >
                            {githubInstalling ? (
                              "Connecting..."
                            ) : integrations.github ? (
                              <span className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5" />
                                Integrated
                              </span>
                            ) : (
                              "Connect GitHub"
                            )}
                          </Button>
                        </div>
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                </Accordion>

                {/* Grafana */}
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="grafana" className="border-none">
                    <div className="bg-[rgba(47,66,87,0.2)] border border-[rgba(47,66,87,0.5)] rounded-lg">
                      <AccordionTrigger className="p-6 hover:no-underline [&[data-state=open]]:pb-0">
                        <div className="flex flex-row justify-between items-center w-full">
                          <div className="flex flex-row items-center gap-4">
                            {integrations.grafana ? (
                              <CheckCircle2 className="w-5 h-5 text-[#FFD11B] flex-shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-[rgba(154,163,176,0.4)] flex-shrink-0" />
                            )}
                            <div className="flex flex-row items-center gap-3">
                              <svg className="w-5 h-5 text-[#E5E7EB]" viewBox="0 0 32 32" fill="currentColor">
                                <path d="M27.313 11.375c-0.063-1.25-0.25-2.438-0.563-3.563-1.063-3.688-3.75-6.438-7.375-7.563-1.125-0.313-2.313-0.5-3.563-0.563-0.125 0-0.188-0.063-0.188-0.188v-0.188h-0.625v0.188c0 0.125-0.063 0.188-0.188 0.188-1.25 0.063-2.438 0.25-3.563 0.563-3.688 1.063-6.438 3.75-7.563 7.375-0.313 1.125-0.5 2.313-0.563 3.563 0 0.125-0.063 0.188-0.188 0.188h-0.188v0.625h0.188c0.125 0 0.188 0.063 0.188 0.188 0.063 1.25 0.25 2.438 0.563 3.563 1.063 3.688 3.75 6.438 7.375 7.563 1.125 0.313 2.313 0.5 3.563 0.563 0.125 0 0.188 0.063 0.188 0.188v0.188h0.625v-0.188c0-0.125 0.063-0.188 0.188-0.188 1.25-0.063 2.438-0.25 3.563-0.563 3.688-1.063 6.438-3.75 7.563-7.375 0.313-1.125 0.5-2.313 0.563-3.563 0-0.125 0.063-0.188 0.188-0.188h0.188v-0.625h-0.188c-0.125 0-0.188-0.063-0.188-0.188zM16 26.5c-5.813 0-10.5-4.688-10.5-10.5s4.688-10.5 10.5-10.5 10.5 4.688 10.5 10.5-4.688 10.5-10.5 10.5z"/>
                                <path d="M21.875 13.188c-0.125-1.063-0.5-2.063-1.063-2.938-0.875-1.375-2.188-2.375-3.75-2.813-0.75-0.188-1.5-0.313-2.313-0.313-0.063 0-0.125 0-0.188 0-0.063 0-0.125-0.063-0.125-0.125v-0.125h-0.313v0.125c0 0.063-0.063 0.125-0.125 0.125-0.063 0-0.125 0-0.188 0-0.813 0-1.563 0.125-2.313 0.313-1.563 0.438-2.875 1.438-3.75 2.813-0.563 0.875-0.938 1.875-1.063 2.938 0 0.063-0.063 0.125-0.125 0.125h-0.125v0.313h0.125c0.063 0 0.125 0.063 0.125 0.125 0.125 1.063 0.5 2.063 1.063 2.938 0.875 1.375 2.188 2.375 3.75 2.813 0.75 0.188 1.5 0.313 2.313 0.313 0.063 0 0.125 0 0.188 0 0.063 0 0.125 0.063 0.125 0.125v0.125h0.313v-0.125c0-0.063 0.063-0.125 0.125-0.125 0.063 0 0.125 0 0.188 0 0.813 0 1.563-0.125 2.313-0.313 1.563-0.438 2.875-1.438 3.75-2.813 0.563-0.875 0.938-1.875 1.063-2.938 0-0.063 0.063-0.125 0.125-0.125h0.125v-0.313h-0.125c-0.063 0-0.125-0.063-0.125-0.125zM14.5 18.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"/>
                              </svg>
                              <span className="text-[16px] font-semibold leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                                Grafana
                              </span>
                            </div>
                          </div>
                          <span className="text-sm leading-5 tracking-[-0.150391px] text-[#FFD11B]">
                            {'> 5 min'}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-[92px] pb-6 pt-2">
                        <div className="flex flex-col items-start gap-[22px]">
                          {/* Description */}
                          <p className="text-sm leading-5 tracking-[-0.150391px] text-[#9AA3B0]">
                            Pull real-time dashboard metrics and alerts, giving your team instant visibility into performance trends without manual exports.
                          </p>

                          {/* Grafana URL Input */}
                          <div className="flex flex-col items-start gap-2 w-full">
                            <label className="text-sm leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                              Grafana URL
                            </label>
                            <Input
                              value={grafanaUrl}
                              onChange={(e) => setGrafanaUrl(e.target.value)}
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
                            disabled={integrations.grafana}
                            className={`h-9 px-4 rounded-md text-sm font-medium leading-5 tracking-[-0.150391px] transition-all duration-300 ${
                              integrations.grafana
                                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 cursor-not-allowed hover:bg-emerald-500/10"
                                : "bg-secondary hover:bg-secondary/90 text-secondary-foreground border border-transparent"
                            }`}
                          >
                            {integrations.grafana ? (
                              <span className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5" />
                                Integrated
                              </span>
                            ) : (
                              "Connect Grafana"
                            )}
                          </Button>

                          {/* Instructions to integrate */}
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
                        </div>
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* More coming soon */}
            <div className="flex flex-col items-center gap-8 w-full">
              <div className="flex flex-col items-start gap-5 w-[333px]">
                <div className="flex flex-col items-center gap-1 w-full">
                  <div className="flex flex-row items-center gap-[9px]">
                    <span className="text-xs leading-4 text-[#9AA3B0]">✨</span>
                    <span className="text-[16px] font-medium leading-5 tracking-[-0.150391px] text-[#E5E7EB]">
                      More coming soon!
                    </span>
                  </div>
                  <p className="text-xs leading-4 text-[#9AA3B0] text-center">
                    We&apos;re expanding context for richer results—stay tuned!
                  </p>
                </div>
                
                <div className="flex flex-row items-center gap-2 w-full">
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

              {/* Set-up Workspace Button */}
              <Button
                onClick={handleContinue}
                className="w-full h-9 bg-[#6266FA] hover:bg-[#6266FA]/90 text-[#E5E7EB] rounded-md text-sm font-medium leading-5 tracking-[-0.150391px]"
              >
                Set-up Workspace
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
