describe('Footer Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the footer', () => {
    cy.get('footer').should('be.visible');
  });

  it('should display the company name', () => {
    cy.get('footer').contains('BertaShop').should('exist');
  });

  it('should display the company tagline', () => {
    cy.get('footer')
      .contains('Your one-stop shop for quality products')
      .should('exist');
  });

  it('should have Quick Links section', () => {
    cy.get('footer').contains('Quick Links').should('exist');
    cy.get('footer').contains('Products').should('exist');
    cy.get('footer').contains('About Us').should('exist');
    cy.get('footer').contains('Contact').should('exist');
  });

  it('should have Contact Info section', () => {
    cy.get('footer').contains('Contact Info').should('exist');
    cy.get('footer').contains('Email:').should('exist');
    cy.get('footer').contains('Phone:').should('exist');
    cy.get('footer').contains('Address:').should('exist');
  });

  it('should navigate to Products page when clicking Products link', () => {
    cy.get('footer').contains('Products').click();
    cy.url().should('include', '/products');
  });

  it('should navigate to About page when clicking About Us link', () => {
    cy.get('footer').contains('About Us').click();
    cy.url().should('include', '/about');
  });

  it('should navigate to Contact page when clicking Contact link', () => {
    cy.get('footer').contains('Contact').click();
    cy.url().should('include', '/contact');
  });

  it('should have proper layout on desktop', () => {
    cy.viewport(1024, 768);
    cy.get('footer .grid').should('have.class', 'md:grid-cols-3');
  });

  it('should have proper layout on mobile', () => {
    cy.viewport(375, 667);
    cy.get('footer .grid').should('have.class', 'grid-cols-1');
  });
});
