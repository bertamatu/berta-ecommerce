'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';

const WishlistPage = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [componentId] = useState(() => Math.random().toString(36).substring(7));

  const handleAddToCart = (productId: number) => {
    const product = items.find(({ id }) => id === productId);
    if (!product) return;

    addToCart(product, 1);
    showToast(`${product.name} added to cart`, 'success');
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        {items.length > 0 && (
          <button
            onClick={clearWishlist}
            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg bg-white px-4 py-16 text-center shadow-sm">
          <div className="mb-6 rounded-full bg-gray-100 p-6">
            <svg
              className="size-24 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Your wishlist is empty
          </h2>
          <p className="mb-8 max-w-md text-gray-600">
            Save items you love to your wishlist. Review them anytime and easily
            move them to your cart.
          </p>
          <Link
            href="/products"
            className="rounded-full bg-black px-8 py-3 font-medium text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-md"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((product) => (
            <div
              key={`${componentId}-wishlist-${product.id}`}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <div className="relative h-[220px] w-full">
                <Link
                  href={`/products/${product.id}`}
                  className="block size-full"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center"
                  />
                  {product.discount > 0 && (
                    <div className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                      {`${product.discount}% OFF`}
                    </div>
                  )}
                </Link>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute right-2 top-2 z-10 rounded-full bg-white p-1.5 shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md"
                  aria-label="Remove from wishlist"
                >
                  <svg
                    className="size-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-lg font-medium text-gray-900">
                  <Link href={`/products/${product.id}`} className="relative">
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                <div className="mt-auto pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      {product.discount > 0 ? (
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-gray-900">
                            $
                            {(
                              product.price *
                              (1 - product.discount / 100)
                            ).toFixed(2)}
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
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleAddToCart(product.id)}
                className="mt-2 flex w-full items-center justify-center bg-black py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-800"
              >
                <svg
                  className="mr-2 size-5"
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
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default WishlistPage;
