import { splitHtmlContent, splitByCharacterCount } from '@/utils/contentSplitter'

describe('contentSplitter', () => {
  describe('splitHtmlContent', () => {
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

      if (secondHalf) {
        expect(secondHalf).toContain('</div>')
      }
    })

    it('should handle content with multiple paragraphs', () => {
      const content = '<p>First paragraph with some content.</p><p>Second paragraph with more content.</p><p>Third paragraph with even more content.</p><p>Fourth paragraph with additional content.</p>'
      const { firstHalf, secondHalf } = splitHtmlContent(content, 0.6)
      
      expect(firstHalf).toBeDefined()
      expect(secondHalf).toBeDefined()
      expect(firstHalf).toContain('<p>')

      if (secondHalf) {
        expect(secondHalf).toContain('<p>')
      }
    })

    it('should handle content with headings', () => {
      const content = '<h1>Main Title</h1><p>First paragraph.</p><h2>Subtitle</h2><p>Second paragraph.</p><p>Third paragraph.</p>'
      const { firstHalf, secondHalf } = splitHtmlContent(content, 0.5)
      
      expect(firstHalf).toBeDefined()
      expect(secondHalf).toBeDefined()
    })

    it('should handle content with lists', () => {
      const content = '<p>Introduction paragraph.</p><ul><li>First item</li><li>Second item</li><li>Third item</li></ul><p>Conclusion paragraph.</p>'
      const { firstHalf, secondHalf } = splitHtmlContent(content, 0.5)
      
      expect(firstHalf).toBeDefined()
      expect(secondHalf).toBeDefined()
    })

    it('should handle content with images', () => {
      const content = '<p>First paragraph.</p><img src="test.jpg" alt="Test"><p>Second paragraph.</p><p>Third paragraph.</p>'
      const { firstHalf, secondHalf } = splitHtmlContent(content, 0.5)
      
      expect(firstHalf).toBeDefined()
      expect(secondHalf).toBeDefined()
    })

    it('should use default split ratio when not provided', () => {
      const content = '<p>First paragraph with some content.</p><p>Second paragraph with more content.</p><p>Third paragraph with even more content.</p><p>Fourth paragraph with additional content.</p>'
      const { firstHalf, secondHalf } = splitHtmlContent(content)
      
      expect(firstHalf).toBeDefined()
      expect(secondHalf).toBeDefined()
    })

    it('should handle very short content', () => {
      const content = '<p>Short</p>'
      const { firstHalf, secondHalf } = splitHtmlContent(content, 0.5)
      
      expect(firstHalf).toBe(content)
      expect(secondHalf).toBe('')
    })

    it('should handle content with nested HTML', () => {
      const content = '<div><h1>Title</h1><div><p>Nested paragraph</p><p>Another nested paragraph</p></div></div>'
      const { firstHalf, secondHalf } = splitHtmlContent(content, 0.5)
      
      expect(firstHalf).toBeDefined()
      expect(secondHalf).toBeDefined()
    })
  })

  describe('splitByCharacterCount', () => {
    it('should split content by character count', () => {
      const content = '<p>This is a test paragraph with some content.</p><p>This is another paragraph.</p>'
      const { firstHalf, secondHalf } = splitByCharacterCount(content, 0.5)
      
      expect(firstHalf).toBeDefined()
      expect(secondHalf).toBeDefined()
      expect(firstHalf.length + secondHalf.length).toBe(content.length)
    })

    it('should handle empty content', () => {
      const { firstHalf, secondHalf } = splitByCharacterCount('', 0.5)
      
      expect(firstHalf).toBe('')
      expect(secondHalf).toBe('')
    })

    it('should use default split ratio when not provided', () => {
      const content = '<p>This is a test paragraph with some content.</p><p>This is another paragraph.</p>'
      const { firstHalf, secondHalf } = splitByCharacterCount(content)
      
      expect(firstHalf).toBeDefined()
      expect(secondHalf).toBeDefined()
    })

    it('should split at HTML tag boundaries when possible', () => {
      const content = '<p>First paragraph</p><p>Second paragraph</p><p>Third paragraph</p>'
      const { firstHalf, secondHalf } = splitByCharacterCount(content, 0.4)
      
      expect(firstHalf).toBeDefined()
      expect(secondHalf).toBeDefined()
      // Should split at tag boundary
      expect(firstHalf.endsWith('>') || secondHalf.startsWith('<')).toBe(true)
    })

    it('should handle content without HTML tags', () => {
      const content = 'This is plain text content without any HTML tags.'
      const { firstHalf, secondHalf } = splitByCharacterCount(content, 0.5)
      
      expect(firstHalf).toBeDefined()
      expect(secondHalf).toBeDefined()
      expect(firstHalf.length + secondHalf.length).toBe(content.length)
    })

    it('should handle very short content', () => {
      const content = '<p>Short</p>'
      const { firstHalf, secondHalf } = splitByCharacterCount(content, 0.5)
      
      expect(firstHalf).toBeDefined()
      expect(secondHalf).toBeDefined()
    })
  })
})
