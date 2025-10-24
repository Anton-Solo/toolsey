import { renderHook, act } from '@testing-library/react'
import { useFormStatus } from '@/hooks/useFormStatus'

describe('useFormStatus', () => {
  it('initializes with empty form data and no errors', () => {
    const { result } = renderHook(() => useFormStatus())
    
    expect(result.current.formData).toEqual({
      fullName: '',
      email: '',
      phone: '',
      comment: '',
      companyName: ''
    })
    expect(result.current.errors).toEqual({})
    expect(result.current.isValid).toBe(false)
    expect(result.current.isSubmitting).toBe(false)
  })

  it('updates form data correctly', () => {
    const { result } = renderHook(() => useFormStatus())
    
    act(() => {
      result.current.setFormData({
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        comment: '',
        companyName: ''
      })
    })
    
    expect(result.current.formData).toEqual({
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      comment: '',
      companyName: ''
    })
  })

  it('updates individual field values', () => {
    const { result } = renderHook(() => useFormStatus())
    
    act(() => {
      result.current.setFieldValue('fullName', 'Jane Smith')
    })
    
    expect(result.current.formData.fullName).toBe('Jane Smith')
    expect(result.current.formData.email).toBe('')
    expect(result.current.formData.phone).toBe('')
  })

  it('validates full name correctly', () => {
    const { result } = renderHook(() => useFormStatus())
    
    // Test empty name
    act(() => {
      result.current.setFieldValue('fullName', '')
    })
    act(() => {
      result.current.validateForm()
    })
    expect(result.current.errors.fullName).toBe('Full name is required')
    
    // Test short name
    act(() => {
      result.current.setFieldValue('fullName', 'A')
    })
    act(() => {
      result.current.validateForm()
    })
    expect(result.current.errors.fullName).toBeUndefined() // 'A' is valid (at least 1 character)
    
    // Test valid name
    act(() => {
      result.current.setFieldValue('fullName', 'John Doe')
    })
    act(() => {
      result.current.validateForm()
    })
    expect(result.current.errors.fullName).toBeUndefined()
  })

  it('validates email correctly', () => {
    const { result } = renderHook(() => useFormStatus())
    
    // Test empty email
    act(() => {
      result.current.setFieldValue('email', '')
    })
    act(() => {
      result.current.validateForm()
    })
    expect(result.current.errors.email).toBe('Please enter a valid email address')
    
    // Test invalid email
    act(() => {
      result.current.setFieldValue('email', 'invalid-email')
    })
    act(() => {
      result.current.validateForm()
    })
    expect(result.current.errors.email).toBe('Please enter a valid email address')
    
    // Test valid email
    act(() => {
      result.current.setFieldValue('email', 'john@example.com')
    })
    act(() => {
      result.current.validateForm()
    })
    expect(result.current.errors.email).toBeUndefined()
  })

  it('validates phone correctly', () => {
    const { result } = renderHook(() => useFormStatus())
    
    // Test empty phone
    act(() => {
      result.current.setFieldValue('phone', '')
    })
    act(() => {
      result.current.validateForm()
    })
    expect(result.current.errors.phone).toBe('Phone number is required')
    
    // Test invalid phone format
    act(() => {
      result.current.setFieldValue('phone', '1234567890')
    })
    act(() => {
      result.current.validateForm()
    })
    expect(result.current.errors.phone).toBe('Please enter a valid phone number in format 333-444-5555')
    
    // Test valid phone
    act(() => {
      result.current.setFieldValue('phone', '123-456-7890')
    })
    act(() => {
      result.current.validateForm()
    })
    expect(result.current.errors.phone).toBeUndefined()
  })

  it('clears errors when field values are updated', () => {
    const { result } = renderHook(() => useFormStatus())
    
    // Set invalid data and validate
    act(() => {
      result.current.setFormData({
        fullName: '',
        email: 'invalid',
        phone: '123',
        comment: '',
        companyName: ''
      })
    })
    act(() => {
      result.current.validateForm()
    })
    
    expect(Object.keys(result.current.errors)).toHaveLength(2) // Only fullName and email errors
    
    // Update field value
    act(() => {
      result.current.setFieldValue('fullName', 'John Doe')
    })
    
    expect(result.current.errors.fullName).toBeUndefined()
    expect(result.current.errors.email).toBeDefined()
    expect(result.current.errors.phone).toBeUndefined() // Phone error cleared when field updated
  })

  it('clears all errors when clearErrors is called', () => {
    const { result } = renderHook(() => useFormStatus())
    
    // Set errors
    act(() => {
      result.current.setFormData({
        fullName: '',
        email: 'invalid',
        phone: '123',
        comment: '',
        companyName: ''
      })
    })
    act(() => {
      result.current.validateForm()
    })
    
    expect(Object.keys(result.current.errors)).toHaveLength(2) // Only fullName and email errors
    
    // Clear errors
    act(() => {
      result.current.clearErrors()
    })
    
    expect(result.current.errors).toEqual({})
  })

  it('resets form to initial state', () => {
    const { result } = renderHook(() => useFormStatus())
    
    // Set form data and errors
    act(() => {
      result.current.setFormData({
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        comment: '',
        companyName: ''
      })
    })
    act(() => {
      result.current.validateForm()
    })
    
    // Reset form
    act(() => {
      result.current.resetForm()
    })
    
    expect(result.current.formData).toEqual({
      fullName: '',
      email: '',
      phone: '',
      comment: '',
      companyName: ''
    })
    expect(result.current.errors).toEqual({})
    expect(result.current.isSubmitting).toBe(false)
  })

  it('calculates isValid correctly', () => {
    const { result } = renderHook(() => useFormStatus())
    
    // Initially invalid
    expect(result.current.isValid).toBe(false)
    
    // Set valid data
    act(() => {
      result.current.setFormData({
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        comment: '',
        companyName: ''
      })
    })
    
    expect(result.current.isValid).toBe(true)
    
    // Set invalid data
    act(() => {
      result.current.setFormData({
        fullName: '',
        email: 'john@example.com',
        phone: '123-456-7890',
        comment: '',
        companyName: ''
      })
    })
    
    expect(result.current.isValid).toBe(false)
  })

  it('handles form submission correctly', async () => {
    const { result } = renderHook(() => useFormStatus())
    const mockSubmit = jest.fn().mockResolvedValue(undefined)
    
    // Set valid form data
    act(() => {
      result.current.setFormData({
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        comment: '',
        companyName: ''
      })
    })
    
    // Submit form
    await act(async () => {
      await result.current.submitForm(mockSubmit)
    })
    
    // Check if form is valid before expecting submission
    expect(result.current.isValid).toBe(true)
    expect(mockSubmit).toHaveBeenCalledWith({
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      comment: '',
      companyName: ''
    })
    expect(result.current.isSubmitting).toBe(false)
  })

  it('does not submit form with invalid data', async () => {
    const { result } = renderHook(() => useFormStatus())
    const mockSubmit = jest.fn()
    
    // Set invalid form data
    act(() => {
      result.current.setFormData({
        fullName: '',
        email: 'invalid',
        phone: '123',
        comment: '',
        companyName: ''
      })
    })
    
    // Try to submit form
    await act(async () => {
      await result.current.submitForm(mockSubmit)
    })
    
    expect(mockSubmit).not.toHaveBeenCalled()
  })

})
