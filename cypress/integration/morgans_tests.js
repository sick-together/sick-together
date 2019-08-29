describe('My first test', function(){
    it('Visits the first page', function() {
        cy.visit('http://localhost:3000/#/')
    })

    it('Loads log in button on page load', () => {
        cy.get('loginButton')
        .should('exist')
    })
    it('Loads register link', () => {
        cy.get('registerLink')
        .should('exist')
    })
    it('Loads username input', () => {
        cy.get('standard-name')
        .should('exist')
    })
    it('Loads password input', () => {
        cy.get('password-input')
        .should('exist')
    })
}
)

