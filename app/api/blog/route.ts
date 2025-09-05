import { NextRequest, NextResponse } from 'next/server';

const BEARER_TOKEN = process.env.API_TOKEN || process.env.NEXT_PUBLIC_API_TOKEN;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const sort = searchParams.get('sort');
    const category = searchParams.get('category');
    const searchText = searchParams.get('searchText');
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perPage') || '10';

    const apiParams = new URLSearchParams();
    
    if (sort) apiParams.append('sort', sort);
    if (category) apiParams.append('category', category);
    if (searchText) apiParams.append('searchText', searchText);
    
    apiParams.append('page', page);
    apiParams.append('perPage', perPage);

    const apiUrl = `${process.env.API_BASE_URL}/blog/posts/?${apiParams.toString()}`;

    console.log('Making API request to:', apiUrl);
    console.log('API_BASE_URL:', process.env.API_BASE_URL);
    console.log('BEARER_TOKEN exists:', !!BEARER_TOKEN);
    console.log('BEARER_TOKEN value:', BEARER_TOKEN ? '***' + BEARER_TOKEN.slice(-4) : 'undefined');
    console.log('NEXT_PUBLIC_API_TOKEN:', process.env.NEXT_PUBLIC_API_TOKEN ? '***' + process.env.NEXT_PUBLIC_API_TOKEN.slice(-4) : 'undefined');
    console.log('API_TOKEN:', process.env.API_TOKEN ? '***' + process.env.API_TOKEN.slice(-4) : 'undefined');
    console.log('Request parameters:', {
      sort,
      category,
      searchText,
      page,
      perPage
    });

    if (!BEARER_TOKEN) {
      console.error('No API token found!');
      return NextResponse.json(
        { error: 'API token not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API request failed:', response.status, response.statusText);
      console.error('API response body:', errorText);
      console.error('Request URL:', apiUrl);
      console.error('Request params:', Object.fromEntries(apiParams));
      
      return NextResponse.json(
        { 
          error: 'Failed to fetch blog data',
          details: errorText,
          status: response.status,
          url: apiUrl
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });

  } catch (error) {
    console.error('Error in blog API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
