// src/utils/BlogLoader.js
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "src/Blogs");

export function getBlogPost(slug) {
  try {
    const fullPath = join(postsDirectory, `${slug}.md`);
    const fileContents = readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      ...data,
      content,
    };
  } catch (error) {
    console.error("Error loading blog post:", error);
    return null;
  }
}

export function getAllBlogPosts() {
  try {
    const files = readdirSync(postsDirectory);
    return files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const fullPath = join(postsDirectory, file);
        const fileContents = readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        return {
          ...data,
          slug: file.replace(/\.md$/, ""),
        };
      })
      .sort((a, b) => (a.date > b.date ? -1 : 1));
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return [];
  }
}
