import { cardContainer } from "../../../pages/homePage/carContainer.section";

describe("Cards Container", () => {
    const numberOfCards = 9;

    beforeEach(() => {
        cy.visit(Cypress.env('url'));
    });

    it("Should be able to see a container of cards", () => {
        cardContainer.allCards.its('length').should("be.gte", numberOfCards)
    });
});