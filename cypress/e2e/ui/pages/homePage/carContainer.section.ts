import { homePage } from "./home.page";

class CardContainer{
    get selectors(): any {
        return {
            CARD: 'a.card',
            FILTER_COMPLETED_STATUS: '[data-test="filter_completed"]',
            NO_RESULTS_FILTERED: '[data-test="no-results"]'
        };
    }

    get strings(): any {
        return {

        };
    }

    get allCards(): Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(homePage.selectors.CARD_CONTAINER).find(this.selectors.CARD);
    }
}
const cardContainer = new CardContainer();
export {cardContainer};