import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogList from "@/components/BlogList/BlogList";

async function getPostData() {
  const postsDirectory = path.join(process.cwd(), "src/Blogs");
  const files = fs.readdirSync(postsDirectory);

  const posts = files.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      ...data,
      slug: filename.replace(/\.md$/, ""),
    };
  });

  return posts;
}

export default async function BlogPage() {
  const posts = await getPostData();
  return <BlogList blogPosts={posts} />;
}
