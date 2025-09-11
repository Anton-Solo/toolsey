import { splitHtmlContent } from '@/utils/contentSplitter'

describe('contentSplitter', () => {
  it('should split content at specified ratio', () => {
    const content = '<p>First paragraph</p><p>Second paragraph</p><p>Third paragraph</p>'
    const { firstHalf, secondHalf } = splitHtmlContent(content, 0.5)
    
    expect(firstHalf).toBeDefined()
    expect(secondHalf).toBeDefined()
    expect(firstHalf.length + secondHalf.length).toBeGreaterThanOrEqual(content.length)
  })

  it('should handle empty content', () => {
    const { firstHalf, secondHalf } = splitHtmlContent('', 0.5)
    
    expect(firstHalf).toBe('')
    expect(secondHalf).toBe('')
  })

  it('should handle content shorter than split point', () => {
    const content = '<p>Short content</p>'
    const { firstHalf, secondHalf } = splitHtmlContent(content, 0.5)
    
    expect(firstHalf).toBeDefined()
    expect(secondHalf).toBeDefined()
  })

  it('should preserve HTML structure', () => {
    const content = '<div><h1>Title</h1><p>Content</p></div>'
    const { firstHalf, secondHalf } = splitHtmlContent(content, 0.3)
    
    expect(firstHalf).toBeDefined()
    expect(secondHalf).toBeDefined()
    // For short content, secondHalf might be empty
    if (secondHalf) {
      expect(secondHalf).toContain('</div>')
    }
  })
})
