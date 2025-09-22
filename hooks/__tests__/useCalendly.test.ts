import { renderHook, act } from '@testing-library/react'
import { useCalendly } from '@/hooks/useCalendly'

const mockWindowOpen = jest.fn()
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true
})

const mockAppendChild = jest.fn()
const mockQuerySelector = jest.fn()

Object.defineProperty(document, 'appendChild', {
  value: mockAppendChild,
  writable: true
})

Object.defineProperty(document, 'querySelector', {
  value: mockQuerySelector,
  writable: true
})

const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation()
const mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation()

describe('useCalendly', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockQuerySelector.mockReturnValue(null) // No existing script
    mockWindowOpen.mockClear()
    mockAppendChild.mockClear()
    mockConsoleLog.mockClear()
    mockConsoleWarn.mockClear()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('provides hook functions', () => {
    const { result } = renderHook(() => useCalendly())
    
    // Check that hook returns expected functions
    expect(typeof result.current.openPopup).toBe('function')
    expect(typeof result.current.openDirectLink).toBe('function')
    expect(typeof result.current.createInlineWidget).toBe('function')
  })

  it('does not load script if already exists', () => {
    mockQuerySelector.mockReturnValue({ src: 'calendly.com/assets/external/widget.js' })
    
    renderHook(() => useCalendly())
    
    expect(mockAppendChild).not.toHaveBeenCalled()
  })

  it('provides openPopup, openDirectLink, and createInlineWidget functions', () => {
    const { result } = renderHook(() => useCalendly())
    
    expect(typeof result.current.openPopup).toBe('function')
    expect(typeof result.current.openDirectLink).toBe('function')
    expect(typeof result.current.createInlineWidget).toBe('function')
  })

  describe('openDirectLink', () => {
    it('opens URL with basic parameters', () => {
      const { result } = renderHook(() => useCalendly())
      
      const options = {
        url: 'https://calendly.com/test',
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890'
        }
      }
      
      act(() => {
        result.current.openDirectLink(options)
      })
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'https://calendly.com/test?name=John+Doe&email=john%40example.com&a1=%2B1234567890',
        '_blank'
      )
    })

    it('opens URL with UTM parameters', () => {
      const { result } = renderHook(() => useCalendly())
      
      const options = {
        url: 'https://calendly.com/test',
        prefill: {
          name: 'John Doe',
          email: 'john@example.com'
        },
        utm: {
          utmSource: 'website',
          utmMedium: 'form',
          utmCampaign: 'test',
          utmContent: 'button',
          utmTerm: 'keyword'
        }
      }
      
      act(() => {
        result.current.openDirectLink(options)
      })
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('utm_source=website'),
        '_blank'
      )
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('utm_medium=form'),
        '_blank'
      )
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('utm_campaign=test'),
        '_blank'
      )
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('utm_content=button'),
        '_blank'
      )
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('utm_term=keyword'),
        '_blank'
      )
    })

    it('opens URL with custom answers', () => {
      const { result } = renderHook(() => useCalendly())
      
      const options = {
        url: 'https://calendly.com/test',
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          customAnswers: {
            company: 'Test Company',
            message: 'Test message'
          }
        }
      }
      
      act(() => {
        result.current.openDirectLink(options)
      })
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('a2=Test+Company'),
        '_blank'
      )
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('a3=Test+message'),
        '_blank'
      )
    })

    it('opens URL without parameters when none provided', () => {
      const { result } = renderHook(() => useCalendly())
      
      const options = {
        url: 'https://calendly.com/test'
      }
      
      act(() => {
        result.current.openDirectLink(options)
      })
      
      expect(mockWindowOpen).toHaveBeenCalledWith('https://calendly.com/test', '_blank')
    })

    it('handles empty prefill and utm objects', () => {
      const { result } = renderHook(() => useCalendly())
      
      const options = {
        url: 'https://calendly.com/test',
        prefill: {},
        utm: {}
      }
      
      act(() => {
        result.current.openDirectLink(options)
      })
      
      expect(mockWindowOpen).toHaveBeenCalledWith('https://calendly.com/test', '_blank')
    })
  })

  describe('openPopup', () => {
    beforeEach(() => {
      // Mock Calendly object
      ;(window as any).Calendly = {
        initPopupWidget: jest.fn()
      }
    })

    afterEach(() => {
      delete (window as any).Calendly
    })

    it('calls Calendly.initPopupWidget when Calendly is available', () => {
      const { result } = renderHook(() => useCalendly())
      
      const options = {
        url: 'https://calendly.com/test',
        prefill: {
          name: 'John Doe',
          email: 'john@example.com'
        }
      }
      
      act(() => {
        result.current.openPopup(options)
      })
      
      expect((window as any).Calendly.initPopupWidget).toHaveBeenCalledWith({
        url: expect.stringContaining('name=John+Doe')
      })
    })

  it('handles Calendly not being available gracefully', () => {
    delete (window as any).Calendly
    
    const { result } = renderHook(() => useCalendly())
    
    const options = {
      url: 'https://calendly.com/test',
      prefill: {
        name: 'John Doe'
      }
    }
    
    act(() => {
      result.current.openPopup(options)
    })
    
    // Should not throw error and should call window.open
    expect(mockWindowOpen).toHaveBeenCalled()
  })
  })

  describe('createInlineWidget', () => {
    beforeEach(() => {
      // Mock Calendly object
      ;(window as any).Calendly = {
        initInlineWidget: jest.fn()
      }
    })

    afterEach(() => {
      delete (window as any).Calendly
    })

    it('calls Calendly.initInlineWidget when Calendly is available', () => {
      const { result } = renderHook(() => useCalendly())
      
      const mockElement = document.createElement('div')
      const options = {
        url: 'https://calendly.com/test',
        prefill: {
          name: 'John Doe'
        }
      }
      
      act(() => {
        result.current.createInlineWidget(mockElement, options)
      })
      
      expect((window as any).Calendly.initInlineWidget).toHaveBeenCalledWith({
        url: expect.stringContaining('name=John+Doe'),
        parentElement: mockElement
      })
    })

    it('does nothing when Calendly is not available', () => {
      delete (window as any).Calendly
      
      const { result } = renderHook(() => useCalendly())
      
      const mockElement = document.createElement('div')
      const options = {
        url: 'https://calendly.com/test'
      }
      
      act(() => {
        result.current.createInlineWidget(mockElement, options)
      })
      
      // Should not throw or call any methods
      expect(true).toBe(true)
    })
  })

  describe('URL parameter encoding', () => {
    it('properly encodes special characters in parameters', () => {
      const { result } = renderHook(() => useCalendly())
      
      const options = {
        url: 'https://calendly.com/test',
        prefill: {
          name: 'John & Jane Doe',
          email: 'john+jane@example.com',
          phone: '+1 (555) 123-4567'
        },
        utm: {
          utmContent: 'Test & More'
        }
      }
      
      act(() => {
        result.current.openDirectLink(options)
      })
      
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('name=John+%26+Jane+Doe'),
        '_blank'
      )
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('email=john%2Bjane%40example.com'),
        '_blank'
      )
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('a1=%2B1+%28555%29+123-4567'),
        '_blank'
      )
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('utm_content=Test+%26+More'),
        '_blank'
      )
    })
  })
})
