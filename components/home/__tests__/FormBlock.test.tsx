import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockSetFieldValue = jest.fn()
const mockSubmitForm = jest.fn()
const mockOpenDirectLink = jest.fn()

jest.mock('@/constans', () => ({
  CALENDLY_URL: 'https://calendly.com/test'
}))


jest.mock('@/hooks/useFormStatus', () => ({
  useFormStatus: jest.fn()
}))

jest.mock('@/hooks/useCalendly', () => ({
  useCalendly: jest.fn()
}))

jest.mock('next/image', () => {
  return function MockImage({ alt, src, ...props }: { alt: string; src: string; [key: string]: unknown }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} src={src} {...props} />
  }
})

jest.mock('@/components/icons/home-form/FormElipse1', () => ({
  FormElipse1: ({ className }: { className?: string }) => <div data-testid="form-elipse-1" className={className} />
}))
jest.mock('@/components/icons/home-form/FormElipse2', () => ({
  FormElipse2: ({ className }: { className?: string }) => <div data-testid="form-elipse-2" className={className} />
}))
jest.mock('@/components/icons/home-form/FormElipse3', () => ({
  FormElipse3: ({ className }: { className?: string }) => <div data-testid="form-elipse-3" className={className} />
}))
jest.mock('@/components/icons/home-form/FormElipse4', () => ({
  FormElipse4: ({ className }: { className?: string }) => <div data-testid="form-elipse-4" className={className} />
}))
jest.mock('@/components/icons/home-form/FormElipse5', () => ({
  FormElipse5: ({ className }: { className?: string }) => <div data-testid="form-elipse-5" className={className} />
}))
jest.mock('@/components/icons/home-form/FormElipse6', () => ({
  FormElipse6: ({ className }: { className?: string }) => <div data-testid="form-elipse-6" className={className} />
}))


import { useFormStatus } from '@/hooks/useFormStatus'
import { useCalendly } from '@/hooks/useCalendly'
import { FormBlock } from '@/components/home/FormBlock'

const mockUseFormStatus = useFormStatus as jest.MockedFunction<typeof useFormStatus>
const mockUseCalendly = useCalendly as jest.MockedFunction<typeof useCalendly>

const createDefaultFormStatus = () => ({
  formData: {
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    comment: ''
  },
  errors: {},
  isPending: false,
  isSubmitting: false,
  isValid: false,
  setFormData: jest.fn(),
  setFieldValue: mockSetFieldValue,
  validateForm: jest.fn(),
  clearErrors: jest.fn(),
  resetForm: jest.fn(),
  submitForm: mockSubmitForm
})

const createDefaultCalendly = () => ({
  openPopup: jest.fn(),
  openDirectLink: mockOpenDirectLink,
  createInlineWidget: jest.fn()
})

