import { filterPanel } from "../../../pages/homePage/filterPanel.section";
import { homePage } from "../../../pages/homePage/home.page";

describe("Sort by Price of Tools on Filter Panel", () => {
  let actualProducts: { name: string; price: number }[];
  let sortedProducts: { name: string; price: number }[];
  let expectProducts: { name: string; price: number }[];

  const sortAndVerify = (sortedProducts: { name: string; price: number }[], sortOption: string, sortOrder: "asc" | "desc", numberOfItems: number) => {
    // Sort products based on the provided order
    expectProducts = sortOrder === "desc" ? sortedProducts.sort((a, b) => b.price - a.price).slice(0, numberOfItems) : sortedProducts.sort((a, b) => a.price - b.price).slice(0, numberOfItems);

    // Sort all tools by specified order
    cy.selectOptionFromDropdown(
      filterPanel.selectors.SORT_FORM_SELECT,
      sortOption
    );

    // Use getProductList to get products from the current page
    homePage.getProductListOfCurrentPage().then((actualProducts) => {
      // Verify the result as expected
      expect(actualProducts).to.deep.equal(expectProducts);
    });
  };

  before(() => {
    cy.visit(Cypress.env('url'));

    homePage.getProductList().then((products) => {
      sortedProducts = products;
    });
  });

  beforeEach(() => {
    cy.visit(Cypress.env('url'));
    // Initialize arrays
    actualProducts = [];
    expectProducts = [];
  });

  it("should sort tools by price in descending order", () => {
    sortAndVerify(sortedProducts, filterPanel.strings.SORT_BY_PRICE_DESC_OPTION, "desc", 9);
  });

  it("should sort tools by price in ascending order", () => {
    sortAndVerify(sortedProducts, filterPanel.strings.SORT_BY_PRICE_ASC_OPTION, "asc", 9);
  });
});
