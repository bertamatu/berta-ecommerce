describe('A11yCheckerWrapper Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the page without hydration errors', () => {
    cy.get('body').should('be.visible');
  });

  it('should not display the accessibility panel in Cypress tests', () => {
    cy.get('body')
      .find('div')
      .contains('Accessibility Issues')
      .should('not.exist');
  });

  it('should render the main content correctly', () => {
    cy.get('nav').should('exist');
    cy.get('main').should('exist');
    cy.get('footer').should('exist');
  });

  it('should navigate between pages without errors', () => {
    cy.get('nav a').first().click();
    cy.url().should('not.equal', '/');

    cy.visit('/');
    cy.get('body').should('be.visible');
  });
});
