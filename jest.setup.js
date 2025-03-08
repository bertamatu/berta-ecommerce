// Import jest-dom for DOM element assertions
import '@testing-library/jest-dom';

// Import jest-axe for accessibility testing
const { toHaveNoViolations } = require('jest-axe');

// Add custom jest matchers for accessibility testing
expect.extend(toHaveNoViolations);

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };
  },
}));

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  default: (props) => {
    // Ensure alt attribute is present
    const imgProps = { ...props };
    if (!imgProps.alt && imgProps.alt !== '') {
      imgProps.alt = ''; // Default to empty alt for decorative images
    }
    // eslint-disable-next-line react/react-in-jsx-scope, @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...imgProps} />;
  },
}));
