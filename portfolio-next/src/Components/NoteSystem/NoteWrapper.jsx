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

  // Function to render markdown in text
  const renderMarkdownInText = (text) => {
    let processedText = text;

    // Handle KaTeX math first (inline and display)
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

    // Links: [text](url)
    processedText = processedText.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>',
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
    if (!contentRef.current || !notesContainerRef.current) return;

    const newPositions = {};
    const markers = contentRef.current.querySelectorAll(".note-marker");
    const contentRect = contentRef.current.getBoundingClientRect();
    const notesRect = notesContainerRef.current.getBoundingClientRect();

    markers.forEach((marker, index) => {
      const id = marker.getAttribute("data-note-id");
      const markerRect = marker.getBoundingClientRect();

      // Calculate position relative to the notes container, not trying to avoid overlaps
      const relativeTop = markerRect.top - notesRect.top;
      newPositions[id] = Math.max(0, relativeTop - 20); // Small offset to align nicely
    });

    setNotePositions(newPositions);
  };

  useEffect(() => {
    setTimeout(updateNotePositions, 100);
    window.addEventListener("scroll", updateNotePositions);
    window.addEventListener("resize", updateNotePositions);

    return () => {
      window.removeEventListener("scroll", updateNotePositions);
      window.removeEventListener("resize", updateNotePositions);
    };
  }, [notes]);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Main content - flows naturally */}
      <div className="w-full lg:w-3/5" ref={contentRef}>
        {content ? (
          <div dangerouslySetInnerHTML={{ __html: processedContent }} />
        ) : (
          children
        )}
      </div>
      {/* Notes container - completely independent, allows overlaps */}
      <div className="hidden lg:block lg:w-2/5 px-4" ref={notesContainerRef}>
        <div className="relative">
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
