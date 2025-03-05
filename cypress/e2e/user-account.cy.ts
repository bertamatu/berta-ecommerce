describe('User Account Management', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to account page', () => {
    cy.get('[data-testid="account-icon"]').click();
    cy.url().should('include', '/account');
    cy.get('h1').should('be.visible');
  });

  it('should display account page elements', () => {
    cy.get('[data-testid="account-icon"]').click();
    cy.get('main').should('exist');
    cy.get('h1').should('be.visible');
    cy.get('p').should('exist');
  });

  it('should have navigation back to home', () => {
    cy.get('[data-testid="account-icon"]').click();
    cy.get('a[href="/"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
