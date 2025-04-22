import { getAllPosts } from '@/utils/BlogLoader';
import BlogList from '@/Components/BlogList/BlogList';

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogList blogPosts={posts} />;
}
