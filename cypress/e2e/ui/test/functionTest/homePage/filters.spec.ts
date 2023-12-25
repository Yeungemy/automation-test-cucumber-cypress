import { filterPanel } from '../../../pages/homePage/filterPanel.section';
import { cardContainer } from '../../../pages/homePage/carContainer.section';
import { toolDetails } from '../../../pages/homePage/toolDetails/toolDetails.page';
import * as toolbox from '../../../../../support/toolbox';
import * as FILTER_PANEL from "../../../../data/FilterPanel";

describe('Filters', () => {
  let indexOfFilter = 0;

  beforeEach(() => {
    cy.visit(Cypress.env('url'));
  });

  it("should be able to see all sections of filter panel", () => {
    //verify all section of filters panel are displaying
    filterPanel.allGridTitles.each(($gridTitle, index) => {
      cy.wrap($gridTitle).should("contain.text", Object.values(FILTER_PANEL.FILTER_PANEL)[index]);
    });
  });

  it("should be able to filter tools", () => {
    // Select a filter by index
    cy.get(filterPanel.selectors.FILTER_CHECKBOX).its('length').then(qtyOfCheckboxes => {
      // Select index of a filter
      indexOfFilter = toolbox.generateRandomNumber(0, qtyOfCheckboxes - 1);

      //extract filter label by index
      filterPanel.getLabelOfFilterByIndex(indexOfFilter).then(labelOfFilter => {
        //select filter by index
        filterPanel.selectFilterByIndex(indexOfFilter).then($filterResult => {
          const numberOfCardsFiltered = $filterResult.find(cardContainer.selectors.CARD).length;

          if (numberOfCardsFiltered) {
            const indexOfCard = toolbox.generateRandomNumber(0, numberOfCardsFiltered - 1);

            // Open tool details page
            cy.getElementByIndex(cardContainer.selectors.CARD, indexOfCard).click();

            // Verify the filter label is shown
            cy.waitUntilTextToBeVisible(toolDetails.selectors.BADGE, labelOfFilter, 15000);
          } else {
            cy.get(cardContainer.selectors.NO_RESULTS_FILTERED).should('be.visible');
          }
        });
      });
    });
  });
});
