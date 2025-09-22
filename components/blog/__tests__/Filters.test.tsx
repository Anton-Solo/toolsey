import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Filters } from '@/components/blog/Filters'
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}))

jest.mock('@/components/icons/blog/SearchIcon', () => ({
  SearchIcon: () => <div data-testid="search-icon" />
}))

jest.mock('@/components/ui/Select', () => ({
  Select: ({ options, value, onChange, placeholder, ...props }: { 
    options: Array<{ value: string; label: string }>; 
    value?: string; 
    onChange?: (value: string) => void; 
    placeholder?: string; 
    [key: string]: unknown 
  }) => (
    <select
      {...props}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      data-testid="select"
    >
      <option value="">{placeholder}</option>
      {options.filter((option: { value: string; label: string }) => option.value !== '').map((option: { value: string; label: string }) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}))

const mockPush = jest.fn()
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>
const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>

describe('Filters', () => {
  const mockSearchParams = new URLSearchParams()

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    })
    mockUseSearchParams.mockReturnValue(mockSearchParams as ReadonlyURLSearchParams)
  })

  const mockCategories = [
    { id: 1, slug: 'marketing', title: 'Marketing', summary: 'Marketing tips' },
    { id: 2, slug: 'sales', title: 'Sales', summary: 'Sales strategies' },
    { id: 3, slug: 'productivity', title: 'Productivity', summary: 'Productivity tools' }
  ]

  it('renders search input and select dropdowns', () => {
    render(<Filters availableCategories={mockCategories} />)
    
    expect(screen.getByPlaceholderText('Search articles, topics, or keywords')).toBeInTheDocument()
    expect(screen.getByTestId('search-icon')).toBeInTheDocument()
    expect(screen.getAllByTestId('select')).toHaveLength(2)
  })

  it('renders category options including "All categories"', () => {
    render(<Filters availableCategories={mockCategories} />)
    
    const categorySelect = screen.getAllByTestId('select')[0]
    expect(categorySelect).toBeInTheDocument()
    
    // Check if all categories are rendered
    expect(screen.getByText('All categories')).toBeInTheDocument()
    expect(screen.getByText('Marketing')).toBeInTheDocument()
    expect(screen.getByText('Sales')).toBeInTheDocument()
    expect(screen.getByText('Productivity')).toBeInTheDocument()
  })

  it('renders sort options', () => {
    render(<Filters availableCategories={mockCategories} />)
    
    expect(screen.getByText('Newest')).toBeInTheDocument()
    expect(screen.getByText('Most popular')).toBeInTheDocument()
    expect(screen.getByText('Oldest')).toBeInTheDocument()
  })

  it('handles empty categories array', () => {
    render(<Filters availableCategories={[]} />)
    
    expect(screen.getByText('All categories')).toBeInTheDocument()
    expect(screen.getAllByTestId('select')).toHaveLength(2)
  })

  it('handles undefined categories', () => {
    render(<Filters />)
    
    expect(screen.getByText('All categories')).toBeInTheDocument()
    expect(screen.getAllByTestId('select')).toHaveLength(2)
  })

  it('updates search term when typing', async () => {
    const user = userEvent.setup()
    render(<Filters availableCategories={mockCategories} />)
    
    const searchInput = screen.getByPlaceholderText('Search articles, topics, or keywords')
    await user.type(searchInput, 'test search')
    
    expect(searchInput).toHaveValue('test search')
  })

  it('submits search form and updates URL', async () => {
    const user = userEvent.setup()
    render(<Filters availableCategories={mockCategories} />)
    
    const searchInput = screen.getByPlaceholderText('Search articles, topics, or keywords')
    
    await user.type(searchInput, 'test search')
    await user.keyboard('{Enter}')
    
    expect(mockPush).toHaveBeenCalledWith('/blog?searchText=test+search')
  })

  it('prevents default form submission', async () => {
    render(<Filters availableCategories={mockCategories} />)
    
    const searchInput = screen.getByPlaceholderText('Search articles, topics, or keywords')
    const form = searchInput.closest('form')
    
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
    const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault')
    
    fireEvent(form!, submitEvent)
    
    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('updates category filter and navigates to new URL', async () => {
    const user = userEvent.setup()
    render(<Filters availableCategories={mockCategories} />)
    
    const categorySelect = screen.getAllByTestId('select')[0]
    await user.selectOptions(categorySelect, '1')
    
    expect(mockPush).toHaveBeenCalledWith('/blog?category=1')
  })

  it('updates sort filter and navigates to new URL', async () => {
    const user = userEvent.setup()
    render(<Filters availableCategories={mockCategories} />)
    
    const sortSelect = screen.getAllByTestId('select')[1]
    await user.selectOptions(sortSelect, 'popular')
    
    expect(mockPush).toHaveBeenCalledWith('/blog?sort=popular')
  })

  it('removes page parameter when updating filters', async () => {
    // Set up search params with page parameter
    const searchParamsWithPage = new URLSearchParams('page=2&category=1')
    mockUseSearchParams.mockReturnValue(searchParamsWithPage as ReadonlyURLSearchParams)
    
    const user = userEvent.setup()
    render(<Filters availableCategories={mockCategories} />)
    
    const sortSelect = screen.getAllByTestId('select')[1]
    await user.selectOptions(sortSelect, 'popular')
    
    expect(mockPush).toHaveBeenCalledWith('/blog?category=1&sort=popular')
  })

  it('removes filter parameter when selecting empty value', async () => {
    // Set up search params with existing category
    const searchParamsWithCategory = new URLSearchParams('category=1&sort=newest')
    mockUseSearchParams.mockReturnValue(searchParamsWithCategory as ReadonlyURLSearchParams)
    
    const user = userEvent.setup()
    render(<Filters availableCategories={mockCategories} />)
    
    const categorySelect = screen.getAllByTestId('select')[0]
    await user.selectOptions(categorySelect, '')
    
    expect(mockPush).toHaveBeenCalledWith('/blog?sort=newest')
  })

  it('shows current category from URL params', () => {
    const searchParamsWithCategory = new URLSearchParams('category=2')
    mockUseSearchParams.mockReturnValue(searchParamsWithCategory as ReadonlyURLSearchParams)
    
    render(<Filters availableCategories={mockCategories} />)
    
    const categorySelect = screen.getAllByTestId('select')[0]
    expect(categorySelect).toHaveValue('2')
  })

  it('shows current sort from URL params', () => {
    const searchParamsWithSort = new URLSearchParams('sort=popular')
    mockUseSearchParams.mockReturnValue(searchParamsWithSort as ReadonlyURLSearchParams)
    
    render(<Filters availableCategories={mockCategories} />)
    
    const sortSelect = screen.getAllByTestId('select')[1]
    expect(sortSelect).toHaveValue('popular')
  })

  it('defaults to "newest" sort when no sort param', () => {
    const emptySearchParams = new URLSearchParams()
    mockUseSearchParams.mockReturnValue(emptySearchParams as ReadonlyURLSearchParams)
    
    render(<Filters availableCategories={mockCategories} />)
    
    const sortSelect = screen.getAllByTestId('select')[1]
    expect(sortSelect).toHaveValue('newest')
  })

  it('defaults to empty category when no category param', () => {
    const emptySearchParams = new URLSearchParams()
    mockUseSearchParams.mockReturnValue(emptySearchParams as ReadonlyURLSearchParams)
    
    render(<Filters availableCategories={mockCategories} />)
    
    const categorySelect = screen.getAllByTestId('select')[0]
    expect(categorySelect).toHaveValue('')
  })

  it('has correct accessibility attributes', () => {
    render(<Filters availableCategories={mockCategories} />)
    
    const searchInput = screen.getByPlaceholderText('Search articles, topics, or keywords')
    expect(searchInput).toHaveAttribute('aria-label', 'Search articles, topics, or keywords')
    
    const selects = screen.getAllByTestId('select')
    expect(selects[0]).toHaveAttribute('aria-label', 'All categories')
    expect(selects[1]).toHaveAttribute('aria-label', 'Most recent')
  })

  it('handles multiple filter updates correctly', async () => {
    const user = userEvent.setup()
    render(<Filters availableCategories={mockCategories} />)
    
    // Update category
    const categorySelect = screen.getAllByTestId('select')[0]
    await user.selectOptions(categorySelect, '1')
    
    // Update sort
    const sortSelect = screen.getAllByTestId('select')[1]
    await user.selectOptions(sortSelect, 'popular')
    
    // Both updates should be called
    expect(mockPush).toHaveBeenCalledTimes(2)
    expect(mockPush).toHaveBeenNthCalledWith(1, '/blog?category=1')
    expect(mockPush).toHaveBeenNthCalledWith(2, '/blog?sort=popular')
  })
})
