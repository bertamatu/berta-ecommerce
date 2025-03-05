describe('Shopping Cart', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to the cart page', () => {
    cy.get('[data-testid="cart-icon"]').click();
    cy.url().should('include', '/cart');
  });

  it('should display empty cart message when cart is empty', () => {
    cy.visit('/cart');
    cy.get('[data-testid="empty-cart-message"]').should('exist');
  });

  it('should allow navigation back to products from empty cart', () => {
    cy.visit('/cart');
    cy.get('[data-testid="continue-shopping"]').click();
    cy.url().should('include', '/products');
  });

  it('should add a product to the cart and display it', () => {
    cy.visit('/products');
    cy.get('[data-testid^="add-to-cart-"]').first().click();
    cy.on('window:alert', (text) => {
      expect(text).to.include('Added');
    });
    cy.get('[data-testid="cart-icon"]').click();
    cy.get('[data-testid^="cart-item-"]').should('exist');
  });

  it('should allow removing items from the cart', () => {
    cy.visit('/products');
    cy.get('[data-testid^="add-to-cart-"]').first().click();
    cy.on('window:alert', (text) => {
      expect(text).to.include('Added');
    });

    cy.get('[data-testid="cart-icon"]').click();
    cy.get('[data-testid^="remove-item-"]').first().click();
    cy.get('[data-testid="empty-cart-message"]').should('exist');
  });

  it('should allow clearing the entire cart', () => {
    cy.visit('/products');
    cy.get('[data-testid^="add-to-cart-"]').first().click();
    cy.on('window:alert', (text) => {
      expect(text).to.include('Added');
    });

    cy.get('[data-testid="cart-icon"]').click();
    cy.get('[data-testid="clear-cart"]').click();
    cy.get('[data-testid="empty-cart-message"]').should('exist');
  });
});
