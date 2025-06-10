describe('Flight Booking Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should open booking form when clicking "Book Now"', () => {
    cy.get('.route-box').first().find('button').click();
    cy.get('.reservation-form').should('exist');
  });

  it('Should cancel booking when clicking "Cancel"', () => {
    cy.get('.route-box').first().find('button').click();
    cy.get('.reservation-form').should('exist');
    cy.contains('❌ Cancel').click();
    cy.get('.reservation-form').should('not.exist');
  });

  it('Should fill and confirm booking form', () => {
    cy.get('.route-box').first().find('button').click();
    cy.get('input[placeholder="Passenger Name"]').type('John Doe');
    cy.get('input[placeholder="Seat Number"]').type('12A');
    cy.contains('🎉 Confirm Reservation').click();
    cy.contains('Reservation confirmed').should('exist');
  });

  it('Should filter flights using search', () => {
    cy.get('.route-box').should('have.length.greaterThan', 0);
    cy.get('input[placeholder="Search routes"]').type('Tokyo');
    cy.get('.route-box').each(($el) => {
      cy.wrap($el).should('contain.text', 'Tokyo');
    });
  });
});
