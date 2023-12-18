import { header } from "../../../pages/homePage/header.section";
import * as TABS from "../../../../data/Tabs";

describe("Page Header Bar", () => {
    beforeEach(() => {
        //open the home page
        cy.visit(Cypress.env('url')); 
    });

    it("should be able to see all tabs", () => {
        //verify all labels of tabs are displaying properly
        cy.get(header.selectors.NAV_LINKS).each(($navLink, index) => {
            console.log("test");
            cy.wrap($navLink).should("contain.text", (Object.values(TABS.TABS))[index]);
        });
    }); 
});