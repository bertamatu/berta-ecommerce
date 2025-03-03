import React from 'react';
import Link from 'next/link';

// Type definitions
type CategoryGridProps = {
  title: string;
  categories: string[];
  mainCategory: string;
};

// Reusable category card component
const CategoryCard = ({
  category,
  mainCategory,
}: {
  category: string;
  mainCategory: string;
}) => (
  <div className="group relative">
    <Link href={`/products?mainCategory=${mainCategory}&category=${category}`}>
      <div className="aspect-[3/2] overflow-hidden rounded-lg bg-gray-100">
        {/* Category image container */}
        <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-xl font-semibold text-white">{category}</h2>
        </div>
      </div>
    </Link>
  </div>
);

// Main component using arrow function with implicit return
const CategoryGrid = ({
  title,
  categories,
  mainCategory,
}: CategoryGridProps) => (
  <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <h1 className="mb-8 text-3xl font-bold">{title}</h1>

    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard
          key={category}
          category={category}
          mainCategory={mainCategory}
        />
      ))}
    </div>
  </main>
);

export default CategoryGrid;
