import { header } from "../../../pages/homePage/header.section";
import * as HEADERS from "../../../../data/Headers"
import { homePage } from "../../../pages/homePage/home.page";

describe('Home page', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('url')); 
    });
    
    it("should be able to see all seections", () => {
        cy.get(homePage.selectors.NAVBAR).should('be.visible');
        cy.get(homePage.selectors.LEAD_IMAG).should('be.visible');
        cy.get(homePage.selectors.FILTERS).should('be.visible');
        cy.get(homePage.selectors.CARD_CONTAINER).should('be.visible');
        cy.get(homePage.selectors.PAGINATION).should('be.visible');
        cy.get(homePage.selectors.FOOTER).should('be.visible');
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