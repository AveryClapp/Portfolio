"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  return (
    <nav className="top-0 w-full mb-8 bg-stone-100 z-50">
      <div className="h-16 flex items-center px-8">
        <div className="flex space-x-6">
          <Link
            href="/"
            className={`py-2 font-display text-base transition-colors ${
              pathname === "/"
                ? "text-neutral-900 border-b-2 border-neutral-900"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            About
          </Link>
          <Link
            href="/blog"
            className={`py-2 font-display text-base transition-colors ${
              pathname === "/blog"
                ? "text-neutral-900 border-b-2 border-neutral-900"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Blog
          </Link>
          {/*
          <Link
            href="/knowledge"
            className={`py-2 font-display text-base transition-colors ${
              pathname?.startsWith("/knowledge")
                ? "text-neutral-900 border-b-2 border-neutral-900"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Knowledge
          </Link>
          */}
        </div>
      </div>
    </nav>
  );
};

export default Header;
