import { card } from "./card.section";
import { pagination } from "./pagination.section";

class HomePage {
  get selectors(): any {
    return {
      NAVBAR: ".navbar",
      LEAD_IMAGE: ".jumbotron",
      FILTER_PANEL: "#filters",
      CARD_CONTAINER: ".container",
      PAGINATION: ".pagination",
      FOOTER: "app-footer",
    };
  }

  get strings(): any {
    return {};
  }

  get navbar(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.NAVBAR);
  }

  get leadImage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.LEAD_IMAGE);
  }

  get cardContainer(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.CARD_CONTAINER);
  }

  get pagination(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.PAGINATION);
  }

  get footer(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.FOOTER);
  }

  get filterPanel(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.FILTER_PANEL);
  }

  getAllToolsOfCurrentPage(): Cypress.Chainable<string[]> {
    const tools: string[] = [];

    return cy.get(card.selectors.CARD_TITLE).each($cardTitle => {
      cy.wrap($cardTitle).invoke('text').then((text) => {
        tools.push(text.toString().trim());
      });
    }).then(() => tools);
  }

  getAllTools(): Cypress.Chainable<string[]> {
    const tools: string[] = [];

    // Get the total number of pages
    return cy.get(pagination.selectors.PAGE_LINK).its('length').then((totalPages) => {
      // Use Promise.all to handle concurrency when fetching tools from multiple pages
      const fetchPagePromises = [];

      // Iterate through each page
      for (let index = 1; index <= totalPages && index <= 3; index++) {
        fetchPagePromises.push(
          cy.get(pagination.selectors.PAGE_LINK).eq(index).click().wait(1000).then(() => {
            // Get tools of the current page using getAllToolsOfCurrentPage
            return this.getAllToolsOfCurrentPage().then((toolsOfCurrentPage) => {
              // Add tools of the current page to the main tools array
              tools.push(...toolsOfCurrentPage);
            });
          })
        );
      }

      // Resolve with the combined tools array after fetching tools from all pages
      return Promise.all(fetchPagePromises).then(() => tools);
    });
  }
}

const homePage = new HomePage();
export { homePage };
