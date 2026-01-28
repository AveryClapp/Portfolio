"use client";
import { useEffect, useRef } from "react";
import { useTransitionRouter } from "next-view-transitions";

export default function NoteWrapperClient({ htmlContent }) {
  const containerRef = useRef(null);
  const router = useTransitionRouter();

  useEffect(() => {
    if (!containerRef.current) return;

    const handleClick = (e) => {
      const target = e.target.closest("a");

      if (!target) return;

      // Only handle links within this container
      if (!containerRef.current.contains(target)) return;

      const href = target.getAttribute("href");

      // Only intercept internal links
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.getAttribute("target") === "_blank" ||
        target.hasAttribute("download") ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      // Prevent default and use transition router (handles view transitions automatically)
      e.preventDefault();
      router.push(href);
    };

    // Add listener to container only
    const container = containerRef.current;
    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, [router, htmlContent]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
