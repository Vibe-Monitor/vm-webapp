import { ReactNode } from "react";

export interface IntegrationField {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: "text" | "password";
  description?: string;
}

export interface IntegrationConfig {
  title: string;
  icon: ReactNode;
  description: string;
  connected: boolean;
  loading: boolean;
  fields: IntegrationField[];
  onConnect: () => void;
  onDisconnect: () => void;
  statusComponent?: ReactNode;
  instructions?: ReactNode;
  timeEstimate: string;
}

export interface SlackIntegrationData {
  connected: boolean;
  data?: {
    team_name: string;
  };
}

export interface GithubIntegrationData {
  connected: boolean;
  integration?: {
    github_username: string;
  };
}

export interface GrafanaIntegrationData {
  connected: boolean;
  grafana_url?: string;
}

export interface AwsIntegrationData {
  role_arn?: string;
  region?: string;
  aws_region?: string;
}

export type GithubStatus = 'connected' | 'suspended' | 'not-connected' | 'error';
