import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

// Mock CartContext
jest.mock('@/contexts/CartContext', () => ({
  CartProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useCart: () => ({
    cartItems: [],
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
    getCartTotal: jest.fn().mockReturnValue(0),
    getCartCount: jest.fn().mockReturnValue(0),
  }),
}));

// Helper function to check accessibility
const checkAccessibility = async (component: React.ReactElement) => {
  const { container } = render(component);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
};

xdescribe('Accessibility Tests', () => {
  it('Navbar has no accessibility violations', async () => {
    await checkAccessibility(<Navbar />);
  });

  it('Footer has no accessibility violations', async () => {
    await checkAccessibility(<Footer />);
  });

  // Add more component tests as needed
});
