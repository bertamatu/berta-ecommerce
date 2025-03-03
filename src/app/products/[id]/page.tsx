'use client';

import { products } from '@/app/Constants';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import Image from 'next/image';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (params.id) {
      const productId = parseInt(params.id as string);
      const foundProduct = products.find((p) => p.id === productId);
      setProduct(foundProduct || null);
    }
  }, [params.id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-center text-xl">Product not found</p>
      </div>
    );
  }

  // Calculate discounted price if applicable
  const discountedPrice =
    product.discount > 0 ? product.price * (1 - product.discount / 100) : null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(
      `Added ${quantity} ${product.name}${quantity > 1 ? 's' : ''} to cart`
    );
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="relative w-full h-[400px] md:h-[500px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
            {product.discount > 0 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                {product.discount}% OFF
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-gray-500 mb-4">{product.category}</p>

          {/* Pricing */}
          <div className="mb-6">
            {discountedPrice ? (
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="ml-2 text-lg text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">{product.rating} stars</span>
            </div>
            <span className="mx-2 text-gray-300">|</span>
            <span
              className={`${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Quantity</h2>
            <div className="flex items-center">
              <button
                onClick={decrementQuantity}
                className="p-2 border border-gray-300 rounded-l-md"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="p-2 w-16 text-center border-y border-gray-300"
              />
              <button
                onClick={incrementQuantity}
                className="p-2 border border-gray-300 rounded-r-md"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors duration-200"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </main>
  );
}
