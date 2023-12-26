import { filterPanel } from "../../../pages/homePage/filterPanel.section";
import { card } from "../../../pages/homePage/card.section";

describe("Moving slider handle on Filter Panel", () => {

    beforeEach(() => {
        cy.visit(Cypress.env('url'));
    });

    it("should be able to move slider handle and filter tools within the chosen price range", () => {
        const STEP_SIZE = 2;
        const MIN_VALUE = 20;
        const MAX_VALUE = 50;
    
        // Move the first handle to a specific position
        cy.moveSliderHandle(filterPanel.selectors.SLIDER_POINTER_MIN, 'aria-valuenow', MIN_VALUE, 'right', STEP_SIZE, 8000);
    
        // Move the second handle to a specific position
        cy.moveSliderHandle(filterPanel.selectors.SLIDER_POINTER_MAX, 'aria-valuenow', MAX_VALUE, 'left', STEP_SIZE, 8000);

        //verify only show cards with its price within the range slided
        cy.get(card.selectors.CARD_PRICE).each($price => {
            const toolPrice = parseFloat($price.text().replace('$', ''));
            expect(toolPrice).to.be.greaterThan(MIN_VALUE + 1);
            expect(toolPrice).to.be.lessThan(MAX_VALUE);
        });
    });
});