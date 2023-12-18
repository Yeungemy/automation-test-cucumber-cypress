import { cardContainer } from "../../../pages/homePage/carContainer.section";
import { card } from "../../../pages/homePage/card.section";

describe("Card", () => {
    beforeEach(() => {
        cy.visit(Cypress.env('url')); 
    });

    it("should be able to show a card properly", () => {
        cardContainer.allCards.first().within(() => {
            card.cardImage.should("be.visible");
            card.cardTitle.should("be.visible");
            card.cardPrice.should("be.visible");
        });
    });
});