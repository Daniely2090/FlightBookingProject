describe('Homepage Tests', () => {
  it('Should load the homepage', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Flight Booking') // <-- Replace with actual text on your homepage
  })
})
