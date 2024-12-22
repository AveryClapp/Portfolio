"use client"; // Add this since we're using client-side ReactMarkdown
import Note from "@/Components/Note/Note"; // Fix capitalization
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogPost = ({ post }) => {
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="flex">
      {/* Main content - 3/5 width */}
      <div className="w-3/5 px-4 ml-32">
        <article className="prose max-w-none text-black">
          <h1>{post.title}</h1>
          <p className="text-sm">{post.date}</p>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ node, ...props }) => (
                <img {...props} className="rounded-lg shadow-sm" />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </div>

      {/* Right column - 2/5 width */}
      <div className="w-2/5 px-4">
        {post.notes &&
          post.notes.map((note) => (
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
