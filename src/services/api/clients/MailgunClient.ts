import { BaseClient, ApiResponse } from '../baseClient';

export interface ContactFormRequest {
  name: string;
  work_email: string;
  interested_topics: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  email: string;
  message_id?: string;
}

export class MailgunClient {
  constructor(private baseClient: BaseClient) {}

  async submitContactForm(data: ContactFormRequest): Promise<ApiResponse<EmailResponse>> {
    return this.baseClient.publicPost('/api/v1/mailgun/contact-form', data);
  }
}
