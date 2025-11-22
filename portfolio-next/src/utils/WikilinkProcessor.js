/**
 * Processes Obsidian-style wikilinks [[Note Title]] and converts them to markdown links
 */

import { getAllNotes } from './NotesLoader';
import { getAllPosts } from './BlogLoader';

// Cache for notes and posts slugs
let notesCache = null;
let postsCache = null;

// Convert title to slug (lowercase, replace spaces with hyphens)
function titleToSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-');      // Replace multiple hyphens with single
}

// Build a map of titles to slugs
async function buildContentMap() {
  if (notesCache && postsCache) {
    return { notes: notesCache, posts: postsCache };
  }

  const notes = await getAllNotes();
  const posts = await getAllPosts();

  // Map titles to slugs for quick lookup
  notesCache = new Map();
  postsCache = new Map();

  notes.forEach(note => {
    const titleSlug = titleToSlug(note.title);
    notesCache.set(titleSlug, note.slug);
    notesCache.set(note.slug, note.slug); // Also map slug to itself
  });

  posts.forEach(post => {
    const titleSlug = titleToSlug(post.title);
    postsCache.set(titleSlug, post.slug);
    postsCache.set(post.slug, post.slug);
  });

  return { notes: notesCache, posts: postsCache };
}

/**
 * Process wikilinks in content
 * Converts [[Note Title]] to [Note Title](/notes/note-slug)
 * Supports [[Note Title|Display Text]] syntax
 */
export async function processWikilinks(content) {
  if (!content) return content;

  const { notes, posts } = await buildContentMap();

  // Match [[text]] or [[text|display]]
  const wikilinkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

  return content.replace(wikilinkRegex, (match, link, displayText) => {
    const linkSlug = titleToSlug(link.trim());
    const display = displayText ? displayText.trim() : link.trim();

    // Check if it's a note
    if (notes.has(linkSlug)) {
      const slug = notes.get(linkSlug);
      return `[${display}](/notes/${slug})`;
    }

    // Check if it's a blog post
    if (posts.has(linkSlug)) {
      const slug = posts.get(linkSlug);
      return `[${display}](/blog/${slug})`;
    }

    // If not found, return as plain text with indicator
    console.warn(`Wikilink not found: ${link}`);
    return `${display} ⚠️`;
  });
}

/**
 * Extract all wikilinks from content (for backlinks)
 */
export function extractWikilinks(content) {
  if (!content) return [];

  const wikilinkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  const links = [];
  let match;

  while ((match = wikilinkRegex.exec(content)) !== null) {
    links.push({
      link: match[1].trim(),
      display: match[2] ? match[2].trim() : match[1].trim(),
    });
  }

  return links;
}
