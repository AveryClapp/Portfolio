"use client"; // Add this since we're using client-side ReactMarkdown
import Note from "@/Components/Note/Note"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Header from "@/Components/Header/Header"
import Footer from "@/Components/Footer/Footer"
const BlogPost = ({ post }) => {
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="relative min-h-screen bg-stone-100 text-neutral-900 font-sans"> 
	<Header className="mb-6" />
    <main className="flex pb-6 mb-6 border-b border-neutral-200">
      {/* Main content - 3/5 width */}
      <div className="w-3/5 px-4 ml-32">
        <article className="prose max-w-none text-black">
          <h1 className="text-xl font-bold">{post.title}</h1>
          <p className="text-sm mb-6">{post.date}</p>
		        <ReactMarkdown
		          remarkPlugins={[remarkGfm]}
		          components={{
						            img: ({ node, ...props }) => (
											            <img {...props} className="rounded-lg shadow-lg" alt="" />
											          ),
								            code: ({ node, inline, className, children, ...props }) => {
													            return !inline ? (
																		              <pre>
																		                <code {...props}>{children}</code>
																		              </pre>
																		            ) : (
																							              <code {...props}>{children}</code>
																							            );
													          },
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
	  </main>
	  <Footer />
    </div>
  );
};

export default BlogPost;
