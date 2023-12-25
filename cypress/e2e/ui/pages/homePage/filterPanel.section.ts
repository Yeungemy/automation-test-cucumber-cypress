import { cardContainer } from "./carContainer.section";

class FilterPanel {
    get selectors(): any {
        return {
            GRID_TITLE: ".grid-title",
            SORT_FORM_SELECT: ".form-select",
            SLIDER_POINTER_MIN: ".ngx-slider-pointer-min",
            SLIDER_POINTER_MAX: ".ngx-slider-pointer-max",
            SEARCH_INPUT_FIELD: '[data-test="search-query"]',
            SEARCH_RESET_BUTTON: '[data-test="search-reset"]',
            SEARCH_SUBMIT_BUTTON: '[data-test="search-submit"]',
            FILTER_CHECKBOX: 'input.icheck',
        };
    }

    get strings(): any {
        return {
            SORT_BY_NAME_DESC_OPTION: "name,desc",
            SORT_BY_NAME_ASC_OPTION: "name,asc",
            SORT_BY_PRICE_DESC_OPTION: "price,desc",
            SORT_BY_PRICE_ASC_OPTION: "price,asc"
        };
    }

    get allGridTitles(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.selectors.GRID_TITLE);
    }

    clearSearchInputField(): void {
        cy.get(this.selectors.SEARCH_RESET_BUTTON).click();
    }

    clickSearchBtn(): void {
        cy.get(this.selectors.SEARCH_SUBMIT_BUTTON).click();
    }

    search(toolName: string): void {
        cy.fillInputField(this.selectors.SEARCH_INPUT_FIELD, toolName);
        this.clickSearchBtn();
        cy.get('h3', { timeout: 10000 }).should('have.text', `Searched for: ${toolName}`);
    }

    selectFilterByIndex(indexOfFilter: number = 0): Cypress.Chainable<JQuery<HTMLElement>> {
        cy.getElementByIndex(filterPanel.selectors.FILTER_CHECKBOX, indexOfFilter).click();
        return cy.waitToBeVisible(cardContainer.selectors.FILTER_COMPLETED_STATUS, 30000)
    }

    getLabelOfFilterByIndex(indexOfFilter: number = 0): Cypress.Chainable<string>{
        return  cy.getElementByIndex(filterPanel.selectors.FILTER_CHECKBOX, indexOfFilter).parents('label').invoke('text');
    }
}
const filterPanel = new FilterPanel();
export { filterPanel };