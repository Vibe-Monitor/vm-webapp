// ============================================================
// Enums
// ============================================================

export enum TurnStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum StepType {
  TOOL_CALL = 'tool_call',
  THINKING = 'thinking',
  STATUS = 'status',
}

export enum StepStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

// ============================================================
// Request Types
// ============================================================

export interface SendMessageRequest {
  message: string;           // 1-10,000 characters
  session_id?: string;       // UUID, optional
}

export interface UpdateSessionRequest {
  title: string;             // 1-255 characters
}

export interface SubmitFeedbackRequest {
  is_positive: boolean;      // true=thumbs up, false=thumbs down
  comment?: string;          // Max 1000 characters
}

// ============================================================
// Response Types
// ============================================================

export interface SendMessageResponse {
  turn_id: string;
  session_id: string;
  message: string;
}

export interface FeedbackResponse {
  turn_id: string;
  is_positive: boolean;
  comment: string | null;
  message: string;
}

export interface TurnStepResponse {
  id: string;
  step_type: StepType;
  tool_name: string | null;
  content: string | null;
  status: StepStatus;
  sequence: number;
  created_at: string;        // ISO-8601
}

export interface ChatTurnResponse {
  id: string;
  session_id: string;
  user_message: string;
  final_response: string | null;
  status: TurnStatus;
  job_id: string | null;
  feedback_score: number | null;
  feedback_comment: string | null;
  created_at: string;        // ISO-8601
  updated_at: string | null; // ISO-8601
  steps: TurnStepResponse[];
}

export interface ChatTurnSummary {
  id: string;
  user_message: string;
  final_response: string | null;
  status: TurnStatus;
  feedback_score: number | null;
  created_at: string;        // ISO-8601
}

export interface ChatSessionResponse {
  id: string;
  workspace_id: string;
  user_id: string;
  title: string | null;
  created_at: string;        // ISO-8601
  updated_at: string | null; // ISO-8601
  turns: ChatTurnSummary[];
}

export interface ChatSessionSummary {
  id: string;
  title: string | null;
  created_at: string;        // ISO-8601
  updated_at: string | null; // ISO-8601
  turn_count: number;
  last_message_preview: string | null;
}

// ============================================================
// SSE Event Types
// ============================================================

export interface SSEStatusEvent {
  event: 'status';
  content: string;
}

export interface SSEToolStartEvent {
  event: 'tool_start';
  tool_name: string;
  step_id: string;
}

export interface SSEToolEndEvent {
  event: 'tool_end';
  step_id: string;
  tool_name: string;
  status: 'completed' | 'failed';
  content: string | null;
}

export interface SSEThinkingEvent {
  event: 'thinking';
  content: string;
}

export interface SSECompleteEvent {
  event: 'complete';
  final_response: string;
}

export interface SSEErrorEvent {
  event: 'error';
  message: string;
}

export type SSEEvent =
  | SSEStatusEvent
  | SSEToolStartEvent
  | SSEToolEndEvent
  | SSEThinkingEvent
  | SSECompleteEvent
  | SSEErrorEvent;

// ============================================================
// UI State Types
// ============================================================

export interface ChatStep {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed';
  content?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  status?: TurnStatus;
  steps?: ChatStep[];
  feedbackScore?: number | null;
  createdAt: string;
}

// ============================================================
// Search Types
// ============================================================

export interface ChatSearchResult {
  session_id: string;
  title: string | null;
  matched_content: string;
  match_type: 'title' | 'message';
  created_at: string;
  updated_at: string | null;
}

export interface ChatSearchResponse {
  results: ChatSearchResult[];
}
