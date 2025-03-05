describe('Responsive Design Tests', () => {
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 800 },
  ];

  viewports.forEach((viewport) => {
    describe(`${viewport.name} viewport`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
        cy.visit('/');
      });

      it('should display the navbar correctly', () => {
        cy.get('nav').should('exist');
        cy.contains('Berta').should('be.visible');

        if (viewport.name === 'mobile') {
          cy.get('nav').find('svg').should('be.visible');
        }
      });

      it('should display the homepage content correctly', () => {
        cy.get('main').should('be.visible');
        cy.get('h1').should('be.visible');
        cy.get('.grid').should('exist');
      });

      it('should display the footer correctly', () => {
        cy.scrollTo('bottom');
        cy.get('footer', { timeout: 10000 }).should('be.visible');
        cy.get('footer').contains('Quick Links').should('exist');
      });

      it('should display the products page correctly', () => {
        cy.visit('/products');
        cy.url().should('include', '/products');
        cy.get('main').should('be.visible');
      });

      it('should display product details correctly', () => {
        cy.visit('/products');
        cy.get('a').first().click();
        cy.get('h1').should('be.visible');
        cy.get('button').should('be.visible');
      });
    });
  });
});
