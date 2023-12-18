class Pagination{
    get selectors(): any {
        return {
            PAGE_LINK: ".page-link"
        };
    }

    get strings(): any {
        return {

        };
    }

    get allPageLinks(): Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(this.selectors.PAGE_LINK);
    }
}
const pagination = new Pagination();
export {pagination};