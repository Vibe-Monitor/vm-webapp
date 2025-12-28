import { useState } from "react";
import { toast } from "sonner";
import posthog from "posthog-js";
import { awsService } from "@/services/integrations/awsService";
import { IntegrationConfig } from "@/types/integration";
import { CheckCircle2, Copy, Check } from "lucide-react";

export function useAwsIntegration(workspaceId: string | undefined) {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roleArn, setRoleArn] = useState("");
  const [externalId, setExternalId] = useState("vibemonitor");
  const [region, setRegion] = useState("");
  const [copiedTrustPolicy, setCopiedTrustPolicy] = useState(false);

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

  const handleCopyTrustPolicy = () => {
    const trustPolicy = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::337502598894:role/ecsAppTaskRole"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "${externalId}"
        }
      }
    }
  ]
}`;
    navigator.clipboard.writeText(trustPolicy);
    setCopiedTrustPolicy(true);
    toast.success("Trust policy copied to clipboard!");
    setTimeout(() => setCopiedTrustPolicy(false), 2000);
  };

  const statusComponent = connected && roleArn ? (
    <div className="w-full p-3 rounded-md border border-emerald-600/40 bg-emerald-500/10">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-600">AWS CloudWatch Connected</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-muted-foreground">Role ARN:</span>
          <span className="text-sm break-all font-mono font-medium text-foreground">{roleArn}</span>
        </div>
        {region && (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">Region:</span>
            <span className="text-sm font-mono font-medium text-foreground">{region}</span>
          </div>
        )}
      </div>
    </div>
  ) : null;

  const instructions = (
    <div className="flex flex-col items-start gap-3 w-full">
      <h4 className="text-sm leading-5 tracking-[-0.150391px] text-foreground">
        Instructions to integrate
      </h4>

      <div className="flex flex-col items-start gap-3 w-full">
        {/* Step 1 */}
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-row items-start gap-2">
            <div className="flex items-center justify-center min-w-[20px] w-[20px] h-[20px] rounded border bg-transparent text-xs" style={{ borderColor: '#FED835', color: '#FED835' }}>
              1
            </div>
            <div className="flex flex-col items-start gap-1">
              <h5 className="text-sm leading-5 tracking-[-0.150391px] text-foreground">
                Create IAM Role with Custom Trust Policy
              </h5>
              <p className="text-xs leading-4 text-muted-foreground">
                Go to AWS IAM Console → Roles → Create Role → Select &quot;Custom trust policy&quot; → Paste the trust policy below:
              </p>
              <div className="w-full mt-2 relative group">
                <div className="p-3 rounded overflow-x-auto" style={{ backgroundColor: 'rgba(10, 37, 64, 0.06)', border: '1.5px solid rgba(10, 37, 64, 0.15)' }}>
                  <pre className="text-xs font-mono whitespace-pre" style={{ color: '#0A2540' }}>
{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::337502598894:role/ecsAppTaskRole"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "${externalId}"
        }
      }
    }
  ]
}`}
                  </pre>
                </div>
                <button
                  onClick={handleCopyTrustPolicy}
                  className="absolute top-2 right-2 p-1.5 rounded transition-colors hover:bg-opacity-80"
                  style={{ backgroundColor: 'rgba(254, 216, 53, 0.15)', border: '1px solid rgba(254, 216, 53, 0.3)' }}
                  aria-label="Copy trust policy"
                >
                  {copiedTrustPolicy ? (
                    <Check className="w-4 h-4" style={{ color: '#10B981' }} />
                  ) : (
                    <Copy className="w-4 h-4 transition-colors" style={{ color: '#0A2540' }} />
                  )}
                </button>
              </div>
              <p className="text-xs leading-4 mt-2" style={{ color: '#F59E0B' }}>
                💡 The External ID shown above updates automatically as you type in the &quot;External ID&quot; field below.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-row items-start gap-2">
            <div className="flex items-center justify-center min-w-[20px] w-[20px] h-[20px] rounded border bg-transparent text-xs" style={{ borderColor: '#FED835', color: '#FED835' }}>
              2
            </div>
            <div className="flex flex-col items-start gap-1">
              <h5 className="text-sm leading-5 tracking-[-0.150391px] text-foreground">
                Review Trust Policy
              </h5>
              <p className="text-xs leading-4 text-muted-foreground">
                Click &quot;Next&quot; after pasting the trust policy. AWS will validate the JSON format automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-row items-start gap-2">
            <div className="flex items-center justify-center min-w-[20px] w-[20px] h-[20px] rounded border bg-transparent text-xs" style={{ borderColor: '#FED835', color: '#FED835' }}>
              3
            </div>
            <div className="flex flex-col items-start gap-1">
              <h5 className="text-sm leading-5 tracking-[-0.150391px] text-foreground">
                Attach Permissions
              </h5>
              <p className="text-xs leading-4 text-muted-foreground">
                Add this AWS managed policy: <strong>CloudWatchReadOnlyAccess</strong> → This provides read access to CloudWatch logs and metrics.
              </p>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-row items-start gap-2">
            <div className="flex items-center justify-center min-w-[20px] w-[20px] h-[20px] rounded border bg-transparent text-xs" style={{ borderColor: '#FED835', color: '#FED835' }}>
              4
            </div>
            <div className="flex flex-col items-start gap-1">
              <h5 className="text-sm leading-5 tracking-[-0.150391px] text-foreground">
                Name Your Role
              </h5>
              <p className="text-xs leading-4 text-muted-foreground">
                Enter a role name (e.g., VibeMonitor-CloudWatchRole) → Add optional description → Click &quot;Create role&quot; → Copy the Role ARN.
              </p>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-row items-start gap-2">
            <div className="flex items-center justify-center min-w-[20px] w-[20px] h-[20px] rounded border bg-transparent text-xs" style={{ borderColor: '#FED835', color: '#FED835' }}>
              5
            </div>
            <div className="flex flex-col items-start gap-1">
              <h5 className="text-sm leading-5 tracking-[-0.150391px] text-foreground">
                Enter Credentials
              </h5>
              <p className="text-xs leading-4 text-muted-foreground">
                Paste the Role ARN and External ID (must match the &quot;sts:ExternalId&quot; from your trust policy) into the fields above → Optionally specify your primary AWS region → Click &quot;Connect AWS CloudWatch&quot;.
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
        placeholder: "vibemonitor (or your custom external ID)",
        type: "text",
        description: "A unique identifier for additional security. You can change this to your preference - it updates the trust policy below in real-time."
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
