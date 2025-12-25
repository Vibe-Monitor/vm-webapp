// API Response Type
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  status: number;
}

// Request Types
export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}

// Response Types
export interface UserInfo {
  id: string;
  email: string;
  name: string;
  is_verified: boolean;
}

export interface SignupResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  is_verified: boolean;
  user: UserInfo;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  is_verified: boolean;
  user: UserInfo;
}

export interface MessageResponse {
  message: string;
}

export class CredentialAuthClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
  }

  private async request<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      // If response is not OK, extract error detail from backend
      if (!response.ok) {
        let errorDetail: string;

        // Handle different error formats from FastAPI/Pydantic
        if (responseData.detail) {
          // Case 1: Validation errors (array format from Pydantic)
          // Format: {"detail": [{"type": "value_error", "msg": "error message", ...}]}
          if (Array.isArray(responseData.detail)) {
            // Extract all error messages from validation errors
            const errorMessages = responseData.detail
              .map((err: { msg?: string; message?: string }) => err.msg || err.message || 'Validation error')
              .filter((msg: string) => msg); // Remove empty messages

            errorDetail = errorMessages.length > 0
              ? errorMessages.join('. ')
              : 'Validation failed';
          }
          // Case 2: Simple string error
          // Format: {"detail": "error message"}
          else if (typeof responseData.detail === 'string') {
            errorDetail = responseData.detail;
          }
          // Case 3: Unknown format
          else {
            errorDetail = 'Request failed';
          }
        }
        // Fallback to message field or generic error
        else {
          errorDetail = responseData.message || 'Request failed';
        }

        return {
          error: errorDetail,
          status: response.status
        };
      }

      return {
        data: responseData,
        status: response.status
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Network error. Please check your connection and try again.';
      return {
        error: errorMessage,
        status: 500
      };
    }
  }

  /**
   * Register a new user with email and password
   * Creates user account with unverified status and sends verification email
   */
  async signup(data: SignupRequest): Promise<ApiResponse<SignupResponse>> {
    return this.request<SignupResponse>('/api/v1/auth/signup', data);
  }

  /**
   * Authenticate user with email and password
   * Returns JWT tokens and user info
   */
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>('/api/v1/auth/login', data);
  }

  /**
   * Verify user email with token from verification link
   * Updates user is_verified status
   */
  async verifyEmail(data: VerifyEmailRequest): Promise<ApiResponse<MessageResponse>> {
    return this.request<MessageResponse>('/api/v1/auth/verify-email', data);
  }

  /**
   * Resend verification email to user
   * Invalidates old tokens and generates new token
   */
  async resendVerification(data: ResendVerificationRequest): Promise<ApiResponse<MessageResponse>> {
    return this.request<MessageResponse>('/api/v1/auth/resend-verification', data);
  }

  /**
   * Request password reset link
   * Validates user exists and sends password reset email
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<MessageResponse>> {
    return this.request<MessageResponse>('/api/v1/auth/forgot-password', data);
  }

  /**
   * Reset user password with token
   * Validates reset token and updates password
   */
  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<MessageResponse>> {
    return this.request<MessageResponse>('/api/v1/auth/reset-password', data);
  }
}
