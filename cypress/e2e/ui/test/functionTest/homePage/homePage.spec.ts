import { header } from "../../../pages/homePage/header.section";
import * as HEADERS from "../../../../data/Headers"

describe('Home page', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('url')); 
    });

    it("should be able to show the tile of the home page", () => {
        cy.title().should("contain", header.strings.PAGE_TITLE);
    });

    it("should be able to see all tabs", () => {
        cy.get(header.selectors.NAV_LINKS).each(($navLink, index) => {
            cy.wrap($navLink).should("contain.text", (Object.values(HEADERS.Headers))[index]);
        });
    });
});