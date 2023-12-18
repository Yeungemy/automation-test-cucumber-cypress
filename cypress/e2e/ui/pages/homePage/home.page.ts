class HomePage{
    get selectors(): any {
        return {
            NAVBAR: ".navbar",
            LEAD_IMAG: ".jumbotron",
            FILTER_PANEL: "#filters",
            CARD_CONTAINER: ".container",
            PAGINATION: ".pagination",
            FOOTER: "app-footer"
        };
    }

    get strings(): any {
        return {

        };
    }

    get navbar(): Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(this.selectors.NAVBAR);
    }

    get leadImage(): Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(this.selectors.LEAD_IMAG);
    }

    get cardContainer(): Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(this.selectors.CARD_CONTAINER);
    }

    get pagination(): Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(this.selectors.PAGINATION);
    }

    get footer(): Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(this.selectors.FOOTER);
    }

    get filterPanel(): Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(this.selectors.FILTER_PANEL);
    }
}
const homePage = new HomePage();
export {homePage};