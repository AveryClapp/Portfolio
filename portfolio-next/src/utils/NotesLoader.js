import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const NOTES_DIRECTORY = path.join(process.cwd(), 'src', 'Notes');

// Helper function to ensure notes directory exists
function ensureNotesDirectoryExists() {
  if (!fs.existsSync(NOTES_DIRECTORY)) {
    console.warn(`Notes directory not found at ${NOTES_DIRECTORY}`);
    return false;
  }
  return true;
}

export async function getAllNotes() {
  if (!ensureNotesDirectoryExists()) return [];

  try {
    const fileNames = fs.readdirSync(NOTES_DIRECTORY);

    const allNotesData = fileNames
      .filter(fileName => {
        // Only include .md files, exclude system files and folders
        return fileName.endsWith('.md') &&
               !fileName.startsWith('.') &&
               !fileName.startsWith('_');
      })
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(NOTES_DIRECTORY, fileName);

        try {
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          // Extract title from frontmatter or use first heading or filename
          let title = data.title || slug;
          if (!data.title && content) {
            const headingMatch = content.match(/^#\s+(.+)$/m);
            if (headingMatch) {
              title = headingMatch[1];
            }
          }

          return {
            slug,
            content,
            title,
            date: data.date || new Date().toISOString().split('T')[0],
            preview: data.preview || content.slice(0, 150).replace(/[#*\[\]]/g, ''),
            ...data
          };
        } catch (error) {
          console.error(`Error reading note ${fileName}:`, error);
          return null;
        }
      })
      .filter(note => note !== null);

    return allNotesData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error("Error loading notes:", error);
    return [];
  }
}

export async function getNoteBySlug(slug) {
  if (!ensureNotesDirectoryExists()) return null;

  try {
    const fullPath = path.join(NOTES_DIRECTORY, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      console.log(`Note not found: ${slug}`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Extract title from frontmatter or first heading or filename
    let title = data.title || slug;
    if (!data.title && content) {
      const headingMatch = content.match(/^#\s+(.+)$/m);
      if (headingMatch) {
        title = headingMatch[1];
      }
    }

    // Process wikilinks - import dynamically to avoid circular dependency
    let processedContent = content;
    try {
      const { processWikilinks } = await import('./WikilinkProcessor.js');
      processedContent = await processWikilinks(content);
    } catch (error) {
      console.error('Error processing wikilinks:', error);
    }

    return {
      slug,
      content: processedContent,
      title,
      date: data.date || new Date().toISOString().split('T')[0],
      ...data
    };
  } catch (error) {
    console.error(`Error loading note ${slug}:`, error);
    return null;
  }
}
