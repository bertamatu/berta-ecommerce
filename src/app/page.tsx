'use client';

import Link from 'next/link';
import { products } from './Constants';
import { useCart } from '@/contexts/CartContext';

const HomePage = () => {
  const { addToCart } = useCart();
  
  // Select a few products to feature (e.g., products with IDs 1, 3, and 5)
  const featuredProducts = products.filter(product => [1, 3, 5].includes(product.id));
  
  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
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
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1
              id="hero-heading"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight"
            >
              The Future of{' '}
              <span className="bg-gradient-to-r from-yellow-500 to-blue-600 bg-clip-text text-transparent">
                Shopping
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 px-4">
              Discover our curated collection of premium products designed for
              the modern lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link
                href="/products"
                className="w-full sm:w-auto bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
              >
                Shop Now
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full border border-gray-200 hover:border-gray-300 transition-all duration-200 transform hover:scale-105"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white" aria-labelledby="featured-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2
              id="featured-heading"
              className="text-3xl font-bold text-gray-900"
            >
              Featured Products
            </h2>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => {
              const discountedPrice = product.discount > 0 
                ? product.price * (1 - product.discount / 100) 
                : null;
                
              return (
                <div key={product.id} className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-80">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center sm:w-full sm:h-full"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {product.discount}% OFF
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-4 flex flex-col">
                    <h3 className="text-lg font-medium text-gray-900">
                      <Link href={`/products/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                    <div className="mt-auto pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          {discountedPrice ? (
                            <div className="flex items-center">
                              <p className="text-lg font-medium text-gray-900">${discountedPrice.toFixed(2)}</p>
                              <p className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</p>
                            </div>
                          ) : (
                            <p className="text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
                          )}
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => handleAddToCart(product.id)}
                            className="ml-4 p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
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

      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-blue-600"
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
              <h3 className="text-xl font-semibold mb-4">Premium Quality</h3>
              <p className="text-gray-600">
                Carefully selected products that meet our high standards.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
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
              <h3 className="text-xl font-semibold mb-4">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your products delivered quickly and reliably to your doorstep.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-purple-600"
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
              <h3 className="text-xl font-semibold mb-4">Secure Payment</h3>
              <p className="text-gray-600">
                Shop with confidence with our secure and encrypted payment system.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
