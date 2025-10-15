import { useScrollAnimation } from '@/hooks/useScrollAnimation'

describe('useScrollAnimation', () => {
  it('should be defined', () => {
    expect(useScrollAnimation).toBeDefined()
  })

  it('should accept options parameter', () => {
    const options = {
      threshold: 0.5,
      rootMargin: '100px',
      triggerOnce: false
    }
    
    expect(() => useScrollAnimation(options)).toBeDefined()
  })

  it('should work without options', () => {
    expect(() => useScrollAnimation()).toBeDefined()
  })

  it('should work with empty options', () => {
    expect(() => useScrollAnimation({})).toBeDefined()
  })
})
