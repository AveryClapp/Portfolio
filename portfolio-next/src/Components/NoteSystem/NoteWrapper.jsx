// src/Components/NoteSystem/NoteWrapper.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

const NoteWrapper = ({
  children,
  content,
  processMainContentAsMarkdown = false,
}) => {
  const [processedContent, setProcessedContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [notePositions, setNotePositions] = useState({});
  const contentRef = useRef(null);
  const notesContainerRef = useRef(null);

  const renderMarkdownInText = (text) => {
    let processedText = text;

    processedText = processedText.replace(
      /\$\$([^$]+)\$\$/g,
      (match, mathContent) => {
        try {
          return katex.renderToString(mathContent, {
            throwOnError: false,
            displayMode: true,
          });
        } catch (e) {
          return match;
        }
      },
    );

    processedText = processedText.replace(
      /\$([^$]+)\$/g,
      (match, mathContent) => {
        try {
          return katex.renderToString(mathContent, {
            throwOnError: false,
            displayMode: false,
          });
        } catch (e) {
          return match;
        }
      },
    );

    const codeBlockMarkers = [];
    let markerIndex = 0;

    processedText = processedText.replace(
      /```(\w+)?\s*\n?([\s\S]*?)\n?\s*```/g,
      (match, language, code) => {
        const lang = language || "text";
        const cleanCode = code.trim();
        const marker = `__CODE_BLOCK_${markerIndex}__`;
        codeBlockMarkers[markerIndex] = `<div class="code-block-wrapper mb-4">
          <div class="code-header bg-neutral-800 text-white px-3 py-2 rounded-t-lg text-xs flex items-center">
            <span class="font-mono text-neutral-300">${lang}</span>
          </div>
          <pre class="code-content bg-neutral-900 text-neutral-100 px-3 py-2 rounded-b-lg overflow-x-auto text-xs font-mono leading-relaxed"><code class="language-${lang}">${cleanCode.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
        </div>`;
        markerIndex++;
        return marker;
      },
    );

    processedText = processedText.replace(/```([^`\n]+)```/g, (match, code) => {
      const marker = `__CODE_BLOCK_${markerIndex}__`;
      codeBlockMarkers[markerIndex] =
        `<code class="bg-neutral-800 text-neutral-100 px-2 py-1 rounded text-xs font-mono border">${code.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>`;
      markerIndex++;
      return marker;
    });

    // Now handle inline code: `code` (single backticks only)
    processedText = processedText.replace(/`([^`\n]+)`/g, (match, code) => {
      return `<code class="bg-neutral-200 text-neutral-800 px-1 py-0.5 rounded text-xs font-mono">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>`;
    });

    // Restore code block markers
    codeBlockMarkers.forEach((replacement, index) => {
      processedText = processedText.replace(
        `__CODE_BLOCK_${index}__`,
        replacement,
      );
    });

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

  useEffect(() => {
    if (content) {
      const foundNotes = [];
      let modifiedContent = content;

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

      const sidenotes = findSidenotes(content);

      // Replace sidenotes in content
      sidenotes.forEach((note) => {
        modifiedContent = modifiedContent.replace(
          note.fullMatch,
          `<sup class="hidden lg:inline text-neutral-800 font-semibold note-marker text-xs cursor-pointer hover:text-neutral-900 hover:bg-neutral-100 px-0.5 rounded-sm transition-colors duration-150" data-note-id="${note.id}">${note.id}</sup>`,
        );
        foundNotes.push({
          id: note.id,
          text: note.text,
          processedText: note.processedText,
        });
      });

      // Process main content as markdown if requested
      if (processMainContentAsMarkdown) {
        modifiedContent = renderMarkdownInText(modifiedContent);
      }

      setNotes(foundNotes);
      setProcessedContent(modifiedContent);
    }
  }, [content, processMainContentAsMarkdown]);

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

  // If there are no notes, render content constrained to 55% width
  if (notes.length === 0) {
    return (
      <div className="w-full lg:w-[55%]" ref={contentRef}>
        {content ? (
          <div dangerouslySetInnerHTML={{ __html: processedContent }} />
        ) : (
          children
        )}
      </div>
    );
  }

  // Otherwise, render the two-column layout with notes
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Main content - flows naturally */}
      <div className="w-full lg:w-[55%]" ref={contentRef}>
        {content ? (
          <div dangerouslySetInnerHTML={{ __html: processedContent }} />
        ) : (
          children
        )}
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
                  __html: `${note.id}. ${note.processedText}`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteWrapper;
