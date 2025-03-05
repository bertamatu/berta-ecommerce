describe('Products Page', () => {
  beforeEach(() => {
    cy.visit('/products');
  });

  it('should load the products page successfully', () => {
    cy.url().should('include', '/products');
  });

  it('should display product items', () => {
    cy.get('[data-testid="product-item"]').should('exist');
  });

  it('should allow filtering products', () => {
    cy.get('[data-testid="product-filter"]').should('exist');
  });

  it('should be able to click on a product filter', () => {
    cy.get('[data-testid^="filter-"]').first().click();
    cy.url().should('include', 'category=');
  });

  it('should be able to clear filters', () => {
    cy.get('[data-testid^="filter-"]').first().click();
    cy.get('[data-testid="clear-filters"]').click();
    cy.url().should('not.include', 'category=');
  });

  it('should navigate to product detail page when clicking on a product', () => {
    cy.get('[data-testid^="product-link-"]').first().click();
    cy.url().should('match', /\/products\/\d+/);
  });

  it('should show alert when adding product to cart', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);
    cy.get('[data-testid^="add-to-cart-"]').first().click();
    cy.then(() => {
      expect(alertStub).to.be.calledWithMatch(/Added .* to cart/);
    });
  });
});
