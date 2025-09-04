import { BlogApiResponse, BlogApiParams } from '@/types/blog.types';

const API_BASE_URL = 'https://devpro.toolsey.com/core/api';
// Add your Bearer token to .env.local file:
// NEXT_PUBLIC_API_TOKEN=your_bearer_token_here (if needed on client side)
const BEARER_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || process.env.API_TOKEN;

export async function fetchBlogPosts(params: BlogApiParams = {}): Promise<BlogApiResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.set('page', params.page.toString());
  if (params.per_page) searchParams.set('per_page', params.per_page.toString());
  if (params.category) searchParams.set('category', params.category);

  const url = `${API_BASE_URL}/blog/posts/${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${BEARER_TOKEN}`,
      'Content-Type': 'application/json',
    },
    // Revalidation now controlled at page level with export const revalidate
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog posts: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Fetch blog post by ID
export async function fetchBlogPostById(id: number) {
  const response = await fetch(`${API_BASE_URL}/blog/posts/${id}`, {
    headers: {
      'Authorization': `Bearer ${BEARER_TOKEN}`,
      'Content-Type': 'application/json',
    },
    // Revalidation now controlled at page level with export const revalidate
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog post: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
