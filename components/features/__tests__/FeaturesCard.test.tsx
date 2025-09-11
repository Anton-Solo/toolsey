import { render, screen } from '@testing-library/react'
import FeaturesCard from '@/components/features/FeaturesCard'

// Mock компонент для тестування
const MockSVGComponent = ({ className }: { className?: string }) => (
  <div data-testid="mock-svg" className={className}>
    Mock SVG Component
  </div>
)

describe('FeaturesCard', () => {
  const mockProps = {
    id: 1,
    title: 'Test Feature',
    subtitle: 'Test Subtitle',
    description: 'This is a test description',
    whyItMatters: 'This is why it matters',
    index: 0,
  }

  it('renders all text content correctly', () => {
    render(<FeaturesCard {...mockProps} />)
    
    expect(screen.getByText('Test Feature')).toBeInTheDocument()
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
    expect(screen.getByText('This is a test description')).toBeInTheDocument()
    expect(screen.getByText('Why It Matters:')).toBeInTheDocument()
    expect(screen.getByText('This is why it matters')).toBeInTheDocument()
  })

  it('renders with SVG component when provided', () => {
    render(<FeaturesCard {...mockProps} Anim={MockSVGComponent} />)
    
    expect(screen.getByTestId('mock-svg')).toBeInTheDocument()
    expect(screen.getByText('Mock SVG Component')).toBeInTheDocument()
  })

  it('renders with React element when provided', () => {
    const mockElement = <div data-testid="mock-element">Mock Element</div>
    render(<FeaturesCard {...mockProps} Anim={mockElement} />)
    
    expect(screen.getByTestId('mock-element')).toBeInTheDocument()
  })

  it('applies correct CSS classes for even index', () => {
    const { container } = render(<FeaturesCard {...mockProps} index={0} />)
    const cardElement = container.firstChild as HTMLElement
    
    expect(cardElement).toHaveClass('flex-row')
    expect(cardElement).not.toHaveClass('lg:flex-row-reverse')
  })

  it('applies correct CSS classes for odd index', () => {
    const { container } = render(<FeaturesCard {...mockProps} index={1} />)
    const cardElement = container.firstChild as HTMLElement
    
    expect(cardElement).toHaveClass('lg:flex-row-reverse')
  })

  it('handles missing Anim prop gracefully', () => {
    render(<FeaturesCard {...mockProps} />)
    
    // Should render without errors
    expect(screen.getByText('Test Feature')).toBeInTheDocument()
  })
})
