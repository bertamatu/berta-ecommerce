'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WEB_APP_TITLE, ROUTES } from '@/app/Constants';

const categories = [
  { name: ROUTES.INTERIOR.label, href: ROUTES.INTERIOR.path },
  { name: ROUTES.GARDEN.label, href: ROUTES.GARDEN.path },
];

const iconPaths = [
  {
    path: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    href: ROUTES.SEARCH.path,
    label: 'Search',
  },
  {
    path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    href: ROUTES.ACCOUNT.path,
    label: 'Account',
  },
  {
    path: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    href: ROUTES.WISHLIST.path,
    label: 'Wishlist',
  },
  {
    path: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    href: ROUTES.CART.path,
    label: 'Cart',
  },
];

const IconButton = ({
  children,
  href,
  label,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`text-gray-700 hover:text-gray-900 transition-colors duration-200 relative group ${
        isActive ? 'text-blue-600' : ''
      }`}
      aria-label={label}
    >
      {children}
      <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {label}
      </span>
    </Link>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold hover:opacity-80 transition-opacity duration-200"
            >
              {/* Replace with your logo */}
              {/* <Image src="/logo.png" alt={WEB_APP_TITLE} width={120} height={40} /> */}
              {WEB_APP_TITLE}
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className={`text-gray-700 hover:text-gray-900 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                    pathname === category.href
                      ? 'text-blue-600 after:scale-x-100'
                      : ''
                  }`}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-8">
              {iconPaths.map((icon, index) => (
                <IconButton key={index} href={icon.href} label={icon.label}>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={icon.path}
                    />
                  </svg>
                </IconButton>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden" ref={menuRef}>
        <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
            <Link href="/" className="text-xl font-bold">
              {WEB_APP_TITLE}
            </Link>
            <div className="flex items-center space-x-4">
              {iconPaths.slice(-2).map((icon, index) => (
                <IconButton key={index} href={icon.href} label={icon.label}>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={icon.path}
                    />
                  </svg>
                </IconButton>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`fixed top-14 left-0 bottom-0 w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 space-y-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={`block py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200 ${
                  pathname === category.href ? 'text-blue-600 font-medium' : ''
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
