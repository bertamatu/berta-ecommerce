describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the homepage successfully', () => {
    cy.title().should('exist');
  });

  it('should display the main navigation', () => {
    cy.get('nav').should('exist');
  });

  it('should have working links in the navigation', () => {
    cy.get('nav a').first().should('have.attr', 'href');
  });

  it('should navigate to cart page when clicking the cart icon', () => {
    cy.get('[data-testid="cart-icon"]').click();
    cy.url().should('include', '/cart');
  });
});
