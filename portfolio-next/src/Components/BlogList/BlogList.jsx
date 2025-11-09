// src/Components/BlogList/BlogList.jsx
"use client";
import { useState } from "react";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import NoteWrapper from "@/Components/NoteSystem/NoteWrapper";
import SubscribeForm from "@/Components/Subscribe/SubscribeForm";

const BlogList = ({ blogPosts }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const allTags = [...new Set(blogPosts.flatMap((post) => post.tags || []))];
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

  // Build just the blog posts content
  const buildBlogPostsContent = () => {
    return `
      <div class="space-y-8">
        ${
          filteredPosts.length > 0
            ? filteredPosts
                .map(
                  (post) => `
            <article class="border-b border-neutral-200 pb-6">
              <h2 class="text-lg font-display font-semibold mb-2">
                <a href="/blog/${post.slug}" class="hover:text-neutral-600 transition-colors">
                  ${post.title}
                </a>
              </h2>
              <div class="flex items-center gap-3 text-xs text-neutral-500 mb-3">
                <span>${post.date}</span>
                ${
                  post.tags
                    ? post.tags
                        .map(
                          (tag) => `
                    <span class="px-2 py-1 bg-neutral-200 rounded-md text-xs mr-1">
                      ${tag}
                    </span>
                  `,
                        )
                        .join("")
                    : ""
                }
              </div>
              ${
                post.subtopics && post.subtopics.length > 0
                  ? `
                <div class="flex items-center gap-2 mb-3">
                  <span class="text-xs text-neutral-400 font-medium">Topics:</span>
                  ${post.subtopics
                    .map(
                      (subtopic) => `
                    <span class="px-2 py-0.5 bg-neutral-100 border border-neutral-300 rounded text-xs text-neutral-600">
                      ${subtopic}
                    </span>
                  `,
                    )
                    .join("")}
                </div>
              `
                  : ""
              }
              <p class="text-neutral-700">${post.preview}</p>
            </article>
          `,
                )
                .join("")
            : `<p class="text-neutral-500 text-center py-8">
              No posts found with the selected tags.
            </p>`
        }
      </div>
    `;
  };

  return (
    <div className="relative min-h-screen bg-stone-100 text-neutral-900 font-sans">
      <Header className="mb-6" />
      <main className="mb-6 relative z-20 flex-1">
        <div className="px-4 lg:ml-32">
          <div className="w-full lg:w-[55%]">
            {/* Title */}
            <h1 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-neutral-900 tracking-tight">
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
          </div>

          {/* Blog posts through NoteWrapper */}
          <NoteWrapper content={buildBlogPostsContent()} />

          {/* Subscribe form at bottom */}
          <div className="w-full lg:w-[55%] mt-12 pt-8 border-t border-neutral-200">
            <SubscribeForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogList;
