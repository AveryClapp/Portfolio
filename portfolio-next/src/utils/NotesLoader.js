import fs from "fs";
import path from "path";
import matter from "gray-matter";

function titleToSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/-+/g, "-"); // collapse multiple hyphens
}
// Use local Obsidian vault in development, synced notes in production
const NOTES_DIRECTORY =
  process.env.NODE_ENV === "development"
    ? "/Users/averyclapp/Documents/KnowledgeVault/SecondBrain"
    : path.join(process.cwd(), "src", "Notes");

// Helper function to ensure notes directory exists
function ensureNotesDirectoryExists() {
  if (!fs.existsSync(NOTES_DIRECTORY)) {
    console.warn(`Notes directory not found at ${NOTES_DIRECTORY}`);
    return false;
  }
  return true;
}

// Helper to recursively get all markdown files from a directory
function getAllMarkdownFiles(dir, baseDir = dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip directories starting with _ or .
      if (file.startsWith('_') || file.startsWith('.')) {
        return;
      }
      getAllMarkdownFiles(filePath, baseDir, fileList);
    } else if (file.endsWith('.md') && !file.startsWith('.') && !file.startsWith('_')) {
      // Store relative path from base directory
      const relativePath = path.relative(baseDir, filePath);
      fileList.push({
        fullPath: filePath,
        relativePath: relativePath,
        fileName: file
      });
    }
  });

  return fileList;
}

export async function getAllDirectories() {
  if (!ensureNotesDirectoryExists()) return [];

  try {
    const items = fs.readdirSync(NOTES_DIRECTORY);

    const directories = items
      .filter(item => {
        const fullPath = path.join(NOTES_DIRECTORY, item);
        const stat = fs.statSync(fullPath);
        // Include directories, exclude those starting with _ or .
        return stat.isDirectory() && !item.startsWith('_') && !item.startsWith('.');
      })
      .map(dirName => {
        const dirPath = path.join(NOTES_DIRECTORY, dirName);
        const metadataPath = path.join(dirPath, '_directory.md');

        // Default metadata if _directory.md doesn't exist
        let metadata = {
          title: dirName.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' '),
          description: '',
          icon: '',
          order: 999
        };

        // Read _directory.md if it exists
        if (fs.existsSync(metadataPath)) {
          try {
            const fileContents = fs.readFileSync(metadataPath, 'utf8');
            const { data } = matter(fileContents);
            metadata = {
              title: data.title || metadata.title,
              description: data.description || '',
              icon: data.icon || '',
              order: data.order !== undefined ? data.order : 999
            };
          } catch (error) {
            console.error(`Error reading directory metadata ${dirName}:`, error);
          }
        }

        return {
          slug: titleToSlug(dirName),
          dirName,
          ...metadata
        };
      })
      .sort((a, b) => a.order - b.order);

    return directories;
  } catch (error) {
    console.error('Error loading directories:', error);
    return [];
  }
}

export async function getAllNotes() {
  if (!ensureNotesDirectoryExists()) return [];

  try {
    const allFiles = getAllMarkdownFiles(NOTES_DIRECTORY);

    const allNotesData = allFiles
      .map(({ fullPath, relativePath, fileName }) => {
        try {
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          // Extract directory from relative path
          const pathParts = relativePath.split(path.sep);
          const directory = pathParts.length > 1 ? pathParts[0] : '';

          // Generate slug with directory prefix
          const rawSlug = data.slug || fileName.replace(/\.md$/, '');
          const baseSlug = titleToSlug(rawSlug);
          const slug = directory ? `${titleToSlug(directory)}/${baseSlug}` : baseSlug;

          // Extract title from frontmatter or use first heading or filename
          let title = data.title || rawSlug;
          if (!data.title && content) {
            const headingMatch = content.match(/^#\s+(.+)$/m);
            if (headingMatch) {
              title = headingMatch[1];
            }
          }

          // Ensure date is always a string
          const dateString = data.date
            ? (data.date instanceof Date ? data.date.toISOString().split("T")[0] : String(data.date))
            : new Date().toISOString().split("T")[0];

          return {
            slug,
            directory: titleToSlug(directory),
            filename: fileName,
            relativePath,
            content,
            title,
            preview:
              data.preview || content.slice(0, 150).replace(/[#*\[\]]/g, ""),
            ...data,
            date: dateString,
          };
        } catch (error) {
          console.error(`Error reading note ${relativePath}:`, error);
          return null;
        }
      })
      .filter((note) => note !== null);

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

export async function getNotesByDirectory(directorySlug) {
  const allNotes = await getAllNotes();

  return allNotes
    .filter(note =>
      note.directory === directorySlug &&
      note.type === 'moc' &&
      note.tier === 1
    )
    .sort((a, b) => {
      if (a.date < b.date) return 1;
      else return -1;
    });
}

export async function getNoteBySlug(slug) {
  if (!ensureNotesDirectoryExists()) return null;

  try {
    // Load all notes (they already have standardized slugs and relative paths)
    const allNotes = await getAllNotes();

    // Find the note that matches the slug
    const noteData = allNotes.find((n) => n.slug === slug);
    if (!noteData) return null;

    // Use the relative path to read the file
    const fullPath = path.join(NOTES_DIRECTORY, noteData.relativePath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Extract title from frontmatter or first heading or filename
    let title = data.title || noteData.title;
    if (!data.title && content) {
      const headingMatch = content.match(/^#\s+(.+)$/m);
      if (headingMatch) title = headingMatch[1];
    }

    // Process wikilinks and image paths
    let processedContent = content;
    try {
      const { processWikilinks } = await import("./WikilinkProcessor.js");
      processedContent = await processWikilinks(content);
    } catch (error) {
      console.error("Error processing wikilinks:", error);
    }

    // Ensure date is always a string
    const dateString = data.date
      ? (data.date instanceof Date ? data.date.toISOString().split("T")[0] : String(data.date))
      : noteData.date;

    return {
      slug: noteData.slug,
      directory: noteData.directory,
      content: processedContent,
      title,
      ...data,
      date: dateString,
    };
  } catch (error) {
    console.error(`Error loading note ${slug}:`, error);
    return null;
  }
}
