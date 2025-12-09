// src/Components/BlogList/BlogPost.jsx
"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import ChessSlideshow from "@/Components/BlogComponents/Chess/ChessSlideshow";
import MusicalTuningExplorer from "@/Components/BlogComponents/Music/MusicalTuningExplorer";
import SubscribeForm from "@/Components/Subscribe/SubscribeForm";
import {
  kingsGambitBasic,
  kingsGambitAccepted,
  kingsGambitDeclined,
  spasskyBronstein1960,
} from "@/Components/BlogComponents/Chess/openings";

// Import KaTeX CSS
import "katex/dist/katex.min.css";

// Format date from YYYY-MM-DD to MM-DD-YYYY
function formatDate(dateString) {
  if (!dateString) return '';

  // Check if already in MM-DD-YYYY format
  if (dateString.match(/^\d{2}-\d{2}-\d{4}$/)) {
    return dateString;
  }

  // Convert from YYYY-MM-DD to MM-DD-YYYY
  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [year, month, day] = dateString.split('-');
    return `${month}-${day}-${year}`;
  }

  return dateString;
}

const BlogPost = ({ post, isNote = false }) => {
  const [processedContent, setProcessedContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [notePositions, setNotePositions] = useState({});
  const contentRef = useRef(null);
  const notesContainerRef = useRef(null);

  // Add a global counter for unique keys
  const keyCounterRef = useRef(0);
  const getUniqueKey = () => `key_${++keyCounterRef.current}`;

  // Function to render markdown in sidenote text
  const renderMarkdownInText = (text) => {
    let processedText = text;

    // Handle KaTeX math first (before other processing)
    // Display math: $$...$$
    processedText = processedText.replace(
      /\$\$([^$]+)\$\$/g,
      (match, mathContent) => {
        try {
          const katex = require("katex");
          return katex.renderToString(mathContent, {
            throwOnError: false,
            displayMode: true,
          });
        } catch (e) {
          console.error("KaTeX display math error:", e);
          return match; // Return original if math fails to render
        }
      },
    );

    // Inline math: $...$
    processedText = processedText.replace(
      /\$([^$]+)\$/g,
      (match, mathContent) => {
        try {
          const katex = require("katex");
          return katex.renderToString(mathContent, {
            throwOnError: false,
            displayMode: false,
          });
        } catch (e) {
          console.error("KaTeX inline math error:", e);
          return match; // Return original if math fails to render
        }
      },
    );

    // Handle images: ![alt text](image_url)
    processedText = processedText.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (match, alt, src) => {
        // Handle relative paths
        const imageSrc = src.startsWith("/") ? src : `/${src}`;
        return `<img src="${imageSrc}" alt="${alt || "Sidenote image"}" style="width: 100%; max-width: 128px; height: auto; border-radius: 6px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); margin-top: 8px; margin-bottom: 4px;" />`;
      },
    );

    // Handle basic markdown formatting
    // Bold: **text** or __text__
    processedText = processedText.replace(
      /\*\*([^*]+?)\*\*/g,
      "<strong>$1</strong>",
    );
    processedText = processedText.replace(
      /__([^_]+?)__/g,
      "<strong>$1</strong>",
    );

    // Italic: *text* or _text_
    processedText = processedText.replace(/\*([^*]+?)\*/g, "<em>$1</em>");
    processedText = processedText.replace(/_([^_]+?)_/g, "<em>$1</em>");

    // Code: `text`
    processedText = processedText.replace(
      /`([^`]+)`/g,
      '<code class="bg-neutral-200 text-neutral-800 px-1 py-0.5 rounded text-xs font-mono">$1</code>',
    );

    // Links: [text](url) - internal links stay in same tab
    processedText = processedText.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (match, text, url) => {
        // Check if it's an internal link (starts with / or relative)
        const isInternal = url.startsWith('/') || !url.match(/^https?:\/\//);
        if (isInternal) {
          return `<a href="${url}" class="text-blue-600 hover:underline">${text}</a>`;
        }
        return `<a href="${url}" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">${text}</a>`;
      }
    );

    return processedText;
  };

  const processTextWithNotes = (child, parentKey = "") => {
    if (typeof child === "string") {
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

  const updateNotePositions = () => {
    if (!contentRef.current || !notesContainerRef.current || notes.length === 0)
      return;

    const newPositions = {};
    const markers = contentRef.current.querySelectorAll(".note-marker");
    const notesRect = notesContainerRef.current.getBoundingClientRect();

    // First pass: calculate base positions
    const basePositions = [];
    markers.forEach((marker) => {
      const id = marker.getAttribute("data-note-id");
      const markerRect = marker.getBoundingClientRect();
      const relativeTop = markerRect.top - notesRect.top;

      basePositions.push({
        id,
        originalTop: Math.max(0, relativeTop - 20),
        finalTop: Math.max(0, relativeTop - 20),
      });
    });

    // Second pass: resolve collisions
    const NOTE_HEIGHT = 20; // More realistic height for note cards with padding
    const MIN_SPACING = 50; // Refined spacing between notes

    // Sort by original position to process top-to-bottom
    basePositions.sort((a, b) => a.originalTop - b.originalTop);

    // More efficient collision detection - only check against the last positioned note
    for (let i = 1; i < basePositions.length; i++) {
      const currentNote = basePositions[i];
      const previousNote = basePositions[i - 1];

      const requiredTop = previousNote.finalTop + NOTE_HEIGHT + MIN_SPACING;

      // Only push down if there would be a collision
      if (currentNote.finalTop < requiredTop) {
        currentNote.finalTop = requiredTop;
      }
    }

    // Apply final positions
    basePositions.forEach((note) => {
      newPositions[note.id] = note.finalTop;
    });

    setNotePositions(newPositions);
  };

  useEffect(() => {
    // Only run once when notes are loaded/changed
    if (notes.length > 0) {
      const timeoutId = setTimeout(updateNotePositions, 150);
      return () => clearTimeout(timeoutId);
    }
  }, [notes]);

  const processChildren = (children, parentKey = "") => {
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
    const imageSrc = src.startsWith("/") ? src : `/${src}`;

    return (
      <img
        src={imageSrc}
        alt={alt || "Blog image"}
        title={title}
        className="blog-image rounded-lg shadow-sm w-full max-w-lg h-auto mx-auto block my-7"
        {...props}
      />
    );
  };

  const CustomParagraph = ({ children, node, ...props }) => {
    const hasOnlyImage =
      React.Children.count(children) === 1 &&
      React.Children.toArray(children).some(
        (child) =>
          React.isValidElement(child) &&
          (child.type === "img" || child.type === CustomImage),
      );

    // Check if this paragraph contains code blocks
    const containsCodeBlock =
      node?.children?.some(
        (child) =>
          child.type === "element" &&
          child.tagName === "code" &&
          (child.properties?.className?.some((cls) =>
            cls.startsWith("language-"),
          ) ||
            !child.properties?.className), // This catches code blocks without language
      ) ||
      React.Children.toArray(children).some(
        (child) =>
          React.isValidElement(child) &&
          typeof child.type === "function" &&
          child.type.name === "CustomCodeBlock",
      );

    const paragraphKey = getUniqueKey();

    if (hasOnlyImage) {
      return (
        <div className="my-6 flex justify-center" {...props}>
          {processChildren(children, paragraphKey)}
        </div>
      );
    }

    // If paragraph contains a code block, render as div to avoid HTML nesting issues
    if (containsCodeBlock) {
      return (
        <div className="mb-4 leading-relaxed code-block-container" {...props}>
          {processChildren(children, paragraphKey)}
        </div>
      );
    }

    return (
      <div className="mb-4 leading-relaxed" {...props}>
        {processChildren(children, paragraphKey)}
      </div>
    );
  };

  // FIXED: Enhanced Code Block Component
  const CustomCodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";
    const codeString = String(children).replace(/\n$/, "");

    // ===== PGN DETECTION: Render ChessSlideshow for PGN code blocks =====
    if (language === "pgn" && !inline) {
      try {
        const { parsePGN } = require("@/utils/pgnParser");
        const chessData = parsePGN(codeString);
        return <ChessSlideshow {...chessData} />;
      } catch (error) {
        console.error("PGN parsing error:", error);
        return (
          <div className="border-2 border-red-300 bg-red-50 p-4 rounded mb-6">
            <p className="text-red-800 font-semibold">Error parsing PGN</p>
            <p className="text-sm text-red-600">{error.message}</p>
            <pre className="text-xs mt-2 text-neutral-700 overflow-x-auto">{codeString}</pre>
          </div>
        );
      }
    }
    // ===== END PGN DETECTION =====

    // ===== MUSICAL TUNING DETECTION: Render MusicalTuningExplorer =====
    if (language === "musicaltuning" && !inline) {
      return <MusicalTuningExplorer />;
    }
    // ===== END MUSICAL TUNING DETECTION =====

    // Create a stable ID based on code content hash
    const codeId = React.useMemo(() => {
      const hash = codeString.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0);
      return `code-${Math.abs(hash)}`;
    }, [codeString]);

    const codeKey = getUniqueKey();

    // Enhanced inline detection - check multiple conditions
    const isInlineCode =
      inline ||
      !className ||
      className === "" || // No language class = inline
      (!codeString.includes("\n") && codeString.length < 50 && !language); // Short, no newlines, no language

    if (isInlineCode) {
      return (
        <code
          className="bg-neutral-200 text-neutral-800 px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {processChildren(children, codeKey)}
        </code>
      );
    }

    // Code block styling aligned with site theme
    const codeBlockContent = (
      <div className="relative mb-6 border-2 border-neutral-400 rounded overflow-hidden">
        {/* Language label in top right corner */}
        {language && (
          <div className="absolute top-2 right-2 z-10">
            <span className="text-xs font-mono text-neutral-500 bg-stone-50 px-2 py-1 rounded">
              {language}
            </span>
          </div>
        )}

        {/* Code content with site-aligned styling */}
        <SyntaxHighlighter
          style={{
            'code[class*="language-"]': {
              color: "#1F2937",
              background: "transparent",
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              fontSize: "0.875rem",
              lineHeight: "1.5",
            },
            'pre[class*="language-"]': {
              color: "#1F2937",
              background: "transparent",
              padding: "1rem",
              margin: "0",
              overflow: "auto",
            },
            comment: { color: "#6B7280", fontStyle: "italic" },
            keyword: { color: "#111827", fontWeight: "600" },
            string: { color: "#047857" },
            number: { color: "#B91C1C" },
            function: { color: "#6B21A8" },
            operator: { color: "#1F2937" },
            punctuation: { color: "#4B5563" },
            property: { color: "#0E7490" },
            tag: { color: "#B91C1C" },
            "attr-name": { color: "#6B21A8" },
            "attr-value": { color: "#047857" },
            namespace: { color: "#6B21A8" },
            prolog: { color: "#6B7280" },
            doctype: { color: "#6B7280" },
            cdata: { color: "#6B7280" },
            entity: { color: "#B91C1C" },
            url: { color: "#0E7490" },
            symbol: { color: "#B91C1C" },
            boolean: { color: "#B91C1C" },
            variable: { color: "#111827" },
            constant: { color: "#B91C1C" },
            selector: { color: "#047857" },
            important: { color: "#B91C1C", fontWeight: "600" },
            atrule: { color: "#6B21A8" },
            builtin: { color: "#6B21A8" },
            "class-name": { color: "#111827" },
            regex: { color: "#047857" },
            deleted: { color: "#B91C1C" },
            inserted: { color: "#047857" },
          }}
          language={language || "text"}
          PreTag="pre"
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: "2.5em",
            paddingRight: "1em",
            color: "#A8A29E",
            textAlign: "right",
            userSelect: "none",
            borderRight: "1px solid #E7E5E4",
            marginRight: "1em",
          }}
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "#FAFAF9",
            fontSize: "0.875rem",
            lineHeight: "1.5",
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          }}
          codeTagProps={{
            style: {
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            },
          }}
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );

    return codeBlockContent;
  };

  useEffect(() => {
    if (post?.content) {
      const foundNotes = [];
      let modifiedContent = post.content;

      // Custom function to find sidenotes with proper bracket matching
      const findSidenotes = (text) => {
        const results = [];
        const regex = /\^(\d+)\[/g;
        let match;

        while ((match = regex.exec(text)) !== null) {
          const id = match[1];
          const startIndex = match.index + match[0].length;
          let bracketCount = 1;
          let endIndex = startIndex;

          // Find the matching closing bracket
          while (endIndex < text.length && bracketCount > 0) {
            if (text[endIndex] === "[") {
              bracketCount++;
            } else if (text[endIndex] === "]") {
              bracketCount--;
            }
            endIndex++;
          }

          if (bracketCount === 0) {
            const content = text.substring(startIndex, endIndex - 1);
            results.push({
              id,
              text: content,
              fullMatch: text.substring(match.index, endIndex),
              processedText: renderMarkdownInText(content),
            });
          }
        }

        return results;
      };

      const sidenotes = findSidenotes(post.content);

      // Replace sidenotes in content
      sidenotes.forEach((note) => {
        modifiedContent = modifiedContent.replace(
          note.fullMatch,
          `^${note.id}`,
        );
        foundNotes.push({
          id: note.id,
          text: note.text,
          processedText: note.processedText,
        });
      });

      setNotes(foundNotes);
      setProcessedContent(modifiedContent);
    }
  }, [post]);

  // ONLY CHANGE: Simplified static note positioning
  useEffect(() => {
    if (notes.length === 0) return;

    const positionNotes = () => {
      if (!contentRef.current || !notesContainerRef.current) return;

      const newPositions = {};
      const markers = contentRef.current.querySelectorAll(".note-marker");
      const notesRect = notesContainerRef.current.getBoundingClientRect();

      markers.forEach((marker) => {
        const id = marker.getAttribute("data-note-id");
        const markerRect = marker.getBoundingClientRect();
        const relativeTop = markerRect.top - notesRect.top;
        newPositions[id] = Math.max(0, relativeTop - 20);
      });

      setNotePositions(newPositions);
    };

    // Position notes after initial render
    const initialTimeout = setTimeout(positionNotes, 100);

    // Recalculate after images load
    const images = contentRef.current?.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images?.length || 0;

    const handleImageLoad = () => {
      loadedImages++;
      if (loadedImages === totalImages) {
        setTimeout(positionNotes, 50);
      }
    };

    images?.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener('load', handleImageLoad);
        img.addEventListener('error', handleImageLoad);
      }
    });

    // Recalculate on window resize
    window.addEventListener('resize', positionNotes);

    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener('resize', positionNotes);
      images?.forEach((img) => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, [notes]);


  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="relative min-h-screen bg-stone-100 text-neutral-900 font-sans">
      <Header className="mb-6" />
      <main className="mb-6 relative z-20 flex-1">
        <div className="flex flex-col lg:flex-row pb-6 border-b border-neutral-200">
          {/* Main content - flows naturally */}
          <div className="px-4 lg:ml-32 w-full lg:w-[55%]" ref={contentRef}>
          <article className="prose max-w-none text-black">
            <h1 className="text-xl font-bold">{post.title}</h1>
            <p className="text-sm mb-6">{formatDate(post.date)}</p>
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeRaw, rehypeKatex]}
              className="prose prose-blue"
              components={{
                h1: createProcessedComponent(
                  "h1",
                  "text-3xl font-bold mt-8 mb-4",
                ),
                h2: createProcessedComponent(
                  "h2",
                  "text-2xl font-bold mt-6 mb-3",
                ),
                h3: createProcessedComponent(
                  "h3",
                  "text-xl font-medium subtle-oblique mt-4 mb-2",
                ),
                p: CustomParagraph,
                li: createProcessedComponent("li", "mb-2"),
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto mb-6 -mx-4 px-4 lg:mx-0 lg:px-0">
                    <table className="min-w-full border-collapse border border-neutral-300" {...props} />
                  </div>
                ),
                td: createProcessedComponent("td", "px-4 py-2 border border-neutral-200"),
                th: createProcessedComponent("th", "px-4 py-2 font-semibold border border-neutral-300 bg-neutral-100"),
                blockquote: createProcessedComponent(
                  "blockquote",
                  "border-l-4 border-gray-300 pl-4 italic my-4",
                ),
                strong: createProcessedComponent("strong", "font-semibold"),
                em: createProcessedComponent("em", "italic"),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside mb-4" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal list-inside mb-4" {...props} />
                ),
                img: CustomImage,
                code: CustomCodeBlock,
                pre: ({ node, children, ...props }) => {
                  // Handle pre elements that contain code blocks
                  return <div className="not-prose">{children}</div>;
                },
                a: ({ node, children, ...props }) => {
                  const linkKey = getUniqueKey();
                  return (
                    <a className="text-blue-600 hover:underline" {...props}>
                      {processChildren(children, linkKey)}
                    </a>
                  );
                },
                chessdemo: ({ opening }) => {
                  const openingData = {
                    kingsGambitBasic: kingsGambitBasic,
                    kingsGambitAccepted: kingsGambitAccepted,
                    kingsGambitDeclined: kingsGambitDeclined,
                    spasskyBronstein1960: spasskyBronstein1960,
                  }[opening];
                  console.log(opening);
                  return <ChessSlideshow {...openingData} />;
                },
              }}
            >
              {processedContent}
            </ReactMarkdown>

            {/* Subscribe form at bottom of post (only for blog posts, not notes) */}
            {!isNote && (
              <div className="mt-4">
                <SubscribeForm />
              </div>
            )}
          </article>
        </div>

        {/* Notes container - completely independent, allows overlaps */}
        <div className="hidden lg:block lg:w-[45%] pl-8 pr-4" ref={notesContainerRef}>
          <div className="relative flex justify-center">
            {notes.map((note) => (
              <div
                key={note.id}
                className="note-card text-xs p-4 absolute w-3/4 transition-all duration-300"
                style={{
                  top: notePositions[note.id]
                    ? `${notePositions[note.id]}px`
                    : "auto",
                  position: "absolute",
                  zIndex: 10,
                }}
              >
                <div
                  className="text-neutral-600 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: `${note.id}. ${note.processedText || note.text}`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
