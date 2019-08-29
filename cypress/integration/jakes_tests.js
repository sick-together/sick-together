describe('Login', () => {
    const username = 'test'
    const password = 1234
    const group_name = 'Strong Hospital'
    const group_picture = 'https://media1.tenor.com/images/a268b7f15a5ed66ad7d0d56fbb5b1d01/tenor.gif?itemid=5653000'
    const description = 'Rochester general hospital'
    const city = 'Rochester'
    const state = 'NY'
    it('logs in', () => {
        cy.visit('/')
        cy.get('input[name="username"]').type(username)
        cy.get('input[name="password"]').type(password)
            .type('{enter}')
    })
    it('Checks for search group input', () => {
        cy.get('input[name="search"]')
            .should('exist')
            .type('test')
            .type('{enter}')
    });
    it('clicks hamburg', () => {
        cy.get('#hamburger')
            .should('exist')
            .click()
    })
    it('clicks add new group', () => {
        cy.get('#add-group')
            .should('exist')
            .click()
    })
    it('adds info', () => {
        cy.get('input[name="group_name"]')
            .type(group_name)

        cy.get('input[name="group_picture"]')
            .type(group_picture)

        cy.get('input[name="description"]')
            .type(description)

        cy.get('input[name="city"]')
            .type(city)
    })
    it('adds state and submits', () => {
        cy.get('#state-selector')
            .should('exist')
            .click()

        cy.get('#ny')
            .should('exist')
            .click()

        cy.get('#button').click()
    })
})