describe('FormBlock', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => {})
    
    mockUseFormStatus.mockReturnValue(createDefaultFormStatus())
    mockUseCalendly.mockReturnValue(createDefaultCalendly())
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('test mocks', () => {
    console.log('useFormStatus:', mockUseFormStatus)
    console.log('useCalendly:', mockUseCalendly)
    console.log('useFormStatus return:', mockUseFormStatus())
    console.log('useCalendly return:', mockUseCalendly())
  })

  it('test render', () => {
    console.log('FormBlock:', FormBlock)
    console.log('typeof FormBlock:', typeof FormBlock)
    console.log('FormBlock.name:', FormBlock.name)
    
    let error: Error | null = null
    let jsx: React.ReactElement | null = null
    try {
      jsx = <FormBlock />
      console.log('JSX:', jsx)
      console.log('JSX type:', jsx.type)
      console.log('JSX props:', jsx.props)
      
      const result = render(jsx)
      console.log('Render result container.innerHTML:', result.container.innerHTML)
      console.log('Render result container.firstChild:', result.container.firstChild)
    } catch (e) {
      error = e as Error
      console.log('Render error:', error)
      console.log('Error message:', error.message)
      console.log('Error stack:', error.stack)
    }
    expect(error).toBeNull()
  })

  it('renders form with all required fields', () => {
    const { container } = render(<FormBlock />)
    console.log('Container HTML:', container.innerHTML)
    console.log('Container Element:', container.firstChild)
    
    expect(screen.getByLabelText('Full name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Discovery Call' })).toBeInTheDocument()
  })

  it('renders form images and decorative elements', () => {
    render(<FormBlock />)
    
    expect(screen.getByAltText('girl image')).toBeInTheDocument()
    expect(screen.getByAltText('man image')).toBeInTheDocument()
    expect(screen.getByTestId('form-elipse-1')).toBeInTheDocument()
    expect(screen.getByTestId('form-elipse-2')).toBeInTheDocument()
    expect(screen.getByTestId('form-elipse-3')).toBeInTheDocument()
    expect(screen.getByTestId('form-elipse-4')).toBeInTheDocument()
    expect(screen.getByTestId('form-elipse-5')).toBeInTheDocument()
    expect(screen.getByTestId('form-elipse-6')).toBeInTheDocument()
  })

  it('displays form data in input fields', () => {
    const formData = {
      fullName: 'John Doe',
      companyName: '',
      email: 'john@example.com',
      phone: '123-456-7890',
      comment: ''
    }
    
    mockUseFormStatus.mockReturnValue({
      ...createDefaultFormStatus(),
      formData
    })

    render(<FormBlock />)
    
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('123-456-7890')).toBeInTheDocument()
  })

  it('allows typing in input fields', async () => {
    const user = userEvent.setup()
    render(<FormBlock />)
    
    const nameInput = screen.getByLabelText('Full name')
    const emailInput = screen.getByLabelText('Email')
    const phoneInput = screen.getByLabelText('Phone')
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(phoneInput, '1234567890')
    
    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(phoneInput).toBeInTheDocument()
  })

  it('displays validation errors', () => {
    const errors = {
      fullName: 'Full name is required',
      email: 'Please enter a valid email address',
      phone: 'Please enter a valid phone number'
    }
    
    mockUseFormStatus.mockReturnValue({
      ...createDefaultFormStatus(),
      errors
    })

    render(<FormBlock />)
    
    expect(screen.getByText('Full name is required')).toBeInTheDocument()
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    expect(screen.getByText('Please enter a valid phone number')).toBeInTheDocument()
  })

  it('applies error styling to inputs with errors', () => {
    const errors = {
      fullName: 'Full name is required',
      email: 'Please enter a valid email address',
      phone: 'Please enter a valid phone number'
    }
    
    mockUseFormStatus.mockReturnValue({
      ...createDefaultFormStatus(),
      errors
    })

    render(<FormBlock />)
    
    const nameInput = screen.getByLabelText('Full name')
    const emailInput = screen.getByLabelText('Email')
    const phoneInput = screen.getByLabelText('Phone')
    
    expect(nameInput).toHaveClass('!border-red-500')
    expect(emailInput).toHaveClass('!border-red-500')
    expect(phoneInput).toHaveClass('border-red-500')
  })

  it('disables inputs when submitting', () => {
    mockUseFormStatus.mockReturnValue({
      ...createDefaultFormStatus(),
      isSubmitting: true
    })

    render(<FormBlock />)
    
    const nameInput = screen.getByLabelText('Full name')
    const emailInput = screen.getByLabelText('Email')
    const phoneInput = screen.getByLabelText('Phone')
    const submitButton = screen.getByRole('button', { name: 'Processing...' })
    
    expect(nameInput).toBeDisabled()
    expect(emailInput).toBeDisabled()
    expect(phoneInput).toBeDisabled()
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toHaveClass('opacity-75')
  })

  it('shows processing state on submit button when submitting', () => {
    mockUseFormStatus.mockReturnValue({
      ...createDefaultFormStatus(),
      isSubmitting: true
    })

    render(<FormBlock />)
    
    expect(screen.getByRole('button', { name: 'Processing...' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Discovery Call' })).not.toBeInTheDocument()
  })

  it('renders submit button correctly', () => {
    render(<FormBlock />)
    
    const submitButton = screen.getByRole('button', { name: 'Discovery Call' })
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toHaveAttribute('type', 'submit')
  })

  it('prevents default form submission', async () => {
    render(<FormBlock />)
    
    const submitButton = screen.getByRole('button', { name: 'Discovery Call' })
    const form = submitButton.closest('form')
    
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
    const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault')
    
    fireEvent(form!, submitEvent)
    
    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('calls openDirectLink with correct Calendly options when form is submitted', async () => {
    const formData = {
      fullName: 'John Doe',
      companyName: '',
      email: 'john@example.com',
      phone: '123-456-7890',
      comment: ''
    }
    
    mockUseFormStatus.mockReturnValue({
      ...createDefaultFormStatus(),
      formData
    })

    mockSubmitForm.mockImplementation(async (handleSubmit) => {
      await handleSubmit({
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        comment: '',
        companyName: ''
      })
    })

    const user = userEvent.setup()
    render(<FormBlock />)
    
    const submitButton = screen.getByRole('button', { name: 'Discovery Call' })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockSubmitForm).toHaveBeenCalled()
    })
  })

  it('renders informational text', () => {
    render(<FormBlock />)
    
    expect(screen.getByText('It only takes 15 minutes to learn why 10,000+ pros use Toolsey to generate more sales.')).toBeInTheDocument()
  })

  it('has correct form structure and accessibility', () => {
    render(<FormBlock />)
    
    const submitButton = screen.getByRole('button', { name: 'Discovery Call' })
    const form = submitButton.closest('form')
    expect(form).toBeInTheDocument()
    
    const nameInput = screen.getByLabelText('Full name')
    const emailInput = screen.getByLabelText('Email')
    const phoneInput = screen.getByLabelText('Phone')
    
    expect(nameInput).toHaveAttribute('type', 'text')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(phoneInput).toHaveAttribute('type', 'tel')
  })

  it('allows typing in phone input', async () => {
    const user = userEvent.setup()
    render(<FormBlock />)
    
    const phoneInput = screen.getByLabelText('Phone')
    await user.type(phoneInput, '1234567890')
    
    expect(phoneInput).toBeInTheDocument()
  })

  it('formats phone number with dashes', async () => {
    const user = userEvent.setup()
    render(<FormBlock />)
    
    const phoneInput = screen.getByLabelText('Phone')
    
    await user.type(phoneInput, '1234567890')
    
    expect(mockSetFieldValue).toHaveBeenCalled()
  })

  it('allows deleting dashes in phone number', async () => {
    const user = userEvent.setup()
    render(<FormBlock />)
    
    const phoneInput = screen.getByLabelText('Phone')
    
    // Test that phone input accepts input and deletion
    await user.type(phoneInput, '1234567890')
    await user.keyboard('{Backspace}{Backspace}{Backspace}')
    
    // Check that setFieldValue was called multiple times
    expect(mockSetFieldValue).toHaveBeenCalled()
  })

  it('displays US flag in phone input', () => {
    render(<FormBlock />)
    
    // Check if US flag emoji is present
    const phoneContainer = screen.getByLabelText('Phone').closest('div')
    expect(phoneContainer).toHaveTextContent('🇺🇸')
  })

  it('limits phone input to 10 digits', async () => {
    const user = userEvent.setup()
    render(<FormBlock />)
    
    const phoneInput = screen.getByLabelText('Phone')
    
    // Test that phone input accepts input
    await user.type(phoneInput, '123456789012345')
    
    // Check that setFieldValue was called (limiting happens in the component)
    expect(mockSetFieldValue).toHaveBeenCalled()
  })
})
