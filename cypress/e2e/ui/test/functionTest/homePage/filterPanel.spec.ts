import { filterPanel } from "../../../pages/homePage/filterPanel.section";
import * as FILTER_PANEL from "../../../../data/FilterPanel";
import { Chance } from 'chance';
const chance = new Chance();

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
        //verify sort option can be selected
        cy.selectOptionFromDropdown(filterPanel.selectors.SORT_FORM_SELECT, filterPanel.strings.SORT_FORM_SELECT_DESC_OPTION);
    });

    it("should be able to filter by price range", () => {
        const MIN_VALUE = 100;
        const MAX_VALUE = 150;

        // Move the first handle to a specific position
        cy.get(filterPanel.selectors.SLIDER_POINTER_MIN).invoke('attr', 'aria-valuenow', MIN_VALUE).trigger('change')

        // Move the second handle to a specific position
        cy.get(filterPanel.selectors.SLIDER_POINTER_MAX).invoke('attr', 'aria-valuenow', MAX_VALUE).trigger('change')

        // Verify that the slider values are updated accordingly
        cy.get(filterPanel.selectors.SLIDER_POINTER_MIN).should('have.attr', 'aria-valuenow', MIN_VALUE.toString());
    });
});