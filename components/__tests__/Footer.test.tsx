import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

// Mock Next.js components
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>
  }
})

jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />
  }
})

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

describe('Footer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUsePathname.mockReturnValue('/')
  })

  it('renders footer with logo and description', () => {
    render(<Footer />)
    
    expect(screen.getByAltText('logo')).toBeInTheDocument()
    expect(screen.getByText(/Toolsey was designed to organize and automate your sales process/)).toBeInTheDocument()
  })

  it('renders current year in copyright', () => {
    render(<Footer />)
    
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`© ${currentYear} Toolsey. All Rights Reserved.`)).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Footer />)
    
    expect(screen.getByText('Explore')).toBeInTheDocument()
    expect(screen.getByText('Contact us')).toBeInTheDocument()
    expect(screen.getByText('Download app')).toBeInTheDocument()
  })

  it('renders social media links', () => {
    render(<Footer />)
    
    // Check that social links are rendered (they should have aria-label attributes)
    const socialLinks = screen.getAllByRole('link')
    const socialLinkLabels = socialLinks.map(link => link.getAttribute('aria-label')).filter(Boolean)
    
    expect(socialLinkLabels.length).toBeGreaterThan(0)
  })

  it('renders app download links', () => {
    render(<Footer />)
    
    expect(screen.getByAltText('ios app')).toBeInTheDocument()
    expect(screen.getByAltText('google app')).toBeInTheDocument()
  })

  it('renders legal links', () => {
    render(<Footer />)
    
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText('Terms & Conditions')).toBeInTheDocument()
  })

  it('applies blue background on about-us page', () => {
    mockUsePathname.mockReturnValue('/about-us')
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-primary-light')
  })

  it('applies white background on other pages', () => {
    mockUsePathname.mockReturnValue('/features')
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-standart-white')
  })

  it('has correct accessibility structure', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    
    // Check that images have proper alt text
    expect(screen.getByAltText('logo')).toBeInTheDocument()
    expect(screen.getByAltText('ios app')).toBeInTheDocument()
    expect(screen.getByAltText('google app')).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(<Footer />)
    
    expect(screen.getByText('Contact us')).toBeInTheDocument()
  })

  it('has proper link attributes for external links', () => {
    render(<Footer />)
    
    const socialLinks = screen.getAllByRole('link')
    socialLinks.forEach(link => {
      const href = link.getAttribute('href')
      if (href && (href.startsWith('http') || href.startsWith('mailto'))) {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      }
    })
  })
})
