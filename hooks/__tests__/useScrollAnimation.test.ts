import { renderHook, act } from '@testing-library/react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

describe('useScrollAnimation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useScrollAnimation())
    
    expect(result.current.ref).toBeDefined()
    expect(result.current.isVisible).toBe(false)
  })

  it('should initialize with custom options', () => {
    const customOptions = {
      threshold: 0.5,
      rootMargin: '100px',
      triggerOnce: false
    }
    
    const { result } = renderHook(() => useScrollAnimation(customOptions))
    
    expect(result.current.ref).toBeDefined()
    expect(result.current.isVisible).toBe(false)
  })

  it('should create ref that can be attached to DOM element', () => {
    const { result } = renderHook(() => useScrollAnimation())
    
    // Simulate attaching ref to a DOM element
    const mockElement = document.createElement('div')
    act(() => {
      if (result.current.ref.current) {
        result.current.ref.current = mockElement
      }
    })
    
    expect(result.current.ref).toBeDefined()
  })

  it('should handle intersection observer callback', () => {
    const { result } = renderHook(() => useScrollAnimation())
    
    // Get the callback function that was passed to IntersectionObserver
    const observerCallback = mockIntersectionObserver.mock.calls[0][0]
    
    // Simulate intersection
    act(() => {
      observerCallback([{ isIntersecting: true }])
    })
    
    expect(result.current.isVisible).toBe(true)
  })
})
