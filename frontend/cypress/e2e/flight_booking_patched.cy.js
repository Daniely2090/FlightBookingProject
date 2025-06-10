describe('Flight Booking Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/flights').as('getFlights');
    cy.visit('/');
    cy.wait('@getFlights');
  });

  it('Should open booking form when clicking "Book Now"', () => {
    cy.get('.flight-card', { timeout: 10000 }).first().contains('Book Now').click();
    cy.contains('Book Flight').should('be.visible');
    cy.get('input[placeholder="Passenger Name"]').should('exist');
    cy.get('input[placeholder="Seat Number"]').should('exist');
  });

  it('Should cancel booking when clicking "Cancel"', () => {
    cy.get('.flight-card', { timeout: 10000 }).first().contains('Book Now').click();
    cy.contains('Cancel').click();
    cy.contains('Book Flight').should('not.exist');
  });

  it('Should fill and confirm booking form', () => {
    cy.get('.flight-card', { timeout: 10000 }).first().contains('Book Now').click();
    cy.get('input[placeholder="Passenger Name"]').type('John Doe');
    cy.get('input[placeholder="Seat Number"]').type('12A');
    cy.contains('Confirm Booking').click();
    cy.contains('Reservation confirmed').should('exist');
  });

  it('Should filter flights using search', () => {
    cy.get('input[placeholder="Search flights"]', { timeout: 10000 }).type('Tokyo');
    cy.get('.flight-card').should('contain', 'Tokyo');
  });
});
