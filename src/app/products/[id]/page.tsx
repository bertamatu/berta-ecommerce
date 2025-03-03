'use client';

import { products } from '@/app/Constants';
import { Product } from '@/types';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

// Define the params type
type ProductPageProps = {
  params: { id: string };
};

// Define the page component
export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  // Find the product in our products array
  const product = products.find(p => p.id === parseInt(id));
  
  // If product not found, return 404
  if (!product) {
    notFound();
  }

  // Calculate discounted price if applicable
  const discountedPrice = product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Show a toast or notification here
    alert(`Added ${quantity} ${product.name} to cart`);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <figure className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
          </div>
        </figure>

        <section className="space-y-6 sm:space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {product.name}
            </h1>
            <div className="mt-3">
              {discountedPrice ? (
                <div className="flex items-center gap-2">
                  <p className="text-3xl text-gray-900">
                    ${discountedPrice.toFixed(2)}
                  </p>
                  <p className="text-xl text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </p>
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {product.discount}% OFF
                  </span>
                </div>
              ) : (
                <p className="text-3xl text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
              )}
            </div>
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">{product.rating} out of 5</span>
              </div>
            </div>
          </div>

          <div className="prose prose-sm sm:prose-base text-gray-500">
            <p>{product.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900">Details</h2>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Category: {product.category}
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                In Stock: {product.stock} items
              </li>
            </ul>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
              Quantity:
            </label>
            <div className="flex items-center">
              <button
                type="button"
                className="p-2 border border-gray-300 rounded-l-md"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                className="p-2 w-16 text-center border-y border-gray-300"
              />
              <button
                type="button"
                className="p-2 border border-gray-300 rounded-r-md"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className="flex-1 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button className="flex-1 bg-white text-black px-6 py-3 rounded-full border border-gray-200 hover:border-gray-300 transition-colors duration-200">
              Add to Wishlist
            </button>
          </div>
        </section>
      </article>
    </main>
  );
}
