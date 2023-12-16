describe('web', () => {
    it("should be able to open a page", () => {
        cy.visit(Cypress.env('url'));
    })
});