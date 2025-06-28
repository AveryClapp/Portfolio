"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";

const BlogList = ({ blogPosts }) => {
  const [selectedTag, setSelectedTag] = useState('all');

  const allTags = ['all', ...new Set(blogPosts.flatMap(post => post.tags || []))];
  const filteredPosts = selectedTag === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.tags && post.tags.includes(selectedTag));

  useEffect(() => {
  }, []);

  return (
    <div className="relative min-h-screen bg-stone-100 text-neutral-900 font-sans">
      <Header className="mb-6" />
      <main className="relative z-20 flex-1 mb-6">
        <div className="flex">
          {/* Main content - 3/5 width */}
          <div className="w-3/5 px-4 ml-32">
            <h1 className="text-2xl font-bold mb-8">Blog Posts</h1>

            {/* Tag filter buttons */}
            <div className="mb-6 flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedTag === tag
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                    }`}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </button>
              ))}
            </div>

            {/* Blog posts list */}
            <div className="space-y-8">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="border-b border-neutral-200 pb-6"
                  >
                    <h2 className="text-xl font-semibold mb-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-neutral-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
                      <span>{post.date}</span>
                      {post.tags && post.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-neutral-200 rounded-md text-xs mr-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-neutral-700">{post.preview}</p>
                  </article>
                ))
              ) : (
                <p className="text-neutral-500 text-center py-8">
                  No posts found with the selected tag.
                </p>
              )}
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
