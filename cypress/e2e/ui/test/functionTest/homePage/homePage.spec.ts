import { header } from "../../../pages/homePage/header.section";


describe('Home page', () => {
    it("should be able to show the tile of the home page", () => {
        cy.visit(Cypress.env('url')); 
        cy.title().should("exist").and("contain", header.strings.PAGE_TITLE);
    })
});