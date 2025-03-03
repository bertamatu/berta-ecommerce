'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { WEB_APP_TITLE, ROUTES } from '@/app/Constants';

const categories = [
  { 
    name: ROUTES.INTERIOR.label, 
    href: '/products?mainCategory=INTERIOR', 
    defaultCategory: 'INTERIOR',
    submenu: ROUTES.INTERIOR.categories.map(cat => ({
      name: cat,
      href: `/products?category=${encodeURIComponent(cat)}`
    }))
  },
  { 
    name: ROUTES.GARDEN.label, 
    href: '/products?mainCategory=GARDEN', 
    defaultCategory: 'GARDEN',
    submenu: ROUTES.GARDEN.categories.map(cat => ({
      name: cat,
      href: `/products?category=${encodeURIComponent(cat)}`
    }))
  },
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setActiveSubmenu(null);
    }
  };

  const toggleSubmenu = (category: string) => {
    if (activeSubmenu === category) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(category);
    }
  };

  const handleCategoryClick = (category: typeof categories[0]) => {
    // Navigate to the category page with the default filter
    router.push(category.href);
    // Close the submenu
    setActiveSubmenu(null);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-gray-200 lg:border-none">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              {WEB_APP_TITLE}
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {categories.map((category) => (
                <div key={category.name} className="relative inline-block text-left group">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className={`text-base font-medium text-gray-700 hover:text-gray-900 ${
                        pathname === category.href ? 'text-gray-900' : ''
                      }`}
                    >
                      {category.name}
                    </button>
                    <button
                      onClick={() => toggleSubmenu(category.name)}
                      className="ml-1 text-gray-700 hover:text-gray-900"
                    >
                      <svg
                        className={`w-5 h-5 inline-block transition-transform ${
                          activeSubmenu === category.name ? 'transform rotate-180' : ''
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Submenu */}
                  {activeSubmenu === category.name && (
                    <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        {category.submenu.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => {
                              setActiveSubmenu(null);
                              setIsMenuOpen(false);
                            }}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
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
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden" ref={menuRef}>
        <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              onClick={toggleMenu}
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
            <div className="flex space-x-4">
              {iconPaths.slice(-2).map((icon, index) => (
                <Link key={index} href={icon.href} aria-label={icon.label}>
                  <svg
                    className="h-6 w-6 text-gray-700"
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
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-white pt-14 overflow-y-auto">
            <div className="px-4 py-6 space-y-6">
              {categories.map((category) => (
                <div key={category.name} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        router.push(category.href);
                        setIsMenuOpen(false);
                      }}
                      className="text-lg font-medium text-gray-900"
                    >
                      {category.name}
                    </button>
                    <button
                      onClick={() => toggleSubmenu(category.name)}
                      className="p-2 text-gray-700"
                    >
                      <svg
                        className={`h-5 w-5 transition-transform ${
                          activeSubmenu === category.name ? 'transform rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                  {activeSubmenu === category.name && (
                    <div className="pl-4 space-y-2">
                      {category.submenu.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block py-2 text-gray-700"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4">
                {iconPaths.map((icon, index) => (
                  <Link
                    key={index}
                    href={icon.href}
                    className="flex items-center py-3 text-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg
                      className="h-6 w-6 mr-3"
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
                    {icon.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
