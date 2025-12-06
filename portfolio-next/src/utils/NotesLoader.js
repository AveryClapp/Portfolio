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

export async function getAllNotes() {
  if (!ensureNotesDirectoryExists()) return [];

  try {
    const fileNames = fs.readdirSync(NOTES_DIRECTORY);

    const allNotesData = fileNames
      .filter((fileName) => {
        // Only include .md files, exclude system files and folders
        return (
          fileName.endsWith(".md") &&
          !fileName.startsWith(".") &&
          !fileName.startsWith("_")
        );
      })
      .map((fileName) => {
        const fullPath = path.join(NOTES_DIRECTORY, fileName);

        try {
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data, content } = matter(fileContents);
          const rawSlug = data.slug || fileName.replace(/\.md$/, "");
          const slug = titleToSlug(rawSlug);

          // Extract title from frontmatter or use first heading or filename
          let title = rawSlug;
          if (!data.title && content) {
            const headingMatch = content.match(/^#\s+(.+)$/m);
            if (headingMatch) {
              title = headingMatch[1];
            }
          }

          // Ensure date is always a string (gray-matter might parse it as Date object)
          const dateString = data.date
            ? (data.date instanceof Date ? data.date.toISOString().split("T")[0] : String(data.date))
            : new Date().toISOString().split("T")[0];

          return {
            slug,
            filename: fileName,
            content,
            title,
            preview:
              data.preview || content.slice(0, 150).replace(/[#*\[\]]/g, ""),
            ...data,
            date: dateString, // Override after spreading to ensure it's always a string
          };
        } catch (error) {
          console.error(`Error reading note ${fileName}:`, error);
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

export async function getNoteBySlug(slug) {
  if (!ensureNotesDirectoryExists()) return null;

  try {
    // Load all notes (they already have standardized slugs and filenames)
    const allNotes = await getAllNotes();

    // Find the note that matches the slug
    const noteData = allNotes.find((n) => n.slug === slug);
    if (!noteData) return null;

    // Use the original filename to read the file
    const fullPath = path.join(NOTES_DIRECTORY, noteData.filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
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
      content: processedContent,
      title,
      ...data,
      date: dateString, // Override after spreading to ensure it's always a string
    };
  } catch (error) {
    console.error(`Error loading note ${slug}:`, error);
    return null;
  }
}
