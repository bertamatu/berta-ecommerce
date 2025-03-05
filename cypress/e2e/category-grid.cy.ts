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
    cy.get('main .grid > div a')
      .first()
      .should('have.attr', 'href')
      .and('include', 'category=');

    cy.get('main .grid > div a')
      .first()
      .invoke('attr', 'href')
      .then((href) => {
        cy.get('main .grid > div a').first().click();

        cy.url().should('include', 'category=');

        const hrefString = href as string;
        const categoryMatch = hrefString.match(/category=([^&]*)/);
        if (categoryMatch && categoryMatch[1]) {
          const category = categoryMatch[1];
          cy.url().should('include', `category=${category}`);
        }
      });
  });

  it('should display category names', () => {
    cy.get('main .grid h2').should('have.length.at.least', 1);
    cy.get('main .grid h2').first().should('not.be.empty');
  });

  it('should browse products and add to cart', () => {
    cy.get('main .grid > div a').first().click();

    cy.url().should('include', 'category=');

    cy.get('[data-testid="product-item"]').first().should('exist');

    cy.get('[data-testid^="add-to-cart-"]').first().should('exist');

    cy.get('[data-testid^="add-to-cart-"]').first().click();

    cy.get('[data-testid="cart-icon"]').click();

    cy.url().should('include', '/cart');

    cy.get('main').should('be.visible');
  });
});
