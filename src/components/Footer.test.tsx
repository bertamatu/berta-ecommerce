import React from 'react';
import { render, screen, checkAccessibility } from '@/utils/test-utils';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer', () => {
  test('renders the footer with correct elements', () => {
    render(<Footer />);

    // Check if the company name is rendered
    expect(screen.getByText('BertaShop')).toBeInTheDocument();
    expect(
      screen.getByText('Your one-stop shop for quality products.')
    ).toBeInTheDocument();

    // Check if quick links are rendered
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();

    // Check if contact info is rendered
    expect(screen.getByText('Contact Info')).toBeInTheDocument();
    expect(screen.getByText('Email: info@bertashop.com')).toBeInTheDocument();
    expect(screen.getByText('Phone: (123) 456-7890')).toBeInTheDocument();
    expect(
      screen.getByText('Address: 123 Shop Street, City')
    ).toBeInTheDocument();
  });

  test('has no accessibility violations', async () => {
    await checkAccessibility(<Footer />);
  });
});
