"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const SemanticSearch = ({ directory = null }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  async function performSearch(searchQuery) {
    setIsSearching(true);
    try {
      const body = { query: searchQuery };
      if (directory) {
        body.directory = directory;
      }

      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className="mb-8">
      {/* Search input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="w-1/2 px-3 py-2 text-sm border border-neutral-300 focus:outline-none focus:border-neutral-900"
      />

      {/* Results */}
      {query.trim() && results.length > 0 && (
        <div className="mt-4 space-y-4 max-h-64 overflow-y-auto">
          {results.map((result) => (
            <article key={result.slug} className="pb-2 border-b border-neutral-200 last:border-b-0">
              <h3 className="text-sm font-display font-semibold">
                <Link
                  href={`/wiki/${result.slug}`}
                  className="hover:text-neutral-600 transition-colors"
                >
                  {result.title}
                </Link>
              </h3>
            </article>
          ))}
        </div>
      )}

      {/* No results */}
      {query.trim() && !isSearching && results.length === 0 && (
        <p className="text-xs text-neutral-500 mt-4">
          No relevant notes found.
        </p>
      )}

      {/* Searching indicator */}
      {isSearching && (
        <p className="text-xs text-neutral-500 mt-4">
          Searching...
        </p>
      )}
    </div>
  );
};

export default SemanticSearch;
