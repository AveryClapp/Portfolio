// src/Components/BlogList/BlogList.jsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import NoteWrapper from "@/Components/NoteSystem/NoteWrapper";

const BlogList = ({ blogPosts }) => {
  const [selectedTag, setSelectedTag] = useState('all');

  const allTags = ['all', ...new Set(blogPosts.flatMap(post => post.tags || []))];
  const filteredPosts = selectedTag === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.tags && post.tags.includes(selectedTag));

  useEffect(() => {
  }, []);

  // Build the HTML content string
  const buildBlogListContent = () => {
    return `
      <div>
        <h1 class="text-2xl font-bold mb-8">Blog Posts</h1>

        <!-- Tag filter buttons -->
        <div class="mb-6 flex flex-wrap gap-2">
          ${allTags.map((tag) => `
            <button
              onclick="window.handleTagClick('${tag}')"
              class="px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedTag === tag
        ? 'bg-neutral-900 text-white'
        : 'bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100'
      }"
            >
              ${tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          `).join('')}
        </div>

        <!-- Blog posts list -->
        <div class="space-y-8">
          ${filteredPosts.length > 0 ? (
        filteredPosts.map((post) => `
              <article
                key="${post.slug}"
                class="border-b border-neutral-200 pb-6"
              >
                <h2 class="text-xl font-semibold mb-2">
                  <a
                    href="/blog/${post.slug}"
                    class="hover:text-neutral-600 transition-colors"
                  >
                    ${post.title}
                  </a>
                </h2>
                <div class="flex items-center gap-3 text-sm text-neutral-500 mb-3">
                  <span>${post.date}</span>
                  ${post.tags ? post.tags.map(tag => `
                    <span class="px-2 py-1 bg-neutral-200 rounded-md text-xs mr-1">
                      ${tag}
                    </span>
                  `).join('') : ''}
                </div>
                ${post.subtopics && post.subtopics.length > 0 ? `
                  <div class="flex items-center gap-2 mb-3">
                    <span class="text-xs text-neutral-400 font-medium">Topics:</span>
                    ${post.subtopics.map(subtopic => `
                      <span class="px-2 py-0.5 bg-neutral-100 border border-neutral-300 rounded text-xs text-neutral-600">
                        ${subtopic}
                      </span>
                    `).join('')}
                  </div>
                ` : ''}
                <p class="text-neutral-700">${post.preview}</p>
              </article>
            `).join('')
      ) : (
        `<p class="text-neutral-500 text-center py-8">
              No posts found with the selected tag.
            </p>`
      )}
        </div>
      </div>
    `;
  };

  // Handle tag clicks
  useEffect(() => {
    window.handleTagClick = (tag) => {
      setSelectedTag(tag);
    };
    return () => {
      delete window.handleTagClick;
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-stone-100 text-neutral-900 font-sans">
      <Header className="mb-6" />
      <main className="relative z-20 flex-1 mb-6">
        <div className="flex">
          <div className="w-full px-4 lg:ml-32">
            <NoteWrapper content={buildBlogListContent()} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogList;
