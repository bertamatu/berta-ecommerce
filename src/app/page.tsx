'use client';

import Link from 'next/link';
import Image from 'next/image';
import { products } from './Constants';
import { useCart } from '@/contexts/CartContext';

const HomePage = () => {
  const { addToCart } = useCart();

  // Select a few products to feature (e.g., products with IDs 1, 3, and 5)
  const featuredProducts = products.filter((product) =>
    [1, 3, 5].includes(product.id)
  );

  const handleAddToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product, 1);
      alert(`Added ${product.name} to cart`);
    }
  };

  return (
    <main className="flex-1">
      <section
        className="relative overflow-hidden py-16 sm:py-24 md:py-32"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gray-200 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              id="hero-heading"
              className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:mb-6 md:text-5xl"
            >
              The Future of{' '}
              <span className="bg-gradient-to-r from-yellow-500 to-blue-600 bg-clip-text text-transparent">
                Shopping
              </span>
            </h1>
            <p className="mb-8 px-4 text-lg text-gray-600 md:mb-10 md:text-xl">
              Discover our curated collection of premium products designed for
              the modern lifestyle.
            </p>
            <div className="flex flex-col justify-center gap-4 px-4 sm:flex-row">
              <Link
                href="/products"
                className="w-full rounded-full bg-black px-6 py-3 text-white transition-all duration-200 hover:scale-105 hover:bg-gray-800 sm:w-auto md:px-8 md:py-4"
              >
                Shop Now
              </Link>
              <Link
                href="/about"
                className="w-full rounded-full border border-gray-200 bg-white px-6 py-3 text-black transition-all duration-200 hover:scale-105 hover:border-gray-300 sm:w-auto md:px-8 md:py-4"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24" aria-labelledby="featured-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <h2
              id="featured-heading"
              className="text-3xl font-bold text-gray-900"
            >
              Featured Products
            </h2>
            <Link
              href="/products"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuredProducts.map((product, index) => {
              const discountedPrice =
                product.discount > 0
                  ? product.price * (1 - product.discount / 100)
                  : null;

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
                >
                  <div className="relative h-[280px] w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 640px"
                      className="object-cover object-center transition-opacity duration-300 group-hover:opacity-90"
                      priority={index < 4} // Prioritize loading the first 4 images
                    />
                    {product.discount > 0 && (
                      <div className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                        {product.discount}% OFF
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      <Link href={`/products/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.category}
                    </p>
                    <div className="mt-auto pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          {discountedPrice ? (
                            <div className="flex items-center">
                              <p className="text-lg font-medium text-gray-900">
                                ${discountedPrice.toFixed(2)}
                              </p>
                              <p className="ml-2 text-sm text-gray-500 line-through">
                                ${product.price.toFixed(2)}
                              </p>
                            </div>
                          ) : (
                            <p className="text-lg font-medium text-gray-900">
                              ${product.price.toFixed(2)}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => handleAddToCart(product.id)}
                            className="ml-4 p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            <svg
                              className="size-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="p-6 text-center">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-blue-100">
                <svg
                  className="size-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold">Premium Quality</h3>
              <p className="text-gray-600">
                Carefully selected products that meet our high standards.
              </p>
            </div>

            <div className="p-6 text-center">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-green-100">
                <svg
                  className="size-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your products delivered quickly and reliably to your
                doorstep.
              </p>
            </div>

            <div className="p-6 text-center">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-purple-100">
                <svg
                  className="size-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-xl font-semibold">Secure Payment</h3>
              <p className="text-gray-600">
                Shop with confidence with our secure and encrypted payment
                system.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
