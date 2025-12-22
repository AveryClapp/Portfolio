"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const MAX_TRAIL_LENGTH = 8;

export default function NavigationTrail({ currentTitle, currentSlug, directoryInfo }) {
  const pathname = usePathname();
  const [trail, setTrail] = useState([]);
  const [mounted, setMounted] = useState(false);

  // Only run on client after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);

    // Check where we came from
    const lastPath = sessionStorage.getItem("lastPath");
    const storedTrail = sessionStorage.getItem("navigationTrail");
    let existingTrail = storedTrail ? JSON.parse(storedTrail) : [];

    // Determine if we need to reset the trail
    const isFromKnowledge = lastPath?.startsWith("/wiki");
    const isFromBlog = lastPath?.startsWith("/blog");

    // If coming from blog, start fresh trail with blog title
    if (isFromBlog) {
      const blogInfoStr = sessionStorage.getItem("lastBlogInfo");
      if (blogInfoStr) {
        const blogInfo = JSON.parse(blogInfoStr);
        existingTrail = [{
          title: blogInfo.title,
          slug: `blog/${blogInfo.slug}`,
          isBlog: true
        }];
      } else {
        existingTrail = [];
      }
    }

    // If coming from a directory page, start fresh trail with directory context
    if (isFromKnowledge && existingTrail.length === 0) {
      const lastDirStr = sessionStorage.getItem("lastDirectory");
      if (lastDirStr) {
        const dirInfo = JSON.parse(lastDirStr);
        existingTrail = [
          { title: "Wiki", slug: "knowledge" },
          { title: dirInfo.title, slug: dirInfo.slug }
        ];
      }
    }

    // If this is a new session or coming from external source, reset trail
    if (!lastPath || (!isFromKnowledge && !isFromBlog)) {
      existingTrail = [];
      sessionStorage.removeItem("lastBlogInfo");
    }

    // If trail is still empty (direct URL, semantic search, etc.), build from directoryInfo
    if (existingTrail.length === 0 && directoryInfo) {
      existingTrail = [
        { title: "Wiki", slug: "knowledge" },
        { title: directoryInfo.title, slug: directoryInfo.slug }
      ];
    }

    // Check if current page is already in the existing trail
    const currentIndex = existingTrail.findIndex(
      (item) => item.slug === currentSlug
    );

    let newTrail;

    if (currentIndex !== -1) {
      // User navigated back - truncate to current page
      newTrail = existingTrail.slice(0, currentIndex + 1);
    } else {
      // New page - add to trail
      newTrail = [...existingTrail, { title: currentTitle, slug: currentSlug }];

      // Limit trail length
      if (newTrail.length > MAX_TRAIL_LENGTH) {
        newTrail = newTrail.slice(-MAX_TRAIL_LENGTH);
      }
    }

    // Save updated trail and current path
    sessionStorage.setItem("navigationTrail", JSON.stringify(newTrail));
    sessionStorage.setItem("lastPath", pathname);

    // Update display
    setTrail(newTrail);
  }, [pathname, currentTitle, currentSlug]);

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted || trail.length === 0) {
    return null;
  }

  // If only one page in trail, show it
  if (trail.length === 1) {
    return (
      <div className="mb-4 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-neutral-900">{trail[0].title}</span>
        </div>
      </div>
    );
  }

  // Multiple pages - show all but last as links, last as current
  return (
    <div className="mb-4 text-xs">
      <div className="flex items-center gap-2 flex-wrap">
        {trail.slice(0, -1).map((item, index) => {
          // Determine the correct href based on the slug
          let href;
          if (!item.slug || item.slug === 'knowledge') {
            href = '/wiki';
          } else if (item.slug.startsWith('blog/')) {
            href = `/${item.slug}`;
          } else {
            href = `/wiki/${item.slug}`;
          }

          return (
            <span key={index} className="flex items-center gap-2">
              <Link
                href={href}
                className="text-neutral-600 hover:text-neutral-900 transition-colors underline-offset-2 hover:underline"
              >
                {item.title}
              </Link>
              <span className="text-neutral-300">→</span>
            </span>
          );
        })}
        <span className="font-semibold text-neutral-900">{trail[trail.length - 1].title}</span>
      </div>
    </div>
  );
}
