# Cypress Tests for Berta E-commerce

This directory contains end-to-end tests using Cypress for the Berta E-commerce application.

## Directory Structure

- `e2e/`: Contains all the end-to-end test files
- `fixtures/`: Contains static data that can be used by your tests
- `support/`: Contains custom commands and other support code

## Running Tests

You can run the Cypress tests using the following npm scripts:

```bash
# Open Cypress in interactive mode
npm run cypress

# Run Cypress tests headlessly
npm run cypress:headless

# Start the development server and run Cypress in interactive mode
npm run test:e2e

# Start the development server and run Cypress headlessly
npm run test:e2e:headless
```

## Writing Tests

When writing tests, follow these guidelines:

1. Use descriptive test names that explain what you're testing
2. Group related tests in the same file
3. Use `beforeEach` for common setup steps
4. Use data attributes like `data-testid` for selecting elements
5. Keep tests independent of each other

## Example Test Structure

```typescript
describe('Feature Name', () => {
  beforeEach(() => {
    // Common setup
    cy.visit('/path');
  });

  it('should do something specific', () => {
    // Test steps
    cy.get('[data-testid="element"]').click();

    // Assertions
    cy.url().should('include', '/expected-path');
  });
});
```

## Error Handling

The application uses centralized error handling in the `cypress/support/e2e.ts` file to prevent tests from failing due to common React and accessibility issues:

1. **React Hydration Errors**: These errors occur when there's a mismatch between server-rendered and client-rendered HTML. The tests will continue to run even if these errors occur.

2. **Axe Accessibility Errors**: When running multiple accessibility checks in quick succession, Axe might throw errors about already running. These errors are also ignored.

If you need to handle additional application-specific errors, you can add them to the `uncaught:exception` handler in the `e2e.ts` file.

## Best Practices

- Don't rely on the state from previous tests
- Use `cy.intercept()` to mock API responses when needed
- Use fixtures for test data
- Add appropriate waiting strategies instead of arbitrary delays
- Use custom commands for repetitive actions

## Selectors Priority

1. Data attributes (`data-testid="my-element"`)
2. Semantic HTML elements (`button`, `nav`, etc.)
3. Classes or IDs only when necessary and stable

## Debugging

When tests fail, you can:

1. Check the screenshots and videos in the `cypress/screenshots` and `cypress/videos` directories
2. Use `cy.pause()` to pause test execution
3. Use `cy.debug()` to open the browser's developer tools during test execution
