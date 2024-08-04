describe('Cypress test', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })
})

describe('SnapCart', () => {

  // Sign Up
  it('should sign up a new user', () => {
    cy.visit('http://localhost:3000/sign-up')
    cy.get('input[name="emailAddress"]').type('testuser@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[data-localization-key="formButtonPrimary"]').click()
    cy.url().should('include', '/')
  })

  // Sign In
  it('should sign in an existing user', () => {
    cy.visit('http://localhost:3000/sign-in')
    cy.get('input[name="identifier"]').type('johndoe@gmail.com')
    cy.get('button[data-localization-key="formButtonPrimary"]').click()
    cy.get('input[name="password"]').type('Snap102030')
    cy.get('button[data-localization-key="formButtonPrimary"]').click()
  })

  // Add to Cart
  it('should add a product to the cart', () => {
    const id = '66a4d06458699f63481e67e8';
    cy.visit(`http://localhost:3000/product/${id}`)
    cy.get('button').contains('Add to cart').click()
  })
})
