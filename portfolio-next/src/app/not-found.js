// src/app/not-found.js
"use client";
import Link from "next/link";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import { Home, ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-stone-100 text-neutral-900 font-sans">
      <Header className="mb-6" />

      <main className="relative z-20 flex-1 mb-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <div className="text-center max-w-md">
            {/* 404 Icon */}
            <div className="mb-8">
              <FileQuestion className="h-24 w-24 text-neutral-400 mx-auto" />
            </div>

            {/* Error Message */}
            <h1 className="text-6xl font-bold text-neutral-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
              Page Not Found
            </h2>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              The page you're looking for doesn't exist. It might have been
              moved, deleted, or you entered the wrong URL.
            </p>

            {/* Additional Help */}
            <div className="mt-8 text-sm text-neutral-500">
              <p>
                Looking for something interesting? Check out my{" "}
                <a href="/blog" className="underline">
                  {" "}
                  blog{" "}
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
