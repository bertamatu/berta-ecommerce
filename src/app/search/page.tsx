'use client';

import { useState } from 'react';

// Type definitions
type SearchInputProps = {
  onSearch: (query: string) => void;
};

// Reusable search input component
const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="w-full rounded-full border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <svg
          className="size-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
};

// Main search page component
const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle search submission
  const handleSearch = (query: string) => {
    // This would typically call an API to get search results
    console.log(`Searching for: ${query}`);
    setHasSearched(true);

    // Simulate search results
    const mockResults = query.trim()
      ? [
          `Result 1 for "${query}"`,
          `Result 2 for "${query}"`,
          `Result 3 for "${query}"`,
        ]
      : [];

    setSearchResults(mockResults);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Search Products</h1>

        <SearchInput onSearch={handleSearch} />

        {/* Search results section */}
        {hasSearched && (
          <div className="mt-8">
            {searchResults.length > 0 ? (
              <>
                <h2 className="mb-4 text-xl font-semibold">Search Results</h2>
                <ul className="space-y-2">
                  {searchResults.map((result, index) => (
                    <li
                      key={index}
                      className="rounded-lg border border-gray-200 p-4 shadow-sm"
                    >
                      {result}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-center text-gray-500">
                No results found. Try a different search term.
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchPage;
