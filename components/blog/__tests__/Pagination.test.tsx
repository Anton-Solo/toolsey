import { render, screen } from '@testing-library/react'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'
import { Pagination, PaginationInfo } from '@/components/blog/Pagination'

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}))

jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>
  }
})

const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>

describe('Pagination', () => {
  const mockMeta = {
    current_page: 3,
    last_page: 10,
    per_page: 12,
    total: 120
  }

  beforeEach(() => {
    jest.clearAllMocks()
    const mockSearchParams = new URLSearchParams('category=1&sort=newest') as ReadonlyURLSearchParams
    mockUseSearchParams.mockReturnValue(mockSearchParams)
  })

  it('renders pagination controls', () => {
    render(<Pagination meta={mockMeta} />)
    
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument()
    expect(screen.getByLabelText('Next page')).toBeInTheDocument()
  })

  it('renders page numbers correctly', () => {
    render(<Pagination meta={mockMeta} />)
    
    // Should show pages around current page (3)
    expect(screen.getByLabelText('Page 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Page 2')).toBeInTheDocument()
    expect(screen.getByLabelText('Page 3')).toBeInTheDocument()
    expect(screen.getByLabelText('Page 4')).toBeInTheDocument()
    expect(screen.getByLabelText('Page 5')).toBeInTheDocument()
    expect(screen.getByLabelText('Page 10')).toBeInTheDocument()
  })

  it('highlights current page', () => {
    render(<Pagination meta={mockMeta} />)
    
    const currentPageLink = screen.getByLabelText('Page 3')
    expect(currentPageLink).toHaveAttribute('aria-current', 'page')
    expect(currentPageLink).toHaveClass('bg-primary text-white')
  })

  it('disables previous button on first page', () => {
    const firstPageMeta = { ...mockMeta, current_page: 1 }
    render(<Pagination meta={firstPageMeta} />)
    
    const previousButton = screen.getByText('Previous')
    expect(previousButton.closest('div')).toHaveClass('cursor-not-allowed')
    expect(previousButton.closest('div')).toHaveClass('bg-gray-100')
  })

  it('disables next button on last page', () => {
    const lastPageMeta = { ...mockMeta, current_page: 10 }
    render(<Pagination meta={lastPageMeta} />)
    
    const nextButton = screen.getByText('Next')
    expect(nextButton.closest('div')).toHaveClass('cursor-not-allowed')
    expect(nextButton.closest('div')).toHaveClass('bg-gray-100')
  })

  it('does not render when there is only one page', () => {
    const singlePageMeta = { ...mockMeta, last_page: 1 }
    const { container } = render(<Pagination meta={singlePageMeta} />)
    
    expect(container.firstChild).toBeNull()
  })

  it('builds correct URLs with search parameters', () => {
    render(<Pagination meta={mockMeta} />)
    
    const page2Link = screen.getByLabelText('Page 2')
    expect(page2Link).toHaveAttribute('href', '/blog?category=1&sort=newest&page=2')
  })

  it('uses custom base URL when provided', () => {
    render(<Pagination meta={mockMeta} baseUrl="/custom" />)
    
    const page2Link = screen.getByLabelText('Page 2')
    expect(page2Link).toHaveAttribute('href', '/custom?category=1&sort=newest&page=2')
  })

  it('applies custom className', () => {
    const { container } = render(<Pagination meta={mockMeta} className="custom-class" />)
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('shows ellipsis for large page ranges', () => {
    const largeMeta = { ...mockMeta, current_page: 5, last_page: 20 }
    render(<Pagination meta={largeMeta} />)
    
    expect(screen.getAllByText('...')).toHaveLength(2)
  })

  it('renders mobile pagination info', () => {
    render(<Pagination meta={mockMeta} />)
    
    expect(screen.getByText('Page 3 of 10')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<Pagination meta={mockMeta} />)
    
    const previousButton = screen.getByLabelText('Previous page')
    const nextButton = screen.getByLabelText('Next page')
    const currentPage = screen.getByLabelText('Page 3')
    
    expect(previousButton).toBeInTheDocument()
    expect(nextButton).toBeInTheDocument()
    expect(currentPage).toHaveAttribute('aria-current', 'page')
  })
})

describe('PaginationInfo', () => {
  const mockMeta = {
    current_page: 3,
    last_page: 10,
    per_page: 12,
    total: 120
  }

  it('renders pagination info correctly', () => {
    render(<PaginationInfo meta={mockMeta} />)
    
    expect(screen.getByText('Showing 25 to 36 of 120 results (Page 3 of 10)')).toBeInTheDocument()
  })

  it('calculates correct range for first page', () => {
    const firstPageMeta = { ...mockMeta, current_page: 1 }
    render(<PaginationInfo meta={firstPageMeta} />)
    
    expect(screen.getByText('Showing 1 to 12 of 120 results (Page 1 of 10)')).toBeInTheDocument()
  })

  it('calculates correct range for last page', () => {
    const lastPageMeta = { ...mockMeta, current_page: 10 }
    render(<PaginationInfo meta={lastPageMeta} />)
    
    expect(screen.getByText('Showing 109 to 120 of 120 results (Page 10 of 10)')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<PaginationInfo meta={mockMeta} className="custom-class" />)
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('handles edge case with total less than per_page', () => {
    const smallMeta = { ...mockMeta, current_page: 1, last_page: 1, per_page: 12, total: 5 }
    render(<PaginationInfo meta={smallMeta} />)
    
    expect(screen.getByText('Showing 1 to 5 of 5 results (Page 1 of 1)')).toBeInTheDocument()
  })
})
