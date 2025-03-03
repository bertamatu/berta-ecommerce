# Berta E-commerce

A modern e-commerce platform built with Next.js and Tailwind CSS.

## Features

- Responsive design
- Product catalog
- Shopping cart functionality
- User authentication

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Linting and Formatting

This project uses ESLint and Prettier for code quality:

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Fix all issues (format + lint)
npm run fix
```

## Git Hooks

Pre-commit hooks are set up using Husky and lint-staged to ensure code quality before commits.

## Accessibility (a11y)

This project prioritizes accessibility through several implementations:

### Accessibility Testing

We use Jest and jest-axe for automated accessibility testing:

```bash
# Run accessibility tests
npm run test:a11y
```

The tests check components against WCAG guidelines and report any violations. Our accessibility tests:

- Use the `jest-axe` library to check for WCAG violations
- Include custom matchers via `expect.extend(toHaveNoViolations)`
- Test key components like `Navbar` and `Footer` for accessibility compliance
- Can be extended to test any component using the `checkAccessibility` helper function

Example test implementation:

```tsx
// Helper function to check accessibility
const checkAccessibility = async (component: React.ReactElement) => {
  const { container } = render(component);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
};

describe('Accessibility Tests', () => {
  it('Component has no accessibility violations', async () => {
    await checkAccessibility(<YourComponent />);
  });
});
```

### A11y Checker Component

In development mode, the application includes an accessibility checker that provides real-time feedback:

- The `A11yCheckerWrapper` component is a client-side wrapper for the axe-core accessibility engine
- It dynamically imports the A11yChecker with `ssr: false` to avoid server-side rendering issues in Next.js
- It only runs in development mode and doesn't affect production builds
- It highlights accessibility issues directly in the UI for immediate feedback

Implementation details:

- Uses axe-core to scan the DOM for accessibility issues
- Displays a panel showing all detected issues with severity levels
- Provides links to resources for fixing each issue
- Can be toggled on/off via a floating button

### Server vs Client Components in Next.js

Our implementation addresses the challenges of using accessibility tools with Next.js Server Components:

- The main `A11yChecker` is a client component (marked with `'use client'`)
- We use a wrapper component with dynamic imports to avoid SSR issues
- The checker is conditionally rendered only in development environments

### Implementation Details

- **axe-core**: Powers our accessibility testing and real-time checking
- **jest-axe**: Provides custom Jest matchers for accessibility assertions
- **eslint-plugin-jsx-a11y**: Enforces accessibility best practices during development
- **Next.js dynamic imports**: Used to load the checker only on the client side

### Best Practices

When developing new components:

1. Run accessibility tests to ensure compliance
2. Check the development UI for any highlighted accessibility issues
3. Follow WCAG 2.1 AA standards for all user interfaces
4. Ensure proper keyboard navigation, screen reader support, and sufficient color contrast
5. Address issues by severity (critical, serious, moderate, minor)

### Troubleshooting Common Accessibility Issues

#### Server Component vs Client Component Issues

If you encounter errors related to the A11yChecker in Next.js:

```
Error: Event handlers cannot be passed to Client Component props.
<A11yChecker> component at ...
```

Solution:

- Make sure to use the `A11yCheckerWrapper` component which properly handles client-side rendering
- Ensure the component is imported with `dynamic` and `ssr: false` option

#### Jest Configuration for Accessibility Tests

If accessibility tests fail to run properly:

1. Ensure Jest is configured correctly with ES modules:

   - Use `.mjs` extension for Jest configuration files
   - Use ES module syntax (`import`/`export`) instead of CommonJS (`require`/`module.exports`)

2. Check that the setup file includes:
   ```js
   import { toHaveNoViolations } from 'jest-axe';
   expect.extend(toHaveNoViolations);
   ```

#### Common Accessibility Violations

1. **Missing alternative text**:

   - Add `alt` attributes to all images
   - Use empty `alt=""` for decorative images

2. **Insufficient color contrast**:

   - Ensure text has sufficient contrast with its background
   - Use tools like the WebAIM contrast checker

3. **Missing form labels**:

   - All form inputs should have associated labels
   - Use `htmlFor` attribute matching the input's `id`

4. **Keyboard navigation issues**:
   - Ensure all interactive elements are focusable
   - Maintain a logical tab order
   - Provide visible focus indicators

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage

# Run accessibility tests
npm run test:a11y
```
