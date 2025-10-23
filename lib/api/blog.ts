'use server';

import { BlogApiResponse, BlogApiParams } from '@/types/blog.types';

const BEARER_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || process.env.API_TOKEN;

export async function fetchBlogPosts(params: BlogApiParams = {}): Promise<BlogApiResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.set('page', params.page.toString());
  if (params.perPage) searchParams.set('perPage', params.perPage.toString());
  if (params.category) searchParams.set('category', params.category);
  if (params.sort) searchParams.set('sort', params.sort);
  if (params.searchText) searchParams.set('searchText', params.searchText);
  if (params.excluded_ids && params.excluded_ids.length > 0) {
    searchParams.set('excluded_ids', JSON.stringify(params.excluded_ids));
  }

  const getAbsoluteUrl = () => {
    if (typeof window === 'undefined') {
      if (process.env.NEXT_PUBLIC_SITE_URL) {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
        const url = siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`;
        return `${url}/api/blog`;
      }
      if (process.env.VERCEL_URL) {
        const vercelUrl = process.env.VERCEL_URL;
        const url = vercelUrl.startsWith('http') ? vercelUrl : `https://${vercelUrl}`;
        return `${url}/api/blog`;
      }
      return 'http://toolsey.local/api/blog';
    }
    return '/api/blog';
  };
  
  const baseUrl = getAbsoluteUrl();
  const url = `${baseUrl}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog posts: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function fetchBlogPostById(id: number) {
  const response = await fetch(`${process.env.API_BASE_URL}/blog/posts/${id}`, {
    headers: {
      'Authorization': `Bearer ${BEARER_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog post: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function fetchBlogCategories() {
  const response = await fetch(process.env.API_BASE_URL + '/blog/categories', {
    headers: {
      'Authorization': `Bearer ${BEARER_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  
  if (!response.ok) {
    throw new Error(`Failed to fetch blog categories: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export interface SubscribeNewsletterData {
  email: string;
  'g-recaptcha-response': string;
}

export interface SubscribeNewsletterResponse {
  status: boolean;
  message: string;
}

export async function subscribeToNewsletter(data: SubscribeNewsletterData): Promise<SubscribeNewsletterResponse> {
  const response = await fetch(`${process.env.API_BASE_URL}/site/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${BEARER_TOKEN}`,
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    let errorMessage = `Failed to subscribe: ${response.status} ${response.statusText}`;
    
    if (responseData.message) {
      try {   
        const jsonMatch = responseData.message.match(/^(\{.*?\})/);
        if (jsonMatch) {
          const jsonPart = jsonMatch[1];
          const parsedMessage = JSON.parse(jsonPart);
          if (parsedMessage.detail) {
            errorMessage = parsedMessage.detail;
          }
        } else {
          throw new Error('No JSON found in message');
        }
      } catch (e) {   
        errorMessage = responseData.message;
      }
    }
    
    if (responseData.detail) {
      errorMessage = responseData.detail;
    } else if (responseData.error) {
      errorMessage = responseData.error;
    }
    
    throw new Error(errorMessage);
  }

  return responseData;
}