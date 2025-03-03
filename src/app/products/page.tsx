'use client';

import { products } from '../Constants';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';

const ProductsPage = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    // Show a toast or notification here
    alert(`Added ${product.name} to cart`);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          All Products
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-base text-gray-500">
          Browse our collection of high-quality products for your home
        </p>
      </div>

      <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product: Product) => (
          <div key={product.id} className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden">
            <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-center object-cover sm:w-full sm:h-full"
              />
            </div>
            <div className="flex-1 p-4 space-y-2 flex flex-col">
              <h3 className="text-sm font-medium text-gray-900">
                <a href={`/products/${product.id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </a>
              </h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <div className="flex-1 flex flex-col justify-end">
                <div className="flex justify-between items-center">
                  {product.discount > 0 ? (
                    <div>
                      <p className="text-base font-medium text-gray-900">
                        ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 line-through">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-base font-medium text-gray-900">
                      ${product.price.toFixed(2)}
                    </p>
                  )}
                  
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="z-10 relative bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
                {product.discount > 0 && (
                  <p className="text-sm text-red-500">
                    {product.discount}% off
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProductsPage;
