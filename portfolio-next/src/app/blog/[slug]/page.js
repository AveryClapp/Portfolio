import { getPostBySlug } from '@/utils/BlogLoader';
import BlogPost from '@/Components/BlogList/BlogPost';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  console.log("Slug:", slug);
  const post = await getPostBySlug(slug);
  if (!post) {
    return notFound();
  }

  return <BlogPost post={post} />;
}
