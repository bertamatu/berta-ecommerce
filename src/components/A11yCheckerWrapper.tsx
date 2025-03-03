'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the A11yChecker with no SSR to avoid server-side errors
const A11yChecker = dynamic(
  () => import('@/utils/a11y-checker').then((mod) => mod.A11yChecker),
  {
    ssr: false,
  }
);

export const A11yCheckerWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <A11yChecker>{children}</A11yChecker>;
};
