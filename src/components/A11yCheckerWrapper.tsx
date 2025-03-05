'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

// Dynamically import the A11yChecker with no SSR to avoid server-side errors
const A11yChecker = dynamic(
  () => import('@/utils/a11y-checker').then((mod) => mod.A11yChecker),
  {
    ssr: false,
  }
);

/**
 * A wrapper component for the A11yChecker that:
 * 1. Only runs in development mode
 * 2. Disables during Cypress tests to prevent errors
 * 3. Uses dynamic import to avoid SSR issues
 */
export const A11yCheckerWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Use state to track whether to show the checker
  // This avoids hydration errors by ensuring the same initial render on server and client
  const [showChecker, setShowChecker] = useState(false);

  // Use useEffect to determine if we should show the checker
  // This only runs on the client, after hydration
  useEffect(() => {
    // Only show in development and not in Cypress tests
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isCypressTest = typeof window !== 'undefined' && 'Cypress' in window;

    setShowChecker(isDevelopment && !isCypressTest);
  }, []);

  // Always render children, conditionally wrap with A11yChecker
  return showChecker ? <A11yChecker>{children}</A11yChecker> : <>{children}</>;
};
