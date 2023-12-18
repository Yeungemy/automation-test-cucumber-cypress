class Pagination{
    get selectors(): any {
        return {
            PAGE_LINK: ".page-link",
            ACTIVE_PAGE_LINK: ".active",
            PAGE_ITEM: ".page-item"
        };
    }

    get strings(): any {
        return {

        };
    }

    get allPageLinks(): Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(this.selectors.PAGE_LINK);
    }

    get activePageLink(): Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(this.selectors.PAGE_ITEM).filter(this.selectors.ACTIVE_PAGE_LINK);
    }

    getPageLinkByIndex(index: number = 0): Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.getElementByIndex(this.selectors.PAGE_ITEM, index);
    }
}
const pagination = new Pagination();
export {pagination};