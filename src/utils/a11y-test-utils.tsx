import { ReactElement } from 'react';
import { axe } from 'jest-axe';
import { render } from './test-utils';

// Export axe for accessibility testing
export { axe };

// Helper function to test component accessibility
export async function checkAccessibility(ui: ReactElement) {
  const { container } = render(ui);
  const results = await axe(container);
  // This file will only be imported in test files, not during build
  // @ts-ignore - jest-axe types are only available during testing
  expect(results).toHaveNoViolations();
  return results;
}
