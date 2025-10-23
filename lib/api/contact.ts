'use server';

const BEARER_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || process.env.API_TOKEN;
const API_BASE_URL = process.env.API_BASE_URL;

export interface ContactFormData {
  full_name: string;
  email: string;
  phone_number: string;
  comments?: string;
  company_name?: string;
  'g-recaptcha-response': string;
}

export interface ContactFormResponse {
  status: boolean;
  message: string;
}

export async function submitContactForm(data: ContactFormData): Promise<ContactFormResponse> {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not configured');
  }

  if (!BEARER_TOKEN) {
    throw new Error('API token is not configured');
  }

  const response = await fetch(`${API_BASE_URL}/site/contact-form`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${BEARER_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to submit contact form: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

