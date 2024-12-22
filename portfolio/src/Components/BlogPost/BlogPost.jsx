// components/Blog/BlogPost.jsx
import React from "react";
import Note from "../Note/Note";
import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { slug } = useParams();

  const blogContent = {
    "hash-based-regression-testing": {
      title: "Understanding Hash-Based Regression Testing",
      date: "2024-03-15",
      content: `
        <div>
          <p>Your blog post content here...</p>
          <h2>Section 1</h2>
          <p>More content...</p>
        </div>
      `,
      notes: [
        {
          number: 1,
          title: "Technical Note",
          content: "Additional context about hash-based testing...",
        },
        {
          number: 2,
          title: "Implementation Detail",
          content: "Specific implementation considerations...",
        },
      ],
    },
  };

  const post = blogContent[slug];

  return (
    <div className="flex bg-stone-100">
      {/* Main content - 3/5 width */}
      <div className="w-3/5 px-4 ml-32">
        <article>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-sm text-neutral-500 mb-8">{post.date}</p>
          <div
            className="prose prose-neutral max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>

      {/* Right column - 2/5 width */}
      <div className="w-2/5 px-4 mt-16 pl-8">
        {post.notes.map((note) => (
          <Note
            key={note.number}
            number={note.number}
            title={note.title}
            content={note.content}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPost;
