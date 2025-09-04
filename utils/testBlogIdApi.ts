// Simple test utility for ID-based blog API
// For development/testing purposes only

const API_BASE_URL = 'https://devpro.toolsey.com/core/api';
const BEARER_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || process.env.API_TOKEN;

export async function testBlogPostById(id: number) {
    console.log(`Testing blog API for post ID: ${id}`);
    console.log('==========================================');

    try {
        const response = await fetch(`${API_BASE_URL}/blog/posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ SUCCESS');
            console.log(`   Status: ${response.status}`);
            console.log(`   URL: ${API_BASE_URL}/blog/posts/${id}`);
            console.log(`   Post title: ${data.data?.title || 'No title'}`);
            console.log(`   Post slug: ${data.data?.slug || 'No slug'}`);
            console.log(`   Response structure:`, Object.keys(data));
            return data;
        } else {
            console.log('❌ FAILED');
            console.log(`   Status: ${response.status}`);
            console.log(`   URL: ${API_BASE_URL}/blog/posts/${id}`);
            return null;
        }
    } catch (error) {
        console.log('💥 ERROR');
        console.log(`   URL: ${API_BASE_URL}/blog/posts/${id}`);
        console.log(`   Error:`, error);
        return null;
    }
}

// Test with first available post
export async function testWithFirstPost() {
    try {
        // Get list of posts first
        const response = await fetch(`${API_BASE_URL}/blog/posts?per_page=5`, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            if (data.data && data.data.length > 0) {
                const firstPost = data.data[0];
                console.log(`Found first post with ID: ${firstPost.id}`);
                console.log(`Post title: "${firstPost.title}"`);
                console.log('');
                
                return await testBlogPostById(firstPost.id);
            }
        }
    } catch (error) {
        console.error('Failed to get posts for testing:', error);
    }
    
    return null;
}
