'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { WEB_APP_TITLE, ROUTES } from '@/app/Constants';
import { useCart } from '@/contexts/CartContext';

const categories = [
  {
    name: ROUTES.INTERIOR.label,
    href: '/products?mainCategory=INTERIOR',
    defaultCategory: 'INTERIOR',
    submenu: ROUTES.INTERIOR.categories.map((cat) => ({
      name: cat,
      href: `/products?category=${encodeURIComponent(cat)}`,
    })),
  },
  {
    name: ROUTES.GARDEN.label,
    href: '/products?mainCategory=GARDEN',
    defaultCategory: 'GARDEN',
    submenu: ROUTES.GARDEN.categories.map((cat) => ({
      name: cat,
      href: `/products?category=${encodeURIComponent(cat)}`,
    })),
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
  badge,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
  badge?: number;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`group relative text-gray-700 transition-colors duration-200 hover:text-gray-900 ${
        isActive ? 'text-blue-600' : ''
      }`}
      aria-label={label}
    >
      <div className="relative">
        {children}
        {badge !== undefined && badge > 0 && (
          <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {badge > 99 ? '99+' : badge}
          </span>
        )}
      </div>
      <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {label}
      </span>
    </Link>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount } = useCart();

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

  const _toggleMenu = () => {
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

  const _handleCategoryClick = (category: (typeof categories)[0]) => {
    // Navigate to the category page with the default filter
    router.push(category.href);
    // Close the submenu
    setActiveSubmenu(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-6">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              {WEB_APP_TITLE}
            </Link>
            <div className="ml-10 hidden space-x-8 lg:block">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="group relative inline-block text-left"
                >
                  <div className="flex items-center">
                    <button
                      onClick={() => toggleSubmenu(category.name)}
                      className={`flex items-center text-base font-medium text-gray-700 transition-colors duration-200 hover:text-gray-900 ${
                        pathname === category.href ? 'text-gray-900' : ''
                      }`}
                    >
                      {category.name}
                      <svg
                        className={`ml-1 size-5 transition-transform duration-200 ${
                          activeSubmenu === category.name ? 'rotate-180' : ''
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
                    <div className="absolute z-10 mt-2 w-48 rounded-md bg-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        {category.submenu.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100"
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
              <IconButton
                key={index}
                href={icon.href}
                label={icon.label}
                badge={icon.label === 'Cart' ? itemCount : undefined}
              >
                <svg
                  className="size-6 transition-colors duration-200 hover:text-gray-900"
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
    </header>
  );
};

export default Navbar;
