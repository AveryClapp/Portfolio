/**
 * Calculate estimated read time for a blog post
 * @param {string} content - The markdown content
 * @returns {number} - Estimated read time in minutes
 */
export function calculateReadTime(content) {
  if (!content) return 1;

  // Remove markdown syntax for more accurate word count
  let text = content
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`[^`]+`/g, '')
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    // Remove headers
    .replace(/#{1,6}\s+/g, '')
    // Remove bold/italic
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove horizontal rules
    .replace(/---/g, '')
    // Remove blockquotes
    .replace(/>\s+/g, '');

  // Count words (split by whitespace and filter empty strings)
  const words = text.split(/\s+/).filter(word => word.length > 0).length;

  // Average reading speed: 200 words per minute
  const readTime = Math.ceil(words / 200);

  // Minimum 1 minute
  return Math.max(1, readTime);
}

/**
 * Format read time as a string
 * @param {number} minutes - Read time in minutes
 * @returns {string} - Formatted string like "5 min read"
 */
export function formatReadTime(minutes) {
  return `${minutes} min read`;
}
