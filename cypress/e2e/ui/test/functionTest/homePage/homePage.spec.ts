import { header } from "../../../pages/homePage/header.section";
import { homePage } from "../../../pages/homePage/home.page";

describe('Home page', () => {
    beforeEach(() => {
        cy.visit(Cypress.env('url')); 
    });
    
    it("should be able to see all seections", () => {
        homePage.navbar.should('be.visible');
        homePage.leadImage.should('be.visible');
        homePage.filterPanel.should('be.visible');
        homePage.cardContainer.should('be.visible');
        homePage.pagination.should('be.visible');
        homePage.footer.should('be.visible');
    });  

    it("should be able to show the tile of the home page", () => {
        cy.title().should("contain", header.strings.PAGE_TITLE);
    }); 
});