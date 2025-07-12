// src/Components/BlogList/BlogPost.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from 'rehype-raw';
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";

const BlogPost = ({ post }) => {
	const [processedContent, setProcessedContent] = useState("");
	const [notes, setNotes] = useState([]);
	const [notePositions, setNotePositions] = useState({});
	const [minHeight, setMinHeight] = useState(0);
	const contentRef = useRef(null);
	const notesContainerRef = useRef(null);

	useEffect(() => {
		if (post?.content) {
			const noteRegex = /\^(\d+)\[([^\]]+)\]/g;
			const foundNotes = [];
			let modifiedContent = post.content;

			let match;
			while ((match = noteRegex.exec(post.content)) !== null) {
				foundNotes.push({
					id: match[1],
					text: match[2]
				});
			}

			modifiedContent = modifiedContent.replace(noteRegex, (match, id) => {
				return `^${id}`;
			});

			setNotes(foundNotes);
			setProcessedContent(modifiedContent);
		}
	}, [post]);

	const updateNotePositions = () => {
		if (!contentRef.current || !notesContainerRef.current) return;

		const newPositions = {};
		const markers = contentRef.current.querySelectorAll('.note-marker');
		const containerTop = notesContainerRef.current.getBoundingClientRect().top;
		const noteElements = notesContainerRef.current.querySelectorAll('.note-card');

		const noteGap = 4;
		let lastBottom = 0;

		markers.forEach((marker, index) => {
			const id = marker.getAttribute('data-note-id');
			const markerRect = marker.getBoundingClientRect();
			const noteElement = noteElements[index];
			const noteHeight = noteElement ? noteElement.offsetHeight : 100;

			const markerTop = markerRect.top - containerTop;
			const idealTop = markerTop - (noteHeight / 2);

			const actualTop = Math.max(idealTop, lastBottom);
			newPositions[id] = actualTop;

			lastBottom = actualTop + noteHeight + noteGap;
		});

		setNotePositions(newPositions);

		// Calculate minimum height needed for notes
		if (lastBottom > 0) {
			setMinHeight(lastBottom + 100); // Add some padding at the bottom
		}
	};

	useEffect(() => {
		setTimeout(updateNotePositions, 100);
		window.addEventListener('scroll', updateNotePositions);
		window.addEventListener('resize', updateNotePositions);

		return () => {
			window.removeEventListener('scroll', updateNotePositions);
			window.removeEventListener('resize', updateNotePositions);
		};
	}, [notes]);

	if (!post) {
		return <div>Post not found</div>;
	}

	// Shared function to process text and convert ^n to superscript
	const processTextWithNotes = (child) => {
		if (typeof child === 'string') {
			const parts = child.split(/(\^\d+)/);
			return parts.map((part, i) => {
				if (part.match(/^\^\d+$/)) {
					const num = part.substring(1);
					return (
						<sup
							key={i}
							className="hidden lg:inline text-neutral-800 font-semibold note-marker text-xs cursor-pointer hover:text-neutral-900 hover:bg-neutral-100 px-0.5 rounded-sm transition-colors duration-150"
							data-note-id={num}
						>
							{num}
						</sup>
					);
				}
				return part;
			});
		}
		return child;
	};

	const processChildren = (children) => {
		return Array.isArray(children)
			? children.map(processTextWithNotes).flat()
			: processTextWithNotes(children);
	};

	// Create a wrapper component that processes children for any element
	const createProcessedComponent = (Component, className) => {
		return ({ children, ...props }) => (
			<Component className={className} {...props}>
				{processChildren(children)}
			</Component>
		);
	};

	return (
		<div className="relative min-h-screen bg-stone-100 text-neutral-900 font-sans">
			<Header className="mb-6" />
			<main className="flex flex-col lg:flex-row pb-6 mb-6 border-b border-neutral-200" style={{ minHeight: minHeight ? `${minHeight}px` : 'auto' }}>
				<div className="w-full lg:w-3/5 px-4 lg:ml-32" ref={contentRef}>
					<article className="prose max-w-none text-black">
						<h1 className="text-xl font-bold">{post.title}</h1>
						<p className="text-sm mb-6">{post.date}</p>
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							rehypePlugins={[rehypeRaw]}
							className="prose prose-blue"
							components={{
								h1: createProcessedComponent('h1', 'text-3xl font-bold mt-8 mb-4'),
								h2: createProcessedComponent('h2', 'text-2xl font-bold mt-6 mb-3'),
								h3: createProcessedComponent('h3', 'text-xl font-bold mt-4 mb-2'),
								p: createProcessedComponent('p', 'mb-4 leading-relaxed'),
								li: createProcessedComponent('li', 'mb-2'),
								td: createProcessedComponent('td', 'px-4 py-2'),
								th: createProcessedComponent('th', 'px-4 py-2 font-semibold'),
								blockquote: createProcessedComponent('blockquote', 'border-l-4 border-gray-300 pl-4 italic my-4'),
								strong: createProcessedComponent('strong', 'font-semibold'),
								em: createProcessedComponent('em', 'italic'),
								ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4" {...props} />,
								ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4" {...props} />,
								code: ({ node, inline, children, ...props }) =>
									inline ? (
										<code className="bg-gray-100 rounded px-1 py-0.5" {...props}>
											{processChildren(children)}
										</code>
									) : (
										<code className="block bg-gray-100 p-4 rounded-lg mb-4 overflow-x-auto" {...props}>
											{children}
										</code>
									),
								a: ({ node, children, ...props }) => (
									<a className="text-blue-600 hover:underline" {...props}>
										{processChildren(children)}
									</a>
								),
							}}
						>
							{processedContent}
						</ReactMarkdown>
					</article>
				</div>

				{/* Hide notes on mobile */}
				<div className="hidden lg:block lg:w-2/5 px-4 relative" ref={notesContainerRef}>
					{notes.map((note) => (
						<div
							key={note.id}
							className="note-card text-xs p-4 absolute w-3/4 transition-all duration-300"
							style={{
								top: notePositions[note.id] ? `${notePositions[note.id]}px` : 'auto',
								position: notePositions[note.id] ? 'absolute' : 'static'
							}}
						>
							<p className="text-neutral-600 text-xs">{note.id}. {note.text}</p>
						</div>
					))}
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default BlogPost;
