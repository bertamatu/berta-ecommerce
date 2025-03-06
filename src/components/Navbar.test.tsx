import React from 'react';
import { render, screen } from '@/utils/test-utils';
import { checkAccessibility } from '@/utils/a11y-test-utils';
import '@testing-library/jest-dom';
import Navbar from './Navbar';

// Mock the CartContext
jest.mock('@/contexts/CartContext', () => ({
  useCart: () => ({
    itemCount: 2,
    cartItems: [],
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
    isInCart: jest.fn(),
    getCartTotal: jest.fn(() => 0),
    getCartCount: jest.fn(() => 0),
  }),
}));

// Mock the constants
jest.mock('@/app/Constants', () => ({
  WEB_APP_TITLE: 'B-EC',
  ROUTES: {
    INTERIOR: {
      path: '/interior',
      label: 'INTERIOR',
      categories: ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office'],
    },
    GARDEN: {
      path: '/garden-patio',
      label: 'GARDEN & PATIO',
      categories: ['Furniture', 'Plants', 'Decor', 'Lighting', 'Outdoor'],
    },
    SEARCH: { path: '/search', label: 'Search' },
    ACCOUNT: { path: '/account', label: 'Account' },
    WISHLIST: { path: '/wishlist', label: 'Wishlist' },
    CART: { path: '/cart', label: 'Cart' },
  },
}));

// The type definitions for jest-dom are imported via the import statement above

xdescribe('Navbar', () => {
  test('renders the navbar with correct elements', () => {
    render(<Navbar />);
    expect(screen.getByText('B-EC')).toBeInTheDocument();
    expect(screen.getByText('INTERIOR')).toBeInTheDocument();
    expect(screen.getByText('GARDEN & PATIO')).toBeInTheDocument();
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
    expect(screen.getByLabelText('Cart')).toBeInTheDocument();
    expect(screen.getByLabelText('Wishlist')).toBeInTheDocument();
    expect(screen.getByLabelText('Account')).toBeInTheDocument();
  });

  test('has no accessibility violations', async () => {
    await checkAccessibility(<Navbar />);
  });
});
