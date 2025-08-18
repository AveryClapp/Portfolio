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
  const [minHeight, setMinHeight] = useState(0);
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

    // Handle basic markdown formatting
    // Bold: **text** or __text__ (more explicit patterns)
    processedText = processedText.replace(
      /\*\*([^*]+?)\*\*/g,
      "<strong>$1</strong>",
    );

    processedText = processedText.replace(
      /__([^_]+?)__/g,
      "<strong>$1</strong>",
    );

    // Italic: *text* or _text_ (simpler patterns)
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
      const noteRegex = /\^(\d+)\[([^\]]+)\]/g;
      const foundNotes = [];
      let modifiedContent = content;

      let match;
      while ((match = noteRegex.exec(content)) !== null) {
        foundNotes.push({
          id: match[1],
          text: match[2], // Keep original text
          processedText: renderMarkdownInText(match[2]), // Add processed version
        });
      }

      // Only show note markers on desktop
      modifiedContent = modifiedContent.replace(noteRegex, (match, id) => {
        return `<sup class="hidden lg:inline text-neutral-800 font-semibold note-marker text-xs cursor-pointer hover:text-neutral-900 hover:bg-neutral-100 px-0.5 rounded-sm transition-colors duration-150" data-note-id="${id}">${id}</sup>`;
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
    const containerTop = notesContainerRef.current.getBoundingClientRect().top;
    const noteElements =
      notesContainerRef.current.querySelectorAll(".note-card");

    const noteGap = 4;
    let lastBottom = 0;

    markers.forEach((marker, index) => {
      const id = marker.getAttribute("data-note-id");
      const markerRect = marker.getBoundingClientRect();
      const noteElement = noteElements[index];
      const noteHeight = noteElement ? noteElement.offsetHeight : 100;

      const markerTop = markerRect.top - containerTop;
      const idealTop = markerTop - noteHeight / 2;

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
    window.addEventListener("scroll", updateNotePositions);
    window.addEventListener("resize", updateNotePositions);

    return () => {
      window.removeEventListener("scroll", updateNotePositions);
      window.removeEventListener("resize", updateNotePositions);
    };
  }, [notes]);

  return (
    <div
      className="flex flex-col lg:flex-row"
      style={{ minHeight: minHeight ? `${minHeight}px` : "auto" }}
    >
      <div className="w-full lg:w-3/5" ref={contentRef}>
        {content ? (
          <div dangerouslySetInnerHTML={{ __html: processedContent }} />
        ) : (
          children
        )}
      </div>
      {/* Hide notes container on mobile, show on desktop */}
      <div
        className="hidden lg:block lg:w-2/5 px-4 relative"
        ref={notesContainerRef}
      >
        {notes.map((note) => (
          <div
            key={note.id}
            className="note-card text-xs p-4 absolute w-3/4 transition-all duration-300"
            style={{
              top: notePositions[note.id]
                ? `${notePositions[note.id]}px`
                : "auto",
              position: notePositions[note.id] ? "absolute" : "static",
            }}
          >
            <div
              className="text-neutral-600 text-xs"
              dangerouslySetInnerHTML={{
                __html: `${note.id}. ${note.processedText}`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteWrapper;
