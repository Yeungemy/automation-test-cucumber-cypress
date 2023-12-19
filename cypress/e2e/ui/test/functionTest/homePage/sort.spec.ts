import { filterPanel } from "../../../pages/homePage/filterPanel.section";

describe("Sort on Filter Panel", () => {

    beforeEach(() => {
        cy.visit(Cypress.env('url'));
    });

    it("should be able to select an option from a dropdown list", () => {
        //verify sort option can be selected
        cy.selectOptionFromDropdown(filterPanel.selectors.SORT_FORM_SELECT, filterPanel.strings.SORT_FORM_SELECT_DESC_OPTION);
    });
});