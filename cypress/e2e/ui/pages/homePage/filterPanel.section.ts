class FilterPanel{
    get selectors(): any {
        return {
            GRID_TITLE: ".grid-title"
        };
    }

    get strings(): any {
        return {

        };
    }

    get allGridTitles(): Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(this.selectors.GRID_TITLE);
    }
}
const filterPanel = new FilterPanel();
export {filterPanel};