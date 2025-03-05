describe('Navbar Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the navbar', () => {
    cy.get('nav').should('be.visible');
  });

  it('should display the website title', () => {
    cy.get('nav').contains('Berta E-Commerce').should('exist');
  });

  it('should have navigation links', () => {
    cy.get('nav a').should('have.length.at.least', 3);
  });

  it('should have category links', () => {
    cy.get('nav').contains('Interior').should('exist');
    cy.get('nav').contains('Garden & Patio').should('exist');
  });

  it('should have icon buttons', () => {
    cy.get('nav svg').should('have.length.at.least', 3);
  });

  it('should navigate to search page when clicking search icon', () => {
    cy.get('nav a[href*="search"]').click();
    cy.url().should('include', '/search');
  });

  it('should navigate to cart page when clicking cart icon', () => {
    cy.get('nav a[href*="cart"]').click();
    cy.url().should('include', '/cart');
  });

  it('should show submenu when hovering over category', () => {
    cy.get('nav').contains('Interior').trigger('mouseover');
    cy.get('nav').contains('Living Room').should('be.visible');
  });

  it('should navigate to category page when clicking category link', () => {
    cy.get('nav').contains('Interior').trigger('mouseover');
    cy.get('nav').contains('Living Room').click();
    cy.url().should('include', 'category=Living%20Room');
  });
});
