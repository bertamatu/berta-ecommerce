'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/app/Constants';
import { Product } from '@/types/index';
import { useCart } from '@/contexts/CartContext';

// Type definitions for component props
type CategoryFilterProps = {
  categories: string[];
  activeCategory: string | null;
  onCategoryClick: (category: string | null) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
};

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
  priority?: boolean;
};

// Reusable category filter component
const CategoryFilter = ({
  categories,
  activeCategory,
  onCategoryClick,
  onClearFilters,
  hasActiveFilters,
}: CategoryFilterProps) => (
  <div className="mt-8 flex flex-wrap justify-center gap-2">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onCategoryClick(category)}
        className={`rounded-full px-4 py-2 text-sm font-medium ${
          activeCategory === category
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        } transition-colors duration-200`}
      >
        {category}
      </button>
    ))}
    {hasActiveFilters && (
      <button
        onClick={onClearFilters}
        className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-800 transition-colors duration-200 hover:bg-red-200"
      >
        Clear Filters
      </button>
    )}
  </div>
);

// Reusable product card component
const ProductCard = ({
  product,
  onAddToCart,
  priority = false,
}: ProductCardProps) => {
  // Destructuring product properties
  const { id, name, image, price, discount, description, rating } = product;

  // Calculate discounted price using ternary operator
  const discountedPrice =
    discount > 0 ? (price * (1 - discount / 100)).toFixed(2) : null;

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
      <div className="relative h-[250px] w-full">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />
        {discount > 0 && (
          <div className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
            {`${discount}% OFF`}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-medium text-gray-900">
          <Link href={`/products/${id}`} className="hover:text-blue-600">
            {name}
          </Link>
        </h3>
        <p className="mb-2 line-clamp-2 text-sm text-gray-500">{description}</p>
        <div className="flex items-center justify-between">
          <div>
            {discountedPrice ? (
              <div className="flex items-center">
                <span className="text-lg font-bold text-gray-900">
                  ${discountedPrice}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ${price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <span className="mr-1 text-yellow-400">★</span>
            <span className="text-sm text-gray-600">{rating}</span>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <button
            onClick={() => onAddToCart(product)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// No products found component
const NoProductsFound = () => (
  <div className="col-span-full py-12 text-center">
    <h3 className="text-xl font-medium text-gray-900">No products found</h3>
    <p className="mt-2 text-gray-500">
      Try selecting a different category or clearing your filters.
    </p>
  </div>
);

// Component to handle search params
const ProductsContent = () => {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();

  // Using nullish coalescing operator for default values
  const categoryParam = searchParams.get('category') ?? null;
  const mainCategoryParam = searchParams.get('mainCategory') ?? null;

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    categoryParam
  );
  const [activeMainCategory, setActiveMainCategory] = useState<string | null>(
    mainCategoryParam
  );

  // Get all unique categories using Set and Array.from
  const allCategories = Array.from(
    new Set(products.map(({ category }) => category))
  );

  // Get categories for the current view (filtered by mainCategory if present)
  const visibleCategories = mainCategoryParam
    ? Array.from(
        new Set(
          products
            .filter(({ mainCategory }) => mainCategory === mainCategoryParam)
            .map(({ category }) => category)
        )
      )
    : allCategories;

  // Filter products when parameters change
  useEffect(() => {
    // Using array methods chaining
    const filtered = products
      .filter(
        ({ mainCategory }) =>
          !mainCategoryParam || mainCategory === mainCategoryParam
      )
      .filter(({ category }) => !categoryParam || category === categoryParam);

    setFilteredProducts(filtered);
    setActiveMainCategory(mainCategoryParam);
    setActiveCategory(categoryParam);
  }, [categoryParam, mainCategoryParam]);

  // Handle category filter click
  const handleCategoryFilter = (category: string | null) => {
    // Early return pattern
    if (category === activeCategory) {
      // If clicking the active category, clear the filter
      setActiveCategory(null);

      // Update URL without the category parameter but keep mainCategory if present
      const url = mainCategoryParam
        ? `/products?mainCategory=${mainCategoryParam}`
        : '/products';
      window.history.pushState({}, '', url);

      // Filter products only by mainCategory if present
      setFilteredProducts(
        products.filter(
          ({ mainCategory }) =>
            !mainCategoryParam || mainCategory === mainCategoryParam
        )
      );
      return;
    }

    // Otherwise, apply the new filter
    setActiveCategory(category);

    // Update URL with the new category parameter and keep mainCategory if present
    const url = mainCategoryParam
      ? `/products?mainCategory=${mainCategoryParam}&category=${category}`
      : `/products?category=${category}`;
    window.history.pushState({}, '', url);

    // Filter products by both category and mainCategory if present
    setFilteredProducts(
      products
        .filter(
          ({ mainCategory }) =>
            !mainCategoryParam || mainCategory === mainCategoryParam
        )
        .filter(
          ({ category: productCategory }) =>
            !category || productCategory === category
        )
    );
  };

  // Handle adding product to cart
  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    // Show a toast or notification here
    alert(`Added ${product.name} to cart`);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveCategory(null);
    setActiveMainCategory(null);
    setFilteredProducts(products);
    window.history.pushState({}, '', '/products');
  };

  // Using ternary operators for conditional rendering
  const pageTitle = activeCategory
    ? `${activeCategory} Products`
    : activeMainCategory
      ? `${activeMainCategory} Products`
      : 'All Products';

  // Check if any filters are active
  const hasActiveFilters = Boolean(activeCategory || activeMainCategory);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          {pageTitle}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
          Browse our collection of high-quality products
        </p>
      </div>

      {/* Category filters */}
      <CategoryFilter
        categories={visibleCategories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryFilter}
        onClearFilters={clearAllFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Products grid */}
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              priority={index < 4} // Prioritize loading the first 4 images
            />
          ))
        ) : (
          <NoProductsFound />
        )}
      </div>
    </main>
  );
};

// Main component with Suspense boundary
const ProductsPage = () => (
  <Suspense
    fallback={<div className="p-8 text-center">Loading products...</div>}
  >
    <ProductsContent />
  </Suspense>
);

export default ProductsPage;
