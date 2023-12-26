import { filterPanel } from "../../../pages/homePage/filterPanel.section";
import { card } from "../../../pages/homePage/card.section";
import * as toolbox from "../../../../../support/toolbox";
import { cardContainer } from "../../../pages/homePage/carContainer.section";


describe("Search on Filter Panel", () => {

    beforeEach(() => {
        cy.visit(Cypress.env('url'));
    });
    
    it("should be able to search tools", () => {
        let toolSearchString = toolbox.generateRandomString();
        
        //fill input string
        cy.fillInputField(filterPanel.selectors.SEARCH_INPUT_FIELD, toolSearchString);

        //clear input string
        filterPanel.clearSearchInputField();

        //verify the contents in the search input field has been cleared
        cy.get(filterPanel.selectors.SEARCH_INPUT_FIELD).should('contain.value', '');

        //search tools by random string
        filterPanel.search(toolSearchString);

        //verify there is no tools found
        cy.get(cardContainer.selectors.NO_RESULTS_FILTERED).should('be.visible');

        toolSearchString = 'Pliers';

        //search by valid tool name
        filterPanel.search(toolSearchString);

        //verify test results
        cy.get(card.selectors.CARD_TITLE).each($cardName => {
            cy.wrap($cardName).should('contain.text', toolSearchString);
        });
    });
});