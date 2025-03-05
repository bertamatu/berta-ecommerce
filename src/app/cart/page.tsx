'use client';

import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// Reusable components
const EmptyCartMessage = () => (
  <div className="py-12 text-center" data-testid="empty-cart-message">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto mb-4 size-24 text-gray-300"
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
    <h2 className="mb-4 text-2xl font-semibold">Your cart is empty</h2>
    <p className="mb-8 text-gray-500">
      Looks like you haven&apos;t added any products to your cart yet.
    </p>
    <Link
      href="/products"
      className="rounded-full bg-black px-6 py-3 text-white transition-colors duration-200 hover:bg-gray-800"
      data-testid="continue-shopping"
    >
      Continue Shopping
    </Link>
  </div>
);

// Quantity control component
const QuantityControl = ({
  quantity,
  onDecrease,
  onIncrease,
}: {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) => (
  <div className="flex items-center rounded-md border">
    <button
      onClick={onDecrease}
      disabled={quantity <= 1}
      className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
    >
      -
    </button>
    <span className="border-x px-2 py-1">{quantity}</span>
    <button
      onClick={onIncrease}
      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
    >
      +
    </button>
  </div>
);

// Cart item component
const CartItem = ({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: ReturnType<typeof useCart>['items'][0];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}) => {
  const { product, quantity } = item;

  // Early return if product is undefined
  if (!product) return null;

  // Using destructuring for product properties
  const { id, name, image, category, discount, price } = product;

  // Using template literals and ternary operator
  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;
  const totalItemPrice = (discountedPrice * quantity).toFixed(2);

  return (
    <div
      className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow transition-shadow duration-200 hover:shadow-md sm:flex-row"
      data-testid={`cart-item-${id}`}
    >
      <div className="group relative h-24 w-full overflow-hidden rounded-md bg-gray-100 sm:w-24">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, 96px"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
          priority
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium text-gray-900">{name}</h3>
          <button
            onClick={() => onRemove(id)}
            className="text-gray-400 transition-colors duration-200 hover:text-red-500"
            aria-label="Remove item"
            data-testid={`remove-item-${id}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <p className="mt-1 text-sm text-gray-500">{category}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <QuantityControl
            quantity={quantity}
            onDecrease={() => onUpdateQuantity(id, quantity - 1)}
            onIncrease={() => onUpdateQuantity(id, quantity + 1)}
          />
          <div className="text-right">
            <p className="text-lg font-medium text-gray-900">
              ${totalItemPrice}
            </p>
            {discount > 0 && (
              <p className="text-sm text-red-500">{`${discount}% OFF`}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Order summary component
const OrderSummary = ({
  total,
  isCheckingOut,
  onCheckout,
}: {
  total: number;
  isCheckingOut: boolean;
  onCheckout: () => void;
}) => {
  // Calculate values using derived state
  const tax = (total * 0.1).toFixed(2);
  const grandTotal = (total * 1.1).toFixed(2);

  // Using template literals for dynamic class names
  const checkoutButtonClass = `w-full rounded-full py-3 text-white ${
    isCheckingOut ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'
  } flex items-center justify-center transition-colors duration-200`;

  return (
    <div
      className="sticky top-4 rounded-lg bg-white p-6 shadow"
      data-testid="order-summary"
    >
      <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
      <div className="mb-4 space-y-2">
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
          <span>${tax}</span>
        </div>
        <div className="mt-2 flex justify-between border-t pt-2 font-semibold">
          <span>Total</span>
          <span>${grandTotal}</span>
        </div>
      </div>
      <button
        onClick={onCheckout}
        disabled={isCheckingOut}
        className={checkoutButtonClass}
        data-testid="checkout-button"
      >
        {isCheckingOut ? (
          <>
            <svg
              className="-ml-1 mr-2 size-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          'Checkout'
        )}
      </button>
    </div>
  );
};

const CartPage = () => {
  // Using destructuring for cart context
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Using arrow function with early return pattern
  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Checkout completed successfully!');
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  // Early return pattern for empty cart
  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
        <EmptyCartMessage />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Cart items */}
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <Link
              href="/products"
              className="flex items-center text-black hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-800"
              data-testid="clear-cart"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div>
          {/* Order summary */}
          <OrderSummary
            total={total}
            isCheckingOut={isCheckingOut}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </main>
  );
};

export default CartPage;
