import { render, screen } from '@testing-library/react'
import { AdvantageCard } from '@/components/home/AdvantageCard'
import { IAdvantage } from '@/types/home.types'

const MockIcon = ({ className }: { className?: string }) => (
  <div data-testid="mock-icon" className={className}>Icon</div>
)

describe('AdvantageCard', () => {
  const mockAdvantage: IAdvantage = {
    id: 1,
    label: 'Test Advantage',
    text: 'This is a test advantage description that explains the benefit.',
    Icon: MockIcon
  }

  it('renders advantage label and text correctly', () => {
    render(<AdvantageCard {...mockAdvantage} />)
    
    expect(screen.getByText('Test Advantage')).toBeInTheDocument()
    expect(screen.getByText('This is a test advantage description that explains the benefit.')).toBeInTheDocument()
  })

  it('renders icon component', () => {
    render(<AdvantageCard {...mockAdvantage} />)
    
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<AdvantageCard {...mockAdvantage} />)
    const cardElement = container.firstChild as HTMLElement
    
    expect(cardElement).toHaveClass('lg:block flex flex-col items-center max-w-[416px]')
  })

  it('applies correct classes to icon', () => {
    render(<AdvantageCard {...mockAdvantage} />)
    
    const icon = screen.getByTestId('mock-icon')
    expect(icon).toHaveClass('mb-3')
  })

  it('applies correct classes to label', () => {
    render(<AdvantageCard {...mockAdvantage} />)
    
    const label = screen.getByText('Test Advantage')
    expect(label).toHaveClass('p-body-24 font-bold mb-3')
  })

  it('applies correct classes to text', () => {
    render(<AdvantageCard {...mockAdvantage} />)
    
    const text = screen.getByText('This is a test advantage description that explains the benefit.')
    expect(text).toHaveClass('p-body-16 lg:text-left text-center')
  })

  it('renders with different icon components', () => {
    const CustomIcon = ({ className }: { className?: string }) => (
      <div data-testid="custom-icon" className={className}>Custom Icon</div>
    )
    
    const customAdvantage = { ...mockAdvantage, Icon: CustomIcon }
    render(<AdvantageCard {...customAdvantage} />)
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument()
  })

  it('handles long text content', () => {
    const longTextAdvantage = {
      ...mockAdvantage,
      text: 'This is a very long advantage description that contains multiple sentences and should still render correctly without breaking the layout or causing any issues with the component structure.'
    }
    
    render(<AdvantageCard {...longTextAdvantage} />)
    
    expect(screen.getByText(longTextAdvantage.text)).toBeInTheDocument()
  })

  it('handles empty text content', () => {
    const emptyTextAdvantage = { ...mockAdvantage, text: '' }
    render(<AdvantageCard {...emptyTextAdvantage} />)
    
    expect(screen.getByText('Test Advantage')).toBeInTheDocument()
    // Check that the text element exists but is empty
    const textElement = screen.getByText('Test Advantage').nextSibling
    expect(textElement).toBeInTheDocument()
  })

  it('maintains proper structure with all elements', () => {
    render(<AdvantageCard {...mockAdvantage} />)
    
    // Check that all elements are present in correct order
    const cardElement = screen.getByText('Test Advantage').closest('div')
    expect(cardElement).toBeInTheDocument()
    
    // Icon should be first
    const icon = screen.getByTestId('mock-icon')
    expect(icon).toBeInTheDocument()
    
    // Label should be second
    const label = screen.getByText('Test Advantage')
    expect(label).toBeInTheDocument()
    
    // Text should be last
    const text = screen.getByText('This is a test advantage description that explains the benefit.')
    expect(text).toBeInTheDocument()
  })
})
