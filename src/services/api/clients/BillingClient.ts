import { BaseClient, ApiResponse } from '../baseClient';

export interface Plan {
  id: string;
  name: 'free' | 'pro';
  price_monthly: number;
  services_limit: number;
  rca_daily_limit: number;
  features: string[];
}

export interface Subscription {
  id: string;
  workspace_id: string;
  plan_id: string;
  plan_name: 'free' | 'pro';
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  stripe_subscription_id?: string;
}

export interface Usage {
  services_used: number;
  services_limit: number;
  rca_used_today: number;
  rca_daily_limit: number;
}

export interface CheckoutSession {
  checkout_url: string;
}

export interface BillingPortalSession {
  portal_url: string;
}

export class BillingClient {
  constructor(private baseClient: BaseClient) {}

  async getPlans(): Promise<ApiResponse<Plan[]>> {
    return this.baseClient.get('/api/v1/billing/plans');
  }

  async getSubscription(workspaceId: string): Promise<ApiResponse<Subscription>> {
    return this.baseClient.get(`/api/v1/workspaces/${workspaceId}/billing/subscription`);
  }

  async getUsage(workspaceId: string): Promise<ApiResponse<Usage>> {
    return this.baseClient.get(`/api/v1/workspaces/${workspaceId}/billing/usage`);
  }

  async subscribeToPro(workspaceId: string): Promise<ApiResponse<CheckoutSession>> {
    return this.baseClient.post(`/api/v1/workspaces/${workspaceId}/billing/subscribe/pro`, {});
  }

  async getBillingPortal(workspaceId: string): Promise<ApiResponse<BillingPortalSession>> {
    return this.baseClient.post(`/api/v1/workspaces/${workspaceId}/billing/portal`, {});
  }

  async cancelSubscription(workspaceId: string): Promise<ApiResponse<Subscription>> {
    return this.baseClient.post(`/api/v1/workspaces/${workspaceId}/billing/subscription/cancel`, {});
  }
}
