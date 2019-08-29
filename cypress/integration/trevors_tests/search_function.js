describe("Search Function Works", () => {
  const username = "test";
  const password = 1234;

  it("logs in", () => {
    cy.visit("/");
    // cy.get('[data-cy-input]')
    cy.get('input[name="username"]').type(username);
    // cy.get('[data-cy-input]')
    cy.get('input[name="password"]')
      .type(password)
      .type("{enter}");
  });
  it("Checks for search group input", () => {
    cy.get('input[name="search"]')
      .should("exist")
      .type("test")
      .type("{enter}");
  });
});
