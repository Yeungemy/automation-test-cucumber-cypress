class FilterPanel{
    get selectors(): any {
        return {
            GRID_TITLE: ".grid-title",
            SORT_FORM_SELECT: ".form-select",
            SLIDER_POINTER_MIN: ".ngx-slider-pointer-min",
            SLIDER_POINTER_MAX: ".ngx-slider-pointer-max"
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
}
const filterPanel = new FilterPanel();
export {filterPanel};