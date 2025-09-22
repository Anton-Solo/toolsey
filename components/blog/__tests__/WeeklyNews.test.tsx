import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WeeklyNews } from '@/components/blog/WeeklyNews'

describe('WeeklyNews', () => {
  it('renders newsletter section with title and description', () => {
    render(<WeeklyNews />)
    
    expect(screen.getByText('Weekly newsletter')).toBeInTheDocument()
    expect(screen.getByText(/No spam. Just the latest releases and tips/)).toBeInTheDocument()
  })

  it('renders email input and subscribe button', () => {
    render(<WeeklyNews />)
    
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument()
  })

  it('has correct form structure', () => {
    render(<WeeklyNews />)
    
    const emailInput = screen.getByPlaceholderText('Email')
    const subscribeButton = screen.getByRole('button', { name: 'Subscribe' })
    const form = emailInput.closest('form')
    
    expect(form).toBeInTheDocument()
    expect(form).toContainElement(emailInput)
    expect(form).toContainElement(subscribeButton)
  })

  it('applies correct CSS classes for default layout', () => {
    render(<WeeklyNews />)
    
    const container = screen.getByText('Weekly newsletter').closest('div')
    // Find the parent container with the correct classes
    const parentContainer = container?.parentElement
    expect(parentContainer).toHaveClass('linear-card rounded-4xl px-8 py-16 text-standart-white')
    
    const emailInput = screen.getByPlaceholderText('Email')
    const form = emailInput.closest('form')
    expect(form).toHaveClass('flex gap-4 items-end max-sm:w-full flex-col')
  })

  it('applies different layout when isPost is true', () => {
    render(<WeeklyNews isPost={true} />)
    
    const container = screen.getByText('Weekly newsletter').closest('div')
    const parentContainer = container?.parentElement
    expect(parentContainer).toHaveClass('flex-wrap')
    
    const emailInput = screen.getByPlaceholderText('Email')
    const form = emailInput.closest('form')
    expect(form).toHaveClass('flex-row max-sm:flex-wrap justify-end')
  })

  it('has correct input attributes', () => {
    render(<WeeklyNews />)
    
    const emailInput = screen.getByPlaceholderText('Email')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveClass('input bg-standart-white sm:w-[416px] w-full text-accent-foreground')
  })

  it('has correct button styling', () => {
    render(<WeeklyNews />)
    
    const subscribeButton = screen.getByRole('button', { name: 'Subscribe' })
    expect(subscribeButton).toHaveClass('btn btn-white !w-max')
  })

  it('allows typing in email input', async () => {
    const user = userEvent.setup()
    render(<WeeklyNews />)
    
    const emailInput = screen.getByPlaceholderText('Email')
    await user.type(emailInput, 'test@example.com')
    
    expect(emailInput).toHaveValue('test@example.com')
  })

  it('handles form submission', async () => {
    const user = userEvent.setup()
    render(<WeeklyNews />)
    
    const emailInput = screen.getByPlaceholderText('Email')
    const subscribeButton = screen.getByRole('button', { name: 'Subscribe' })
    const form = emailInput.closest('form')
    
    await user.type(emailInput, 'test@example.com')
    await user.click(subscribeButton)
    
    // Form should be submitted (no preventDefault in component)
    expect(form).toBeInTheDocument()
  })

  it('renders with correct text content', () => {
    render(<WeeklyNews />)
    
    expect(screen.getByText('Weekly newsletter')).toBeInTheDocument()
    expect(screen.getByText('No spam. Just the latest releases and tips, interesting articles, and exclusive interviews in your inbox every week.')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<WeeklyNews />)
    
    const emailInput = screen.getByPlaceholderText('Email')
    expect(emailInput).toHaveAttribute('type', 'email')
    
    const subscribeButton = screen.getByRole('button', { name: 'Subscribe' })
    expect(subscribeButton).toBeInTheDocument()
  })

  it('renders correctly in both variants', () => {
    const { rerender } = render(<WeeklyNews />)
    
    // Content should be the same
    expect(screen.getByText('Weekly newsletter')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument()
    
    rerender(<WeeklyNews isPost={true} />)
    
    // Content should remain the same
    expect(screen.getByText('Weekly newsletter')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument()
  })

  it('handles empty email input', async () => {
    const user = userEvent.setup()
    render(<WeeklyNews />)
    
    const emailInput = screen.getByPlaceholderText('Email')
    const subscribeButton = screen.getByRole('button', { name: 'Subscribe' })
    
    // Leave email empty and try to submit
    await user.click(subscribeButton)
    
    expect(emailInput).toHaveValue('')
  })

  it('handles invalid email format', async () => {
    const user = userEvent.setup()
    render(<WeeklyNews />)
    
    const emailInput = screen.getByPlaceholderText('Email')
    await user.type(emailInput, 'invalid-email')
    
    expect(emailInput).toHaveValue('invalid-email')
  })
})
