import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormBlock } from '@/components/home/FormBlock'
import { useFormStatus } from '@/hooks/useFormStatus'
import { useCalendly } from '@/hooks/useCalendly'

jest.mock('@/hooks/useFormStatus')
jest.mock('@/hooks/useCalendly')

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

// Mock react-international-phone
jest.mock('react-international-phone', () => ({
  PhoneInput: ({ value, onChange, disabled, className, ...props }: { 
    value: string; 
    onChange: (value: string) => void; 
    disabled?: boolean; 
    className?: string; 
    [key: string]: unknown 
  }) => (
    <input
      {...props}
      type="tel"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={className}
      data-testid="phone-input"
    />
  )
}))

const mockUseFormStatus = useFormStatus as jest.MockedFunction<typeof useFormStatus>
const mockUseCalendly = useCalendly as jest.MockedFunction<typeof useCalendly>

describe('FormBlock', () => {
  const mockSetFieldValue = jest.fn()
  const mockSubmitForm = jest.fn()
  const mockOpenDirectLink = jest.fn()

  const defaultFormStatus = {
    formData: {
      fullName: '',
      email: '',
      phone: ''
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
  }

  const defaultCalendly = {
    openPopup: jest.fn(),
    openDirectLink: mockOpenDirectLink,
    createInlineWidget: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseFormStatus.mockReturnValue(defaultFormStatus)
    mockUseCalendly.mockReturnValue(defaultCalendly)
  })

  it('renders form with all required fields', () => {
    render(<FormBlock />)
    
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
      email: 'john@example.com',
      phone: '+1234567890'
    }
    
    mockUseFormStatus.mockReturnValue({
      ...defaultFormStatus,
      formData
    })

    render(<FormBlock />)
    
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('+1234567890')).toBeInTheDocument()
  })

  it('allows typing in input fields', async () => {
    const user = userEvent.setup()
    render(<FormBlock />)
    
    const nameInput = screen.getByLabelText('Full name')
    const emailInput = screen.getByLabelText('Email')
    const phoneInput = screen.getByTestId('phone-input')
    
    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(phoneInput, '+1234567890')
    
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
      ...defaultFormStatus,
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
      ...defaultFormStatus,
      errors
    })

    render(<FormBlock />)
    
    const nameInput = screen.getByLabelText('Full name')
    const emailInput = screen.getByLabelText('Email')
    const phoneInput = screen.getByTestId('phone-input')
    
    expect(nameInput).toHaveClass('border-red-500')
    expect(emailInput).toHaveClass('border-red-500')
    expect(phoneInput).toHaveClass('border-red-500')
  })

  it('disables inputs when submitting', () => {
    mockUseFormStatus.mockReturnValue({
      ...defaultFormStatus,
      isSubmitting: true
    })

    render(<FormBlock />)
    
    const nameInput = screen.getByLabelText('Full name')
    const emailInput = screen.getByLabelText('Email')
    const phoneInput = screen.getByTestId('phone-input')
    const submitButton = screen.getByRole('button', { name: 'Processing...' })
    
    expect(nameInput).toBeDisabled()
    expect(emailInput).toBeDisabled()
    expect(phoneInput).toBeDisabled()
    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toHaveClass('opacity-75')
  })

  it('shows processing state on submit button when submitting', () => {
    mockUseFormStatus.mockReturnValue({
      ...defaultFormStatus,
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
      email: 'john@example.com',
      phone: '+1234567890'
    }
    
    mockUseFormStatus.mockReturnValue({
      ...defaultFormStatus,
      formData
    })

    mockSubmitForm.mockImplementation(async (handleSubmit) => {
      await handleSubmit(formData)
    })

    const user = userEvent.setup()
    render(<FormBlock />)
    
    const submitButton = screen.getByRole('button', { name: 'Discovery Call' })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockOpenDirectLink).toHaveBeenCalledWith({
        url: expect.any(String), // CALENDLY_URL
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890'
        },
        utm: {
          utmSource: 'toolsey_website',
          utmMedium: 'form_submission',
          utmCampaign: 'discovery_call',
          utmContent: 'homepage_form'
        }
      })
    })
  })

  it('renders informational text', () => {
    render(<FormBlock />)
    
    expect(screen.getByText(/It only takes 15 minutes to learn why 30,000 pros use Toolsey to generate more sales/)).toBeInTheDocument()
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
    expect(nameInput).toHaveAttribute('required')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveAttribute('required')
    expect(phoneInput).toHaveAttribute('type', 'tel')
  })

  it('allows typing in phone input', async () => {
    const user = userEvent.setup()
    render(<FormBlock />)
    
    const phoneInput = screen.getByTestId('phone-input')
    await user.type(phoneInput, '+1234567890')
    
    expect(phoneInput).toBeInTheDocument()
  })
})
