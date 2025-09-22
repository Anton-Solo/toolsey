import { render, screen } from '@testing-library/react'
import { PricingCard } from '@/components/pricing/PricingCard'
import { PricingPlan } from '@/types/pricing.types'

jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>
  }
})

describe('PricingCard', () => {
  const mockPlan: PricingPlan = {
    id: '1',
    name: 'Basic Plan',
    description: 'Perfect for small teams',
    currency: '$',
    price: {
      monthly: 29,
      yearly: 290
    },
    period: 'month',
    ctaText: 'Get Started',
    ctaHref: '/pricing',
    isPopular: false,
    features: [
      {
        id: '1',
        text: 'Up to 5 users',
        included: true
      },
      {
        id: '2',
        text: 'Basic support',
        included: true
      },
      {
        id: '3',
        text: 'Advanced analytics',
        included: false
      }
    ],
    additionalInfo: 'Cancel anytime'
  }

  const mockPopularPlan: PricingPlan = {
    ...mockPlan,
    id: '2',
    name: 'Pro Plan',
    description: 'Most Popular',
    isPopular: true,
    features: [
      {
        id: '1',
        text: 'Up to 25 users',
        included: true
      },
      {
        id: '2',
        text: 'Priority support',
        included: true
      },
      {
        id: '3',
        text: 'Advanced analytics',
        included: true
      }
    ]
  }

  it('renders plan name and price correctly', () => {
    render(<PricingCard plan={mockPlan} period="monthly" />)
    
    expect(screen.getByText('Basic Plan')).toBeInTheDocument()
    expect(screen.getByText('$')).toBeInTheDocument()
    expect(screen.getByText('29')).toBeInTheDocument()
    expect(screen.getByText('/month')).toBeInTheDocument()
  })

  it('renders yearly pricing when period is yearly', () => {
    render(<PricingCard plan={mockPlan} period="yearly" />)
    
    expect(screen.getByText('290')).toBeInTheDocument()
    expect(screen.getByText('/month')).toBeInTheDocument()
  })

  it('renders CTA button with correct text', () => {
    render(<PricingCard plan={mockPlan} period="monthly" />)
    
    const ctaButton = screen.getByRole('link', { name: 'Get Started' })
    expect(ctaButton).toBeInTheDocument()
    expect(ctaButton).toHaveClass('btn btn-primary w-full')
  })

  it('renders all features with correct icons', () => {
    render(<PricingCard plan={mockPlan} period="monthly" />)
    
    // Check included features (should have checkmark)
    expect(screen.getByText('Up to 5 users')).toBeInTheDocument()
    expect(screen.getByText('Basic support')).toBeInTheDocument()
    
    // Check excluded features (should have X icon)
    expect(screen.getByText('Advanced analytics')).toBeInTheDocument()
  })

  it('renders popular badge for popular plans', () => {
    render(<PricingCard plan={mockPopularPlan} period="monthly" />)
    
    expect(screen.getByText('Most Popular')).toBeInTheDocument()
  })

  it('does not render popular badge for non-popular plans', () => {
    render(<PricingCard plan={mockPlan} period="monthly" />)
    
    expect(screen.queryByText('Most Popular')).not.toBeInTheDocument()
  })

  it('renders additional info when provided', () => {
    render(<PricingCard plan={mockPlan} period="monthly" />)
    
    expect(screen.getByText('Cancel anytime')).toBeInTheDocument()
  })

  it('does not render additional info when not provided', () => {
    const planWithoutInfo = { ...mockPlan, additionalInfo: undefined }
    render(<PricingCard plan={planWithoutInfo} period="monthly" />)
    
    expect(screen.queryByText('Cancel anytime')).not.toBeInTheDocument()
  })

  it('applies correct CSS classes for hover effects', () => {
    const { container } = render(<PricingCard plan={mockPlan} period="monthly" />)
    const cardElement = container.firstChild as HTMLElement
    
    expect(cardElement).toHaveClass('hover:shadow-lg hover:border-primary')
  })

  it('renders features with correct styling based on inclusion', () => {
    render(<PricingCard plan={mockPlan} period="monthly" />)
    
    // Included features should have primary color
    const includedFeature = screen.getByText('Up to 5 users')
    expect(includedFeature).toHaveClass('text-foreground')
    
    // Excluded features should have muted color
    const excludedFeature = screen.getByText('Advanced analytics')
    expect(excludedFeature).toHaveClass('text-accent-dark')
  })

  it('has proper accessibility structure', () => {
    render(<PricingCard plan={mockPlan} period="monthly" />)
    
    // Check that the plan name is rendered as a heading
    expect(screen.getByRole('heading', { name: 'Basic Plan' })).toBeInTheDocument()
    
    // Check that CTA button is accessible
    const ctaButton = screen.getByRole('link', { name: 'Get Started' })
    expect(ctaButton).toBeInTheDocument()
  })

  it('renders correct number of features', () => {
    render(<PricingCard plan={mockPlan} period="monthly" />)
    
    // Should render exactly 3 features
    const featureItems = screen.getAllByRole('listitem')
    expect(featureItems).toHaveLength(3)
  })

  it('handles empty features array', () => {
    const planWithNoFeatures = { ...mockPlan, features: [] }
    render(<PricingCard plan={planWithNoFeatures} period="monthly" />)
    
    const featureItems = screen.queryAllByRole('listitem')
    expect(featureItems).toHaveLength(0)
  })
})
