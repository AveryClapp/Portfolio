import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOGS_DIRECTORY = path.join(process.cwd(), 'src/Blogs');

// Helper function to ensure blogs directory exists
function ensureBlogsDirectoryExists() {
  if (!fs.existsSync(BLOGS_DIRECTORY)) {
    console.log(`Creating blogs directory at ${BLOGS_DIRECTORY}`);
    fs.mkdirSync(BLOGS_DIRECTORY, { recursive: true });
  }
}

export async function getAllPosts() {
  ensureBlogsDirectoryExists();
  try {
    const fileNames = fs.readdirSync(BLOGS_DIRECTORY);

    const allPostsData = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        console.log(fileName);
        const slug = fileName.replace(/\.md$/, '');

        const fullPath = path.join(BLOGS_DIRECTORY, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const { data, content } = matter(fileContents);

        return {
          slug,
          content,
          ...data
        };
      });

    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug) {
  ensureBlogsDirectoryExists();

  try {
    const fullPath = path.join(BLOGS_DIRECTORY, `${slug}.md`);

    // Check if file exists before trying to read it
    if (!fs.existsSync(fullPath)) {
      console.log(`Blog post not found: ${slug}`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // Combine the data with the id and content
    return {
      slug,
      content,
      ...data
    };
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}
