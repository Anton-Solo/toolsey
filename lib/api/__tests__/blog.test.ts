import { fetchBlogPosts, fetchBlogCategories } from '@/lib/api/blog'

// Mock fetch
global.fetch = jest.fn()

describe('Blog API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('fetchBlogPosts', () => {
    it('should fetch blog posts with default parameters', async () => {
      const mockResponse = {
        data: [
          {
            id: 1,
            title: 'Test Post',
            content: 'Test content',
            published: '2024-01-01',
            categories: ['test'],
            images: { medium: '/test.jpg' }
          }
        ],
        meta: { total: 1, page: 1, perPage: 12 }
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await fetchBlogPosts()

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/blog'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      )

      expect(result).toEqual(mockResponse)
    })

    it('should fetch blog posts with custom parameters', async () => {
      const mockResponse = { data: [], meta: { total: 0, page: 2, perPage: 6 } }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      await fetchBlogPosts({
        page: 2,
        perPage: 6,
        category: 'tech',
        searchText: 'test',
        sort: 'popular'
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('page=2'),
        expect.any(Object)
      )
    })

    it('should handle API errors', async () => {
      ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

      await expect(fetchBlogPosts()).rejects.toThrow('API Error')
    })
  })

  describe('fetchBlogCategories', () => {
    it('should fetch blog categories', async () => {
      const mockResponse = {
        data: [
          { id: 1, title: 'Technology', slug: 'tech' },
          { id: 2, title: 'Business', slug: 'business' }
        ]
      }

      ;(fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await fetchBlogCategories()

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/blog/categories'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer undefined',
            'Content-Type': 'application/json',
          }),
        })
      )

      expect(result).toEqual(mockResponse)
    })
  })
})
