import { filterPanel } from "../../../pages/homePage/filterPanel.section";
import * as FILTER_PANEL from "../../../../data/FilterPanel";
import { Chance } from 'chance';
import { card } from "../../../pages/homePage/card.section";
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
        const STEP_SIZE = 2;
        const MIN_VALUE = 20;
        const MAX_VALUE = 50;
    
        // Move the first handle to a specific position
        cy.moveSliderHandle(filterPanel.selectors.SLIDER_POINTER_MIN, MIN_VALUE, 'right', STEP_SIZE);
        cy.get(filterPanel.selectors.SLIDER_POINTER_MIN).should('have.attr', 'aria-valuenow', (MIN_VALUE + 1).toString());
    
        // Move the second handle to a specific position
        cy.moveSliderHandle(filterPanel.selectors.SLIDER_POINTER_MAX, MAX_VALUE, 'left', STEP_SIZE);
        cy.get(filterPanel.selectors.SLIDER_POINTER_MAX).should('have.attr', 'aria-valuenow', MAX_VALUE.toString());
        cy.wait(8000); //TODO: avoid hard wait

        //verify only show cards with its price within the range slided
        cy.get(card.selectors.CARD_PRICE).each($price => {
            const toolPrice = parseFloat($price.text().replace('$', ''));
            expect(toolPrice).to.be.greaterThan(MIN_VALUE + 1);
            expect(toolPrice).to.be.lessThan(MAX_VALUE);
        });
    });
    
});