import { filterPanel } from "../../../pages/homePage/filterPanel.section";
import { Chance } from 'chance';
import { card } from "../../../pages/homePage/card.section";
const chance = new Chance();

describe("Search on Filter Panel", () => {

    beforeEach(() => {
        cy.visit(Cypress.env('url'));
    });

    it("should be able to move slider handle and filter tools within the chosen price range", () => {
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
    
    it("should be able to search tools", () => {
        let toolSearchString = chance.string();
        
        //fill input string
        cy.fillInputField(filterPanel.selectors.SEARCH_INPUT_FIELD, toolSearchString);

        //clear input string
        filterPanel.clearSearchInputField();

        //verify the contents in the search input field has been cleared
        cy.get(filterPanel.selectors.SEARCH_INPUT_FIELD).should('contain.value', '');

        //search tools by random string
        filterPanel.search(toolSearchString);

        //verify there is no tools found
        cy.get(filterPanel.selectors.SEARCH_WITH_NO_RESULTS).should('be.visible');

        toolSearchString = 'Pliers';

        //search by valid tool name
        filterPanel.search(toolSearchString);

        //verify test results
        cy.get(card.selectors.CARD_TITLE).each($cardName => {
            cy.wrap($cardName).should('contain.text', toolSearchString);
        });
    });
});