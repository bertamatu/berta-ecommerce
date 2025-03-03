'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/app/Constants';
import { Product } from '@/types/index';
import { useCart } from '@/contexts/CartContext';

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const mainCategoryParam = searchParams.get('mainCategory');
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);
  const [activeMainCategory, setActiveMainCategory] = useState<string | null>(mainCategoryParam);
  
  // Get all unique categories from products
  const allCategories = Array.from(new Set(products.map(product => product.category)));
  
  // Filter products when parameters change
  useEffect(() => {
    let filtered = products;
    
    // Filter by mainCategory if provided
    if (mainCategoryParam) {
      filtered = filtered.filter(product => product.mainCategory === mainCategoryParam);
      setActiveMainCategory(mainCategoryParam);
    } else {
      setActiveMainCategory(null);
    }
    
    // Further filter by category if provided
    if (categoryParam) {
      filtered = filtered.filter(product => product.category === categoryParam);
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory(null);
    }
    
    setFilteredProducts(filtered);
  }, [categoryParam, mainCategoryParam]);
  
  // Handle category filter click
  const handleCategoryFilter = (category: string | null) => {
    if (category === activeCategory) {
      // If clicking the active category, clear the filter
      setActiveCategory(null);
      
      // Update URL without the category parameter but keep mainCategory if present
      const url = mainCategoryParam 
        ? `/products?mainCategory=${mainCategoryParam}` 
        : '/products';
      window.history.pushState({}, '', url);
      
      // Filter products only by mainCategory if present
      if (mainCategoryParam) {
        setFilteredProducts(products.filter(product => product.mainCategory === mainCategoryParam));
      } else {
        setFilteredProducts(products);
      }
    } else {
      // Otherwise, apply the new filter
      setActiveCategory(category);
      
      // Update URL with the new category parameter and keep mainCategory if present
      const url = mainCategoryParam 
        ? `/products?mainCategory=${mainCategoryParam}&category=${category}` 
        : `/products?category=${category}`;
      window.history.pushState({}, '', url);
      
      // Filter products by both category and mainCategory if present
      let filtered = products;
      if (mainCategoryParam) {
        filtered = filtered.filter(product => product.mainCategory === mainCategoryParam);
      }
      if (category) {
        filtered = filtered.filter(product => product.category === category);
      }
      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    // Show a toast or notification here
    alert(`Added ${product.name} to cart`);
  };

  // Get categories for the current view (filtered by mainCategory if present)
  const visibleCategories = mainCategoryParam
    ? Array.from(new Set(products
        .filter(product => product.mainCategory === mainCategoryParam)
        .map(product => product.category)))
    : allCategories;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          {activeCategory 
            ? `${activeCategory} Products` 
            : activeMainCategory 
              ? `${activeMainCategory} Products` 
              : 'All Products'}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Browse our collection of high-quality products
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 mt-8">
        {visibleCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            } transition-colors duration-200`}
          >
            {category}
          </button>
        ))}
        {(activeCategory || activeMainCategory) && (
          <button
            onClick={() => {
              setActiveCategory(null);
              setActiveMainCategory(null);
              setFilteredProducts(products);
              window.history.pushState({}, '', '/products');
            }}
            className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 transition-colors duration-200"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Products grid */}
      <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-4 aspect-h-3 bg-gray-200 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  <Link href={`/products/${product.id}`} className="hover:text-blue-600">
                    {product.name}
                  </Link>
                </h3>
                <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    {product.discount > 0 ? (
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-900">
                          ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                        </span>
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="h-6 w-6"
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
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium text-gray-900">No products found</h3>
            <p className="mt-2 text-gray-500">
              Try selecting a different category or clearing your filters.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
