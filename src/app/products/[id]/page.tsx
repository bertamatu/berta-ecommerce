'use client';

import { products } from '@/app/Constants';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import Image from 'next/image';

const ProductDetailPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (params.id) {
      const productId = parseInt(params.id as string);
      // Using find with destructuring assignment
      const foundProduct = products.find(({ id }) => id === productId) ?? null;
      setProduct(foundProduct);
    }
  }, [params.id]);

  // Early return pattern with guard clause
  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-center text-xl">Product not found</p>
      </div>
    );
  }

  // Destructuring properties from product
  const { name, image, discount, price, stock, category, description, rating } =
    product;

  // Calculate discounted price if applicable using nullish coalescing
  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Using template literals
    alert(`Added ${quantity} ${name}${quantity > 1 ? 's' : ''} to cart`);
  };

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="relative h-[400px] w-full md:h-[500px]">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
            {discount > 0 && (
              <div className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                {discount}% OFF
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">{name}</h1>
          <p className="mb-4 text-gray-500">{category}</p>

          {/* Pricing */}
          <div className="mb-6">
            {discountedPrice ? (
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="ml-2 text-lg text-gray-500 line-through">
                  ${price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-gray-900">
                ${price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="mb-6 flex items-center">
            <div className="flex items-center">
              {/* Using Array.from with map instead of [...Array(5)] */}
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`size-5 ${
                    i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">{rating} stars</span>
            </div>
            <span className="mx-2 text-gray-300">|</span>
            <span
              className={`${stock > 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {stock > 0 ? `${stock} in stock` : 'Out of stock'}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">Description</h2>
            <p className="text-gray-600">{description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">Quantity</h2>
            <div className="flex items-center">
              <button
                onClick={decrementQuantity}
                className="rounded-l-md border border-gray-300 p-2"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-16 border-y border-gray-300 p-2 text-center"
              />
              <button
                onClick={incrementQuantity}
                className="rounded-r-md border border-gray-300 p-2"
                disabled={quantity >= stock}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full rounded-full bg-black px-6 py-3 text-white transition-colors duration-200 hover:bg-gray-800"
            disabled={stock === 0}
          >
            {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
