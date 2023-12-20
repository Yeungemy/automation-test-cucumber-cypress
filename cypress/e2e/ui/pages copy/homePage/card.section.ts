class Card{
    get selectors(): any {
        return {
            CARD_IMAGE: ".card-img-top",
            CARD_TITLE: '[data-test="product-name"]',
            CARD_PRICE: ".card-footer .float-end"
        };
    }

    get strings(): any {
        return {

        };
    }

    get cardImage(): Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(this.selectors.CARD_IMAGE);
    }

    get cardTitle(): Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(this.selectors.CARD_TITLE);
    }

    get cardPrice(): Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(this.selectors.CARD_PRICE);
    }
}
const card = new Card();
export {card};