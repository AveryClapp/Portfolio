/**
 * Processes Obsidian-style wikilinks [[Note Title]] and converts them to markdown links
 */

import { getAllNotes } from "./NotesLoader";
import { getAllPosts } from "./BlogLoader";

function slugifyImageName(fileName) {
  const lastDot = fileName.lastIndexOf(".");
  if (lastDot === -1) return titleToSlug(fileName); // no extension
  const name = fileName.slice(0, lastDot);
  const ext = fileName.slice(lastDot); // includes ".png"
  return `${titleToSlug(name)}${ext}`;
}

// Cache for notes and posts slugs
let notesCache = null;
let postsCache = null;

// Convert title to slug (lowercase, replace spaces with hyphens)
function titleToSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single
}

// Build a map of titles to slugs
async function buildContentMap() {
  if (notesCache && postsCache) {
    return { notes: notesCache, posts: postsCache };
  }

  const notes = await getAllNotes();
  const posts = await getAllPosts();
  console.log(notes);
  // Map titles to slugs for quick lookup
  notesCache = new Map();
  postsCache = new Map();

  notes.forEach((note) => {
    const titleSlug = titleToSlug(note.title);
    notesCache.set(titleSlug, note.slug);
    notesCache.set(note.slug, note.slug); // Also map slug to itself
  });

  posts.forEach((post) => {
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
  let processedContent = content;

  // 1️⃣ Wiki-style images ![[Image Title.png|Alt Text]]
  const wikiImageRegex = /!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  processedContent = processedContent.replace(
    wikiImageRegex,
    (match, imgName, altText) => {
      console.log("wiki image match:", imgName);
      const display = altText ? altText.trim() : imgName.trim();
      const slugifiedName = slugifyImageName(imgName.trim());
      return `![${display}](/_assets/${slugifiedName})`;
    },
  );

  // 2️⃣ Standard images ![](_assets/image.png)
  processedContent = processedContent.replace(
    /!\[([^\]]*)\]\((?!http)([^)]+)\)/g,
    (match, alt, path) => `![${alt}](/notes-assets/${path})`,
  );

  // 3️⃣ Wiki-style note/blog links [[Note Title|Display]]
  const wikilinkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  processedContent = processedContent.replace(
    wikilinkRegex,
    (match, link, displayText) => {
      const linkSlug = titleToSlug(link.trim());
      const display = displayText ? displayText.trim() : link.trim();

      if (notes.has(linkSlug))
        return `[${display}](/notes/${notes.get(linkSlug)})`;
      if (posts.has(linkSlug))
        return `[${display}](/blog/${posts.get(linkSlug)})`;

      console.warn(`Wikilink not found: ${link}`);
      return `${display} ⚠️`;
    },
  );

  return processedContent;
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
