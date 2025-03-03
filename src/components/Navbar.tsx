'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { WEB_APP_TITLE, ROUTES } from '@/app/Constants';
import { useCart } from '@/contexts/CartContext';

// Using object destructuring and computed property names for better organization
const { INTERIOR, GARDEN, SEARCH, ACCOUNT, WISHLIST, CART } = ROUTES;

// Using arrow function with implicit return for mapping
const createSubmenuItems = (categories: readonly string[]) =>
  categories.map((cat) => ({
    name: cat,
    href: `/products?category=${encodeURIComponent(cat)}`,
  }));

// Using object property shorthand and template literals
const categories = [
  {
    name: INTERIOR.label,
    href: '/products?mainCategory=INTERIOR',
    defaultCategory: 'INTERIOR',
    submenu: createSubmenuItems(INTERIOR.categories),
  },
  {
    name: GARDEN.label,
    href: '/products?mainCategory=GARDEN',
    defaultCategory: 'GARDEN',
    submenu: createSubmenuItems(GARDEN.categories),
  },
];

// Using array of objects with consistent structure
const iconPaths = [
  {
    path: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    href: SEARCH.path,
    label: 'Search',
  },
  {
    path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    href: ACCOUNT.path,
    label: 'Account',
  },
  {
    path: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    href: WISHLIST.path,
    label: 'Wishlist',
  },
  {
    path: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    href: CART.path,
    label: 'Cart',
  },
];

// Using destructuring in function parameters and template literals for className
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

  // Using template literals and logical operators for conditional classes
  const activeClass = isActive ? 'text-blue-600' : '';

  return (
    <Link
      href={href}
      className={`group relative text-gray-700 transition-colors duration-200 hover:text-gray-900 ${activeClass}`}
      aria-label={label}
    >
      <div className="relative">
        {children}
        {/* Using optional chaining and nullish coalescing for safer code */}
        {badge && badge > 0 && (
          <span
            className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
            aria-label={`${badge} items`}
          >
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
  // Using array destructuring for state hooks
  const [_isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const _router = useRouter();
  const { itemCount } = useCart();

  // Using arrow functions and type annotations
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Using arrow function for cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Using arrow function and dependency array
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  }, [pathname]);

  // Using arrow function with ternary operator
  const toggleSubmenu = (category: string) =>
    setActiveSubmenu((prevCategory) =>
      prevCategory === category ? null : category
    );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-6">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              {WEB_APP_TITLE}
            </Link>
            <div className="ml-10 hidden space-x-8 lg:block" ref={menuRef}>
              {/* Using destructuring in map callback */}
              {categories.map(({ name, href, submenu }) => (
                <div
                  key={name}
                  className="group relative inline-block text-left"
                >
                  <div className="flex items-center">
                    <button
                      onClick={() => toggleSubmenu(name)}
                      className={`flex items-center text-base font-medium text-gray-700 transition-colors duration-200 hover:text-gray-900 ${
                        pathname === href ? 'text-gray-900' : ''
                      }`}
                      aria-expanded={activeSubmenu === name}
                      aria-haspopup="true"
                      aria-controls={`submenu-${name}`}
                    >
                      {name}
                      <svg
                        className={`ml-1 size-5 transition-transform duration-200 ${
                          activeSubmenu === name ? 'rotate-180' : ''
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
                  {/* Fixed submenu rendering to prevent double flicker */}
                  <div
                    id={`submenu-${name}`}
                    className={`absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg transition-opacity duration-200 ${
                      activeSubmenu === name
                        ? 'opacity-100'
                        : 'pointer-events-none opacity-0'
                    }`}
                    aria-hidden={activeSubmenu !== name}
                  >
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby={`submenu-button-${name}`}
                    >
                      {/* Using destructuring in map callback */}
                      {submenu.map(({ name: itemName, href: itemHref }) => (
                        <Link
                          key={itemName}
                          href={itemHref}
                          className="block px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100"
                          role="menuitem"
                          onClick={() => {
                            setActiveSubmenu(null);
                            setIsMenuOpen(false);
                          }}
                        >
                          {itemName}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-8">
            {/* Using destructuring in map callback and spreading props */}
            {iconPaths.map(({ path, href, label }, index) => (
              <IconButton
                key={index}
                href={href}
                label={label}
                badge={label === 'Cart' ? itemCount : undefined}
              >
                <svg
                  className="size-6 transition-colors duration-200 hover:text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={path}
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
