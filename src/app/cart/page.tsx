'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { useState } from 'react';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Checkout completed successfully!');
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="text-center py-12">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-24 w-24 mx-auto text-gray-300 mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link 
            href="/products" 
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Cart items */}
          <div className="space-y-4">
            {items.map((item) => {
              const product = item.product!;
              const discountedPrice = product.discount > 0 
                ? product.price * (1 - product.discount / 100) 
                : product.price;
              
              return (
                <div key={product.id} className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{product.name}</h3>
                      <button 
                        onClick={() => removeFromCart(product.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(product.id, item.quantity - 1)}
                          className="p-1 border border-gray-300 rounded-l-md"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          max={product.stock}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 1)}
                          className="p-1 w-12 text-center border-y border-gray-300"
                        />
                        <button
                          onClick={() => updateQuantity(product.id, item.quantity + 1)}
                          className="p-1 border border-gray-300 rounded-r-md"
                          disabled={item.quantity >= product.stock}
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(discountedPrice * item.quantity).toFixed(2)}</p>
                        {product.discount > 0 && (
                          <p className="text-sm text-gray-500 line-through">
                            ${(product.price * item.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 flex justify-between">
            <Link 
              href="/products" 
              className="text-black hover:underline flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </Link>
            <button 
              onClick={clearCart}
              className="text-red-600 hover:text-red-800"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div>
          {/* Order summary */}
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2 font-semibold flex justify-between">
                <span>Total</span>
                <span>${(total * 1.1).toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className={`w-full py-3 rounded-full text-white ${
                isCheckingOut ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'
              } transition-colors duration-200 flex justify-center items-center`}
            >
              {isCheckingOut ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Checkout'
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
