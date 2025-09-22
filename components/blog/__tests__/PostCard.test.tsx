import { render, screen, fireEvent } from '@testing-library/react'
import { PostCard } from '@/components/blog/PostCard'
import { BlogPost } from '@/types/blog.types'

jest.mock('next/image', () => {
  return function MockImage({ src, alt, onError, ...props }: { src: string; alt: string; onError?: () => void; [key: string]: unknown }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} onError={onError} {...props} />
  }
})

jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>
  }
})

jest.mock('@/components/icons/support/ArrowIcon', () => ({
  ArrowIcon: ({ className }: { className?: string }) => <div data-testid="arrow-icon" className={className} />
}))

describe('PostCard', () => {
  const mockPost: BlogPost = {
    id: 1,
    title: 'Test Blog Post',
    content: 'This is a test blog post content with enough words to calculate read time properly. '.repeat(50), // ~300 words
    published: '2024-01-15T10:00:00Z',
    categories: ['Marketing', 'Sales'],
    images: {
      medium: 'https://example.com/image.jpg',
    //   small: 'https://example.com/small-image.jpg',
      large: 'https://example.com/large-image.jpg'
    },
    slug: 'test-blog-post',
    summary: 'Test summary',
    // author: 'Test Author',
    // tags: ['test', 'blog']
  }

  it('renders post title', () => {
    render(<PostCard post={mockPost} />)
    
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
  })

  it('renders post categories', () => {
    render(<PostCard post={mockPost} />)
    
    expect(screen.getByText('Marketing')).toBeInTheDocument()
    expect(screen.getByText('Sales')).toBeInTheDocument()
  })

  it('renders formatted date', () => {
    render(<PostCard post={mockPost} />)
    
    expect(screen.getByText('January 15, 2024')).toBeInTheDocument()
  })

  it('calculates and displays read time', () => {
    render(<PostCard post={mockPost} />)
    
    expect(screen.getByText(/min read/)).toBeInTheDocument()
  })

  it('renders read more link with arrow', () => {
    render(<PostCard post={mockPost} />)
    
    expect(screen.getByText('Read more')).toBeInTheDocument()
    expect(screen.getByTestId('arrow-icon')).toBeInTheDocument()
  })

  it('renders post image with correct attributes', () => {
    render(<PostCard post={mockPost} />)
    
    const image = screen.getByAltText('Test Blog Post')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  it('uses fallback image when post image is invalid', () => {
    const postWithInvalidImage = {
      ...mockPost,
      images: {
        medium: 'https://devpro.toolsey.com/core/blog_img',
        small: '',
        large: ''
      }
    }
    
    render(<PostCard post={postWithInvalidImage} />)
    
    const image = screen.getByAltText('Test Blog Post')
    expect(image).toHaveAttribute('src', '/images/test-image.png')
  })

  it('uses fallback image when post image is empty', () => {
    const postWithEmptyImage = {
      ...mockPost,
      images: {
        medium: '',
        small: '',
        large: ''
      }
    }
    
    render(<PostCard post={postWithEmptyImage} />)
    
    const image = screen.getByAltText('Test Blog Post')
    expect(image).toHaveAttribute('src', '/images/test-image.png')
  })

  it('handles image error and shows fallback', () => {
    render(<PostCard post={mockPost} />)
    
    const image = screen.getByAltText('Test Blog Post')
    
    fireEvent.error(image)
    
    expect(image).toHaveAttribute('src', '/images/test-image.png')
  })

  it('renders correct links to blog post', () => {
    render(<PostCard post={mockPost} />)
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3) // Image link, title link, read more link
    
    links.forEach(link => {
      expect(link).toHaveAttribute('href', '/blog/1')
    })
  })

  it('handles posts with no categories', () => {
    const postWithoutCategories = {
      ...mockPost,
      categories: []
    }
    
    render(<PostCard post={postWithoutCategories} />)
    
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
    expect(screen.queryByText('Marketing')).not.toBeInTheDocument()
  })

  it('handles posts with single category', () => {
    const postWithSingleCategory = {
      ...mockPost,
      categories: ['Technology']
    }
    
    render(<PostCard post={postWithSingleCategory} />)
    
    expect(screen.getByText('Technology')).toBeInTheDocument()
    expect(screen.queryByText('Marketing')).not.toBeInTheDocument()
  })

  it('calculates read time correctly for short content', () => {
    const shortPost = {
      ...mockPost,
      content: 'Short content with few words.'
    }
    
    render(<PostCard post={shortPost} />)
    
    expect(screen.getByText('1 min read')).toBeInTheDocument()
  })

  it('calculates read time correctly for long content', () => {
    const longPost = {
      ...mockPost,
      content: 'This is a very long content. '.repeat(500) // ~2500 words
    }
    
    render(<PostCard post={longPost} />)
    
    expect(screen.getByText(/min read/)).toBeInTheDocument()
  })

  it('strips HTML tags when calculating read time', () => {
    const postWithHtml = {
      ...mockPost,
      content: '<p>This is a test</p><div>with HTML tags</div>and <strong>more content</strong>'
    }
    
    render(<PostCard post={postWithHtml} />)
    
    // Should count only text content, not HTML tags
    expect(screen.getByText('1 min read')).toBeInTheDocument()
  })

  it('formats date correctly for different dates', () => {
    const postWithDifferentDate = {
      ...mockPost,
      published: '2023-12-25T15:30:00Z'
    }
    
    render(<PostCard post={postWithDifferentDate} />)
    
    expect(screen.getByText('December 25, 2023')).toBeInTheDocument()
  })

  it('handles invalid date gracefully', () => {
    const postWithInvalidDate = {
      ...mockPost,
      published: 'invalid-date'
    }
    
    render(<PostCard post={postWithInvalidDate} />)
    
    // Should still render the component without crashing
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
  })

  it('has correct CSS classes and structure', () => {
    render(<PostCard post={mockPost} />)
    
    const card = screen.getByText('Test Blog Post').closest('.max-w-\\[416px\\]')
    expect(card).toHaveClass('hover:shadow-lg rounded-3xl linear-borders bg-standart-white')
  })

  it('renders category badges with correct styling', () => {
    render(<PostCard post={mockPost} />)
    
    const marketingBadge = screen.getByText('Marketing')
    const salesBadge = screen.getByText('Sales')
    
    expect(marketingBadge).toHaveClass('rounded-[4px] py-1.5 px-2 bg-secondary-foreground')
    expect(salesBadge).toHaveClass('rounded-[4px] py-1.5 px-2 bg-secondary-foreground')
  })

  it('renders read more link with correct styling', () => {
    render(<PostCard post={mockPost} />)
    
    const readMoreLink = screen.getByText('Read more').closest('a')
    expect(readMoreLink).toHaveClass('text-primary font-medium')
  })

  it('handles posts with special characters in title', () => {
    const postWithSpecialChars = {
      ...mockPost,
      title: 'Test & More: "Special" Characters'
    }
    
    render(<PostCard post={postWithSpecialChars} />)
    
    expect(screen.getByText('Test & More: "Special" Characters')).toBeInTheDocument()
  })
})
