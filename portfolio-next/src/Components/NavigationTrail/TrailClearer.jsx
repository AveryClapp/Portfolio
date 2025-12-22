"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Tracks directory visits to help build proper navigation trails
export default function DirectoryTracker({ directoryTitle, directorySlug }) {
  const pathname = usePathname();

  useEffect(() => {
    // Clear stale trail data
    sessionStorage.removeItem("navigationTrail");
    sessionStorage.removeItem("lastBlogInfo");

    // Save directory context for trail building
    if (directoryTitle && directorySlug) {
      sessionStorage.setItem("lastDirectory", JSON.stringify({
        title: directoryTitle,
        slug: directorySlug
      }));
    } else {
      // On main knowledge page, clear directory context
      sessionStorage.removeItem("lastDirectory");
    }

    sessionStorage.setItem("lastPath", pathname);
  }, [pathname, directoryTitle, directorySlug]);

  return null; // This component doesn't render anything
}
