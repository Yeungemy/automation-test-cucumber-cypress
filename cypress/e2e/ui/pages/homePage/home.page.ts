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

  getProductMap(): Cypress.Chainable<{ [key: string]: number }> {
    const productMap: { [key: string]: number } = {};

    return cy.get(card.selectors.CARD_TITLE).each(($title, index) => {
      const productName = $title.text().trim();

      cy.get(card.selectors.CARD_PRICE).eq(index).then(($price) => {
        const productPrice = parseFloat($price.text().replace('$', '').trim());

        productMap[productName] = productPrice;
      });
    }).then(() => productMap);
  }

  getProductListOfCurrentPage(): Cypress.Chainable<{ name: string; price: number }[]> {
    // Use getProductMap internally to build the product list
    return this.getProductMap().then((productMap) => {
      const products: { name: string; price: number }[] = [];

      // Iterate through each product in the map and add it to the list
      Object.keys(productMap).forEach((productName) => {
        const productPrice = productMap[productName];
        products.push({ name: productName, price: productPrice });
      });

      return products;
    });
  }

  getProductList(): Cypress.Chainable<{ name: string; price: number }[]> {
    const products: { name: string; price: number }[] = [];

    // Get the total number of pages
    return cy.get(pagination.selectors.PAGE_LINK).its('length').then((totalPages) => {
      // Use Promise.all to handle concurrency when fetching tools from multiple pages
      const fetchPagePromises = [];

      // Iterate through each page
      for (let index = 1; index <= totalPages && index <= 3; index++) {
        fetchPagePromises.push(
          cy.get(pagination.selectors.PAGE_LINK).eq(index).click().wait(1000).then(() => {
            // Get products of the current page using getProductListOfCurrentPage
            return this.getProductListOfCurrentPage().then((productsOfCurrentPage) => {
              // Add products of the current page to the main products array
              products.push(...productsOfCurrentPage);
            });
          })
        );
      }

      // Resolve with the combined products array after fetching products from all pages
      return Promise.all(fetchPagePromises).then(() => products);
    });
  }
}

const homePage = new HomePage();
export { homePage };
