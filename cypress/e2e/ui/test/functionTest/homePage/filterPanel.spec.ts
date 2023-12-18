import { filterPanel } from "../../../pages/homePage/filterPanel.section";
import * as FILTER_PANEL from "../../../../data/FilterPanel";

describe("Filter Panel", () => {
    beforeEach(() => {
        cy.visit(Cypress.env('url')); 
    });

    it("should be able to see all sections of filter panel", () => {
        //verify all section of filters panel are displaying
        filterPanel.allGridTitles.each(($gridTitle, index) => {
            cy.wrap($gridTitle).should("contain.text", Object.values(FILTER_PANEL.FILTER_PANEL)[index]);
        });
    });

    it("should be able to select an option from a dropdown list", () => {
        //verify sort 
        cy.selectOptionFromDropdown(filterPanel.selectors.SORT_FORM_SELECT, filterPanel.strings.SORT_FORM_SELECT_DESC_OPTION);
    });
});