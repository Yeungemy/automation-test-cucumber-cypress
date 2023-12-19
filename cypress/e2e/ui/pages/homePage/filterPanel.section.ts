class FilterPanel{
    get selectors(): any {
        return {
            GRID_TITLE: ".grid-title",
            SORT_FORM_SELECT: ".form-select",
            SLIDER_POINTER_MIN: ".ngx-slider-pointer-min",
            SLIDER_POINTER_MAX: ".ngx-slider-pointer-max",
            SEARCH_INPUT_FIELD: '[data-test="search-query"]',
            SEARCH_RESET_BUTTON: '[data-test="search-reset"]',
            SEARCH_SUBMIT_BUTTON: '[data-test="search-submit"]',
            SEARCH_WITH_NO_RESULTS: '[data-test="no-results"]'
        };
    }

    get strings(): any {
        return {
            SORT_FORM_SELECT_DESC_OPTION: "name,desc"
        };
    }

    get allGridTitles(): Cypress.Chainable<JQuery<HTMLElement>>{
        return cy.get(this.selectors.GRID_TITLE);
    }

    clearSearchInputField(): void{
        cy.get(this.selectors.SEARCH_RESET_BUTTON).click();
    }

    clickSearchBtn(): void{
        cy.get(this.selectors.SEARCH_SUBMIT_BUTTON).click();
    }

    search(toolName: string): void{
        cy.fillInputField(this.selectors.SEARCH_INPUT_FIELD, toolName);
        this.clickSearchBtn();
        cy.get('h3', { timeout: 10000 }).should('have.text', `Searched for: ${toolName}`);
    }
}
const filterPanel = new FilterPanel();
export {filterPanel};