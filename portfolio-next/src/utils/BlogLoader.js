import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { processWikilinks } from './WikilinkProcessor';

const BLOGS_DIRECTORY = path.join(process.cwd(), 'src/Blogs');

// Helper function to ensure blogs directory exists
function ensureBlogsDirectoryExists() {
  if (!fs.existsSync(BLOGS_DIRECTORY)) {
    console.log(`Creating blogs directory at ${BLOGS_DIRECTORY}`);
    fs.mkdirSync(BLOGS_DIRECTORY, { recursive: true });
  }
}

function getAllMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip todos directory in production and removed directory always
      if ((file === 'todos' && process.env.NODE_ENV === 'production') || file === 'removed') {
        return;
      }
      getAllMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

export async function getAllPosts() {
  ensureBlogsDirectoryExists();
  try {
    const allFiles = getAllMarkdownFiles(BLOGS_DIRECTORY);

    const allPostsData = allFiles.map(fullPath => {
      const fileName = path.basename(fullPath);
      const slug = fileName.replace(/\.md$/, '');
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        ...data
      };
    });

    return allPostsData.sort((a, b) => {
      // Convert MM-DD-YYYY to Date object for proper comparison
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      // Sort descending (newest first)
      return dateB - dateA;
    });
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug) {
  ensureBlogsDirectoryExists();

  try {
    // Try main directory first
    let fullPath = path.join(BLOGS_DIRECTORY, `${slug}.md`);

    // If not found and in development, check todos directory
    if (!fs.existsSync(fullPath) && process.env.NODE_ENV === 'development') {
      fullPath = path.join(BLOGS_DIRECTORY, 'todos', `${slug}.md`);
    }

    // Check if file exists before trying to read it
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // Process wikilinks in content
    const processedContent = await processWikilinks(content);

    // Combine the data with the id and content
    return {
      slug,
      content: processedContent,
      ...data
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}
