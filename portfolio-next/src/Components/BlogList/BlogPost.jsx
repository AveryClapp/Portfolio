"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from 'rehype-raw';
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import Note from "@/Components/Note/Note";

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
							rehypePlugins={[rehypeRaw]}
							className="prose prose-blue"
							components={{
								h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
								h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
								h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
								p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
								ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4" {...props} />,
								ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4" {...props} />,
								li: ({ node, ...props }) => <li className="mb-2" {...props} />,
								code: ({ node, inline, ...props }) =>
									inline ?
										<code className="bg-gray-100 rounded px-1 py-0.5" {...props} /> :
										<code className="block bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto" {...props} />,
								blockquote: ({ node, ...props }) =>
									<blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />,
								a: ({ node, ...props }) =>
									<a className="text-blue-600 hover:underline" {...props} />,
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
