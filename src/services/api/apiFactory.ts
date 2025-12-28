import { BaseClient } from './baseClient';
import { GithubClient } from './integrations/GithubClient';
import { SlackClient } from './integrations/SlackClient';
import { GrafanaClient } from './integrations/GrafanaClient';
import { AwsClient } from './integrations/AwsClient';
import { DatadogClient } from './integrations/DatadogClient';
import { NewRelicClient } from './integrations/NewRelicClient';
import { WorkspaceClient } from './clients/WorkspaceClient';
import { UserClient } from './clients/UserClient';
import { MailgunClient } from './clients/MailgunClient';
import { ChatClient } from './clients/ChatClient';
import { BillingClient } from './clients/BillingClient';
import { GoogleAuthClient } from './auth/GoogleAuthClient';
import { CredentialAuthClient } from './auth/CredentialAuthClient';

/**
 * API Factory with Lazy Loading
 *
 * Each client is only instantiated when first accessed.
 * This improves performance and reduces initial bundle size.
 *
 * Usage:
 *   import { api } from '@/services/api/apiFactory';
 *   const status = await api.github.getStatus(workspaceId);
 */
class ApiFactory {
  private baseClient: BaseClient;

  // Private instances - created only when accessed (lazy loading)
  private _github?: GithubClient;
  private _slack?: SlackClient;
  private _grafana?: GrafanaClient;
  private _aws?: AwsClient;
  private _datadog?: DatadogClient;
  private _newrelic?: NewRelicClient;
  private _workspace?: WorkspaceClient;
  private _user?: UserClient;
  private _mailgun?: MailgunClient;
  private _chat?: ChatClient;
  private _billing?: BillingClient;
  private _googleAuth?: GoogleAuthClient;
  private _credentialAuth?: CredentialAuthClient;

  constructor() {
    this.baseClient = new BaseClient();
  }

  /**
   * GitHub API Client
   * Lazy-loaded on first access
   */
  get github(): GithubClient {
    if (!this._github) {
      this._github = new GithubClient(this.baseClient);
    }
    return this._github;
  }

  /**
   * Slack API Client
   * Lazy-loaded on first access
   */
  get slack(): SlackClient {
    if (!this._slack) {
      this._slack = new SlackClient(this.baseClient);
    }
    return this._slack;
  }

  /**
   * Grafana API Client
   * Lazy-loaded on first access
   */
  get grafana(): GrafanaClient {
    if (!this._grafana) {
      this._grafana = new GrafanaClient(this.baseClient);
    }
    return this._grafana;
  }

  /**
   * AWS CloudWatch API Client
   * Lazy-loaded on first access
   */
  get aws(): AwsClient {
    if (!this._aws) {
      this._aws = new AwsClient(this.baseClient);
    }
    return this._aws;
  }

  /**
   * Workspace API Client
   * Lazy-loaded on first access
   */
  get workspace(): WorkspaceClient {
    if (!this._workspace) {
      this._workspace = new WorkspaceClient(this.baseClient);
    }
    return this._workspace;
  }

  /**
   * User API Client
   * Lazy-loaded on first access
   */
  get user(): UserClient {
    if (!this._user) {
      this._user = new UserClient(this.baseClient);
    }
    return this._user;
  }

  /**
   * Datadog API Client
   * Lazy-loaded on first access
   */
  get datadog(): DatadogClient {
    if (!this._datadog) {
      this._datadog = new DatadogClient(this.baseClient);
    }
    return this._datadog;
  }

  /**
   * New Relic API Client
   * Lazy-loaded on first access
   */
  get newrelic(): NewRelicClient {
    if (!this._newrelic) {
      this._newrelic = new NewRelicClient(this.baseClient);
    }
    return this._newrelic;
  }

  /**
   * Mailgun API Client
   * Lazy-loaded on first access
   */
  get mailgun(): MailgunClient {
    if (!this._mailgun) {
      this._mailgun = new MailgunClient(this.baseClient);
    }
    return this._mailgun;
  }

  /**
   * Chat API Client
   * Lazy-loaded on first access
   */
  get chat(): ChatClient {
    if (!this._chat) {
      this._chat = new ChatClient(this.baseClient);
    }
    return this._chat;
  }

  /**
   * Billing API Client
   * Lazy-loaded on first access
   */
  get billing(): BillingClient {
    if (!this._billing) {
      this._billing = new BillingClient(this.baseClient);
    }
    return this._billing;
  }

  /**
   * Google Auth Client
   * Lazy-loaded on first access
   */
  get googleAuth(): GoogleAuthClient {
    if (!this._googleAuth) {
      this._googleAuth = new GoogleAuthClient();
    }
    return this._googleAuth;
  }

  /**
   * Credential Auth Client (Email/Password Authentication)
   * Lazy-loaded on first access
   */
  get credentialAuth(): CredentialAuthClient {
    if (!this._credentialAuth) {
      this._credentialAuth = new CredentialAuthClient();
    }
    return this._credentialAuth;
  }
}

/**
 * Singleton instance of the API Factory
 * Import this in your services/hooks/components
 */
export const api = new ApiFactory();
