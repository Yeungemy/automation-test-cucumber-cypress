import { homePage } from "./home.page";

class CardContainer{
    get selectors(): any {
        return {
            CARD: " .card"
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