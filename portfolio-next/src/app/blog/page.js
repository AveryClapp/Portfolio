import { getAllPosts } from '@/utils/BlogLoader';
import BlogList from '@/Components/BlogList/BlogList';

export const metadata = {
  title: "Avery Clapp",
  description: "Writing on technology, philosophy, and problem-solving.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogList blogPosts={posts} />;
}
