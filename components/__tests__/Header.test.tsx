import { render, screen, fireEvent } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import Header from '@/components/Header'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>
  }
})

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUsePathname.mockReturnValue('/')
  })

  it('renders logo and navigation links', () => {
    render(<Header />)
    
    expect(screen.getByAltText('Logo')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Get started')).toBeInTheDocument()
  })

  it('shows mobile menu button on small screens', () => {
    render(<Header />)
    
    const menuButton = screen.getByLabelText('Open menu')
    expect(menuButton).toBeInTheDocument()
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens mobile menu when burger button is clicked', () => {
    render(<Header />)
    
    const menuButton = screen.getByLabelText('Open menu')
    fireEvent.click(menuButton)
    
    expect(screen.getAllByLabelText('Close menu')).toHaveLength(2)
    expect(screen.getAllByRole('button', { name: 'Close menu' })).toHaveLength(2)
  })

  it('closes mobile menu when close button is clicked', () => {
    render(<Header />)
    
    const menuButton = screen.getByLabelText('Open menu')
    fireEvent.click(menuButton)
    
    const closeButtons = screen.getAllByLabelText('Close menu')
    const closeButton = closeButtons[1]
    fireEvent.click(closeButton)
    
    expect(screen.queryByLabelText('Close menu')).not.toBeInTheDocument()
  })

  it('closes mobile menu when clicking on overlay', () => {
    render(<Header />)
    
    const menuButton = screen.getByLabelText('Open menu')
    fireEvent.click(menuButton)
    
    const closeButtons = screen.getAllByLabelText('Close menu')
    const overlay = closeButtons[0]
    fireEvent.click(overlay)
    
    expect(screen.queryByLabelText('Close menu')).not.toBeInTheDocument()
  })

  it('highlights active link correctly', () => {
    mockUsePathname.mockReturnValue('/features')
    render(<Header />)
    
    const featuresLink = screen.getByText('Features')
    expect(featuresLink).toHaveClass('text-primary font-bold')
  })

  it('handles blog route highlighting correctly', () => {
    mockUsePathname.mockReturnValue('/blog/some-post')
    render(<Header />)
    
    const menuButton = screen.getByLabelText('Open menu')
    fireEvent.click(menuButton)
    
    const blogLinks = screen.getAllByText('Blog')
    const mobileBlogLink = blogLinks[1] // Mobile menu link
    expect(mobileBlogLink).toHaveClass('text-primary font-bold')
  })

  it('renders mobile menu with all navigation links', () => {
    render(<Header />)
    
    const menuButton = screen.getByLabelText('Open menu')
    fireEvent.click(menuButton)
    
    const featuresLinks = screen.getAllByText('Features')
    const pricingLinks = screen.getAllByText('Pricing')
    const aboutUsLinks = screen.getAllByText('About us')
    const supportLinks = screen.getAllByText('Support')
    const blogLinks = screen.getAllByText('Blog')
    const loginLinks = screen.getAllByText('Login')
    
    expect(featuresLinks).toHaveLength(2)
    expect(pricingLinks).toHaveLength(2)
    expect(aboutUsLinks).toHaveLength(2)
    expect(supportLinks).toHaveLength(2)
    expect(blogLinks).toHaveLength(2)
    expect(loginLinks).toHaveLength(2)
  })

  it('closes mobile menu when navigation link is clicked', () => {
    render(<Header />)
    
    const menuButton = screen.getByLabelText('Open menu')
    fireEvent.click(menuButton)
    
    const featuresLinks = screen.getAllByText('Features')
    const mobileFeaturesLink = featuresLinks[1]
    fireEvent.click(mobileFeaturesLink)
    
    expect(screen.queryByLabelText('Close menu')).not.toBeInTheDocument()
  })

  it('has correct accessibility attributes', () => {
    render(<Header />)
    
    const menuButton = screen.getByLabelText('Open menu')
    expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu')
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })
})
