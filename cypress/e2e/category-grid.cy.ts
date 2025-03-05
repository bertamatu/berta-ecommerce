describe('CategoryGrid Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display category grid with title', () => {
    cy.get('main').should('exist');
    cy.get('main h1').should('exist');
  });

  it('should display category cards', () => {
    cy.get('main .grid').should('exist');
    cy.get('main .grid > div').should('have.length.at.least', 1);
  });

  it('should have clickable category links', () => {
    cy.get('main .grid > div a').first().should('have.attr', 'href');
    cy.get('main .grid > div a').first().click();
    cy.url().should('include', 'category=');
  });

  it('should display category names', () => {
    cy.get('main .grid h2').should('have.length.at.least', 1);
    cy.get('main .grid h2').first().should('not.be.empty');
  });
});
