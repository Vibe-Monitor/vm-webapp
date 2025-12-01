import { useState } from "react";
import { toast } from "sonner";
import posthog from "posthog-js";
import { awsService } from "@/services/integrations/awsService";
import { IntegrationConfig } from "@/types/integration";
import { CheckCircle2 } from "lucide-react";

export function useAwsIntegration(workspaceId: string | undefined) {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roleArn, setRoleArn] = useState("");
  const [externalId, setExternalId] = useState("");
  const [region, setRegion] = useState("");

  const checkStatus = async () => {
    if (!workspaceId) return;
    try {
      const result = await awsService.getStatus(workspaceId);
      if (result.connected && result.data) {
        setConnected(true);
        if (result.data.role_arn) {
          setRoleArn(result.data.role_arn);
        }
        if (result.data.region || result.data.aws_region) {
          setRegion(result.data.region || result.data.aws_region || '');
        }
      } else {
        setConnected(false);
      }
    } catch (error) {
      console.error('Failed to check AWS status:', error);
      setConnected(false);
    }
  };

  const connect = async () => {
    if (!workspaceId) {
      toast.error("Please select a workspace first");
      return;
    }

    if (!roleArn.trim()) {
      toast.error('Please enter your AWS Role ARN');
      return;
    }

    if (!externalId.trim()) {
      toast.error('Please enter your External ID');
      return;
    }

    if (!roleArn.trim().startsWith('arn:aws:iam::')) {
      toast.error('Please enter a valid AWS Role ARN (should start with arn:aws:iam::)');
      return;
    }

    const roleNameMatch = roleArn.match(/role\/(.*?)$/);
    if (!roleNameMatch || !roleNameMatch[1].toLowerCase().startsWith('vibemonitor-')) {
      toast.error('Role name must start with "VibeMonitor-" or "Vibemonitor-"');
      return;
    }

    posthog.capture('integration_aws_connect_clicked', {
      workspace_id: workspaceId,
      has_role_arn: true,
      has_external_id: true,
      region: region.trim() || 'us-east-1'
    });

    setLoading(true);

    try {
      const data = await awsService.connect({
        workspace_id: workspaceId,
        role_arn: roleArn.trim(),
        external_id: externalId.trim(),
        region: region.trim() || 'us-east-1',
      });

      setConnected(true);
      if (data.role_arn) {
        setRoleArn(data.role_arn);
      }
      if (data.region) {
        setRegion(data.region);
      }

      posthog.capture('integration_aws_connected_successfully', {
        workspace_id: workspaceId,
        region: data.region || region.trim() || 'us-east-1'
      });

      toast.success('AWS CloudWatch connected successfully!');
    } catch (error) {
      console.error('AWS CloudWatch connection failed:', error);

      posthog.capture('integration_aws_connect_failed', {
        workspace_id: workspaceId,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error('Failed to connect AWS CloudWatch. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const disconnect = async () => {
    if (!workspaceId) {
      toast.error("Please select a workspace first");
      return;
    }

    posthog.capture('integration_aws_disconnect_clicked', {
      workspace_id: workspaceId
    });

    try {
      await awsService.disconnect(workspaceId);
      setConnected(false);
      setRoleArn('');
      setExternalId('');
      setRegion('');

      posthog.capture('integration_aws_disconnected_successfully', {
        workspace_id: workspaceId
      });

      toast.success('AWS CloudWatch disconnected successfully');
    } catch (error) {
      console.error('AWS CloudWatch disconnection failed:', error);

      posthog.capture('integration_aws_disconnect_failed', {
        workspace_id: workspaceId,
        error: error instanceof Error ? error.message : 'unknown_error'
      });

      toast.error('Failed to disconnect AWS CloudWatch. Please try again.');
    }
  };

  const statusComponent = connected && roleArn ? (
    <div className="w-full p-3 rounded-md border border-emerald-500/30 bg-emerald-500/10">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-400">AWS CloudWatch Connected</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[#9AA3B0]">Role ARN:</span>
          <span className="text-sm text-[#E5E7EB] font-mono break-all">{roleArn}</span>
        </div>
        {region && (
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#9AA3B0]">Region:</span>
            <span className="text-sm text-[#E5E7EB]">{region}</span>
          </div>
        )}
      </div>
    </div>
  ) : null;

  const instructions = (
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
  );

  const config: Omit<IntegrationConfig, 'title' | 'icon'> = {
    description: "Monitor AWS infrastructure logs and metrics from CloudWatch for comprehensive visibility into your cloud applications.",
    connected,
    loading,
    fields: connected ? [] : [
      {
        label: "IAM Role ARN",
        value: roleArn,
        onChange: setRoleArn,
        placeholder: "arn:aws:iam::123456789012:role/VibeMonitor-CloudWatchRole",
        type: "text"
      },
      {
        label: "External ID",
        value: externalId,
        onChange: setExternalId,
        placeholder: "Enter your external ID",
        type: "text"
      },
      {
        label: "AWS Region (Optional)",
        value: region,
        onChange: setRegion,
        placeholder: "us-east-1 (default)",
        type: "text"
      }
    ],
    onConnect: connect,
    onDisconnect: disconnect,
    statusComponent,
    instructions,
    timeEstimate: "> 5 min"
  };

  return {
    ...config,
    checkStatus,
    setConnected,
    setRoleArn,
    setRegion
  };
}
