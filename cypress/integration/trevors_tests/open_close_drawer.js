describe("Open and Close Drawer", () => {
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
  it("opens drawer", () => {
    cy.get("#hamburg").click();
  });
  it("closes drawer", () => {
    cy.get("#drawer-close").click();
  });
});
