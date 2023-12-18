import { header } from "../../../pages/homePage/header.section";
import * as HEADERS from "../../../../data/Headers"

describe("Page Header Bar", () => {
    beforeEach(() => {
        cy.visit(Cypress.env('url')); 
    });

    it("should be able to see all tabs", () => {
        cy.get(header.selectors.NAV_LINKS).each(($navLink, index) => {
            cy.wrap($navLink).should("contain.text", (Object.values(HEADERS.HEADERS))[index]);
        });
    }); 
});