import { BaseClient, ApiResponse } from '../baseClient';
import {
  SendMessageRequest,
  SendMessageResponse,
  ChatSessionSummary,
  ChatSessionResponse,
  UpdateSessionRequest,
  ChatTurnResponse,
  SubmitFeedbackRequest,
  FeedbackResponse,
} from '@/types/chat';

export class ChatClient {
  constructor(private baseClient: BaseClient) {}

  /**
   * Send a message to start a new conversation or continue an existing one
   */
  async sendMessage(
    workspaceId: string,
    request: SendMessageRequest
  ): Promise<ApiResponse<SendMessageResponse>> {
    return this.baseClient.post(
      `/api/v1/workspaces/${workspaceId}/chat`,
      request
    );
  }

  /**
   * List all chat sessions for the current user
   */
  async listSessions(
    workspaceId: string,
    options?: { limit?: number; offset?: number }
  ): Promise<ApiResponse<ChatSessionSummary[]>> {
    const params = new URLSearchParams();
    if (options?.limit) params.set('limit', options.limit.toString());
    if (options?.offset) params.set('offset', options.offset.toString());

    const queryString = params.toString();
    const endpoint = `/api/v1/workspaces/${workspaceId}/sessions${queryString ? `?${queryString}` : ''}`;

    return this.baseClient.get(endpoint);
  }

  /**
   * Get a specific session with all its turns
   */
  async getSession(
    workspaceId: string,
    sessionId: string
  ): Promise<ApiResponse<ChatSessionResponse>> {
    return this.baseClient.get(
      `/api/v1/workspaces/${workspaceId}/sessions/${sessionId}`
    );
  }

  /**
   * Update a session (rename)
   */
  async updateSession(
    workspaceId: string,
    sessionId: string,
    request: UpdateSessionRequest
  ): Promise<ApiResponse<ChatSessionResponse>> {
    return this.baseClient.patch(
      `/api/v1/workspaces/${workspaceId}/sessions/${sessionId}`,
      request
    );
  }

  /**
   * Delete a session and all its turns
   */
  async deleteSession(
    workspaceId: string,
    sessionId: string
  ): Promise<ApiResponse<void>> {
    return this.baseClient.delete(
      `/api/v1/workspaces/${workspaceId}/sessions/${sessionId}`
    );
  }

  /**
   * Get a specific turn with all processing steps
   */
  async getTurn(
    workspaceId: string,
    turnId: string
  ): Promise<ApiResponse<ChatTurnResponse>> {
    return this.baseClient.get(
      `/api/v1/workspaces/${workspaceId}/turns/${turnId}`
    );
  }

  /**
   * Submit feedback for a turn
   */
  async submitFeedback(
    workspaceId: string,
    turnId: string,
    request: SubmitFeedbackRequest
  ): Promise<ApiResponse<FeedbackResponse>> {
    return this.baseClient.post(
      `/api/v1/workspaces/${workspaceId}/turns/${turnId}/feedback`,
      request
    );
  }

  /**
   * Get the SSE stream URL for a turn
   * Note: Actual SSE connection should be made using fetch-event-source
   */
  getStreamUrl(workspaceId: string, turnId: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
    return `${baseUrl}/api/v1/workspaces/${workspaceId}/turns/${turnId}/stream`;
  }
}
