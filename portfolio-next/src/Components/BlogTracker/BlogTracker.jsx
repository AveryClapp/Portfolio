"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Simple component to track when user is on a blog page
// This allows the NavigationTrail to know if they came from a blog
export default function BlogTracker({ blogTitle, blogSlug }) {
  const pathname = usePathname();

  useEffect(() => {
    // Save current blog info for trail tracking
    sessionStorage.setItem("lastPath", pathname);

    // Clear directory context when on a blog page
    sessionStorage.removeItem("lastDirectory");

    // Store blog info so NavigationTrail can use it as a starting point
    if (blogTitle && blogSlug) {
      sessionStorage.setItem("lastBlogInfo", JSON.stringify({
        title: blogTitle,
        slug: blogSlug
      }));
    }
  }, [pathname, blogTitle, blogSlug]);

  return null; // This component doesn't render anything
}
