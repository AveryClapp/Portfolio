"use client";
import Link from "next/link";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";

const BlogList = ({ blogPosts }) => {
  return (
    <div className="relative min-h-screen bg-stone-100 text-neutral-900 font-sans">
      <Header className="mb-6" />
      <main className="relative z-20 flex-1 mb-6">
        <div className="flex">
          {/* Main content - 3/5 width */}
          <div className="w-3/5 px-4 ml-32">
            <h1 className="text-2xl font-bold mb-8">Blog Posts</h1>
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <article
                  key={post.slug} // Changed from post.id to post.slug
                  className="border-b border-neutral-200 pb-6"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    <Link
                      href={`/blog/${post.slug}`} // Changed 'to' to 'href'
                      className="hover:text-neutral-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-neutral-500 mb-3">{post.date}</p>
                  <p className="text-neutral-700">{post.preview}</p>
                </article>
              ))}
            </div>
          </div>
          {/* Right column - 2/5 width */}
          <div className="w-2/5 px-4 mt-16">
            {/* Add any sidebar content here */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogList;
