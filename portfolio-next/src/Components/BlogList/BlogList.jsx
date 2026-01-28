// src/Components/BlogList/BlogList.jsx
"use client";
import { useState } from "react";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import { Link } from "next-view-transitions";

const BlogList = ({ blogPosts }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const allTags = [...new Set(blogPosts.flatMap((post) => post.tags || []))].filter(tag => tag && tag.trim());
  const filteredPosts =
    selectedTags.length === 0
      ? blogPosts
      : blogPosts.filter(
          (post) =>
            post.tags && post.tags.some((tag) => selectedTags.includes(tag)),
        );

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div className="relative min-h-screen bg-stone-100 text-neutral-900 font-sans">
      <Header className="mb-6" />
      <main className="mb-6 relative z-20 flex-1">
        <div className="px-4 lg:ml-32">
          <div className="w-full lg:w-[55%]">
            {/* Title */}
            <h1 className="mb-6 text-2xl font-display font-bold text-neutral-900 tracking-tight">
              Blog Posts
            </h1>

            {/* Filter section - minimalist inline tags */}
            {allTags.length > 0 && (
              <div className="mb-8">
                <p className="text-xs text-neutral-500 mb-3">Filter by tag:</p>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          isSelected
                            ? "bg-neutral-900 text-white"
                            : "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Blog posts */}
            {filteredPosts.length > 0 ? (
              <div className="space-y-8">
                {filteredPosts.map((post, index) => (
                  <article
                    key={post.slug}
                    className={index < filteredPosts.length - 1 ? 'border-b border-neutral-200 pb-6' : 'pb-6'}
                  >
                    <h2 className="text-lg font-display font-semibold mb-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-neutral-600 transition-colors"
                        style={{ viewTransitionName: `blog-title-${post.slug}` }}
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <div className="flex items-center gap-3 text-xs text-neutral-500 mb-3">
                      <span>{post.date}</span>
                      {post.tags && post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-neutral-200 rounded-md text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {post.subtopics && post.subtopics.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs text-neutral-400 font-medium">Topics:</span>
                        {post.subtopics.map((subtopic) => (
                          <span
                            key={subtopic}
                            className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 rounded text-xs text-neutral-600 whitespace-nowrap"
                          >
                            {subtopic}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-neutral-700">{post.preview}</p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 text-center py-8">
                No posts found with the selected tags.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogList;
