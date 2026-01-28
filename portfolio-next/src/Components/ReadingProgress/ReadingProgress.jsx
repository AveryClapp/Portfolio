"use client";
import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const maxScroll = scrollHeight - clientHeight;
      const percentage = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

      setProgress(Math.min(Math.max(percentage, 0), 100));
    };

    // Update on scroll
    window.addEventListener("scroll", updateProgress);

    // Update on mount
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[4px] z-[9999]"
    >
      <div
        className="h-full bg-neutral-500 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
