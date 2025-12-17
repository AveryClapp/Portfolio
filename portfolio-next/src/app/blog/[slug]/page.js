import { getPostBySlug } from '@/utils/BlogLoader';
import BlogPost from '@/Components/BlogList/BlogPost';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const post = await getPostBySlug(slug);

  return {
    title: "Avery Clapp",
    description: post?.preview || "Blog post by Avery Clapp",
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const post = await getPostBySlug(slug);
  if (!post) {
    return notFound();
  }

  return <BlogPost post={post} />;
}
