// src/Components/BlogList/BlogPost.jsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from 'rehype-raw';
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import { Copy, Check } from "lucide-react";

// Import KaTeX CSS
import 'katex/dist/katex.min.css';

const BlogPost = ({ post }) => {
	const [processedContent, setProcessedContent] = useState("");
	const [notes, setNotes] = useState([]);
	const [notePositions, setNotePositions] = useState({});
	const [minHeight, setMinHeight] = useState(0);
	const [copiedCode, setCopiedCode] = useState(null);
	const contentRef = useRef(null);
	const notesContainerRef = useRef(null);

	// Add a global counter for unique keys
	const keyCounterRef = useRef(0);
	const getUniqueKey = () => `key_${++keyCounterRef.current}`;

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

		if (lastBottom > 0) {
			setMinHeight(lastBottom + 100);
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

	// Copy code function
	const copyToClipboard = async (text, id) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedCode(id);
			setTimeout(() => setCopiedCode(null), 2000);
		} catch (err) {
			console.error('Failed to copy code:', err);
		}
	};

	if (!post) {
		return <div>Post not found</div>;
	}

	const processTextWithNotes = (child, parentKey = '') => {
		if (typeof child === 'string') {
			const parts = child.split(/(\^\d+)/);
			return parts.map((part, i) => {
				// Create unique key using parent context + local index
				const uniqueKey = `${parentKey}_part_${i}`;

				if (part.match(/^\^\d+$/)) {
					const num = part.substring(1);
					return (
						<sup
							key={uniqueKey} // ✅ Now using unique keys
							className="hidden lg:inline text-neutral-800 font-semibold note-marker text-xs cursor-pointer hover:text-neutral-900 hover:bg-neutral-100 px-0.5 rounded-sm transition-colors duration-150"
							data-note-id={num}
						>
							{num}
						</sup>
					);
				}
				return <React.Fragment key={uniqueKey}>{part}</React.Fragment>;
			});
		}
		return child;
	};

	const processChildren = (children, parentKey = '') => {
		if (Array.isArray(children)) {
			return children.map((child, index) => {
				const childKey = `${parentKey}_child_${index}`;
				const processed = processTextWithNotes(child, childKey);

				// If processTextWithNotes returns an array, wrap it in a Fragment with a key
				if (Array.isArray(processed)) {
					return <React.Fragment key={childKey}>{processed}</React.Fragment>;
				}
				return processed;
			});
		}
		return processTextWithNotes(children, parentKey);
	};

	const createProcessedComponent = (Component, className) => {
		return ({ children, ...props }) => {
			const componentKey = getUniqueKey();
			return (
				<Component className={className} {...props}>
					{processChildren(children, componentKey)}
				</Component>
			);
		};
	};

	const CustomImage = ({ src, alt, title, ...props }) => {
		const imageSrc = src.startsWith('/') ? src : `/${src}`;

		return (
			<img
				src={imageSrc}
				alt={alt || 'Blog image'}
				title={title}
				className="blog-image rounded-lg shadow-sm w-full max-w-lg h-auto mx-auto block my-7"
				{...props}
			/>
		);
	};

	const CustomParagraph = ({ children, ...props }) => {
		const hasOnlyImage = React.Children.count(children) === 1 &&
			React.Children.toArray(children).some(child =>
				React.isValidElement(child) && (child.type === 'img' || child.type === CustomImage)
			);

		const paragraphKey = getUniqueKey();

		if (hasOnlyImage) {
			return (
				<div className="my-6 flex justify-center" {...props}>
					{processChildren(children, paragraphKey)}
				</div>
			);
		}

		return (
			<p className="mb-4 leading-relaxed" {...props}>
				{processChildren(children, paragraphKey)}
			</p>
		);
	};

	// Enhanced Code Block Component
	const CustomCodeBlock = ({ node, inline, className, children, ...props }) => {
		const match = /language-(\w+)/.exec(className || '');
		const language = match ? match[1] : '';
		const codeString = String(children).replace(/\n$/, '');
		// Create a stable ID based on code content hash
		const codeId = React.useMemo(() => {
			const hash = codeString.split('').reduce((a, b) => {
				a = ((a << 5) - a) + b.charCodeAt(0);
				return a & a;
			}, 0);
			return `code-${Math.abs(hash)}`;
		}, [codeString]);

		const codeKey = getUniqueKey();

		if (inline) {
			return (
				<code className="bg-neutral-100 text-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
					{processChildren(children, codeKey)}
				</code>
			);
		}

		return (
			<div className="relative group mb-6">
				{/* Language label and copy button */}
				<div className="flex items-center justify-between bg-neutral-800 text-white px-4 py-2 rounded-t-lg text-sm">
					<span className="font-mono text-neutral-300">
						{language || 'code'}
					</span>
					<button
						onClick={() => copyToClipboard(codeString, codeId)}
						className="flex items-center gap-1 px-2 py-1 bg-neutral-700 hover:bg-neutral-600 rounded text-xs transition-colors"
						title="Copy to clipboard"
					>
						{copiedCode === codeId ? (
							<>
								<Check size={12} />
								Copied!
							</>
						) : (
							<>
								<Copy size={12} />
								Copy
							</>
						)}
					</button>
				</div>

				{/* Code content */}
				<SyntaxHighlighter
					style={oneDark}
					language={language || 'text'}
					PreTag="div"
					customStyle={{
						margin: 0,
						borderTopLeftRadius: 0,
						borderTopRightRadius: 0,
						borderBottomLeftRadius: '0.5rem',
						borderBottomRightRadius: '0.5rem',
						fontSize: '0.875rem',
						lineHeight: '1.5',
					}}
					codeTagProps={{
						style: {
							fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
						}
					}}
					{...props}
				>
					{codeString}
				</SyntaxHighlighter>
			</div>
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
							remarkPlugins={[remarkGfm, remarkMath]}
							rehypePlugins={[rehypeRaw, rehypeKatex]}
							className="prose prose-blue"
							components={{
								h1: createProcessedComponent('h1', 'text-3xl font-bold mt-8 mb-4'),
								h2: createProcessedComponent('h2', 'text-2xl font-bold mt-6 mb-3'),
								h3: createProcessedComponent('h3', 'text-xl font-bold mt-4 mb-2'),
								p: CustomParagraph,
								li: createProcessedComponent('li', 'mb-2'),
								td: createProcessedComponent('td', 'px-4 py-2'),
								th: createProcessedComponent('th', 'px-4 py-2 font-semibold'),
								blockquote: createProcessedComponent('blockquote', 'border-l-4 border-gray-300 pl-4 italic my-4'),
								strong: createProcessedComponent('strong', 'font-semibold'),
								em: createProcessedComponent('em', 'italic'),
								ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4" {...props} />,
								ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4" {...props} />,
								img: CustomImage,
								code: CustomCodeBlock,
								pre: ({ children }) => <>{children}</>, // Remove default pre wrapper since SyntaxHighlighter handles it
								a: ({ node, children, ...props }) => {
									const linkKey = getUniqueKey();
									return (
										<a className="text-blue-600 hover:underline" {...props}>
											{processChildren(children, linkKey)}
										</a>
									);
								},
							}}
						>
							{processedContent}
						</ReactMarkdown>
					</article>
				</div>

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
