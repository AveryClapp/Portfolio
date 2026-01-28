"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LinkInterceptor() {
  const router = useRouter();

  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest("a");

      if (!target) return;

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

      // Check if browser supports view transitions
      if (document.startViewTransition) {
        e.preventDefault();

        document.startViewTransition(() => {
          router.push(href);
        });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [router]);

  return null;
}
