import { filterPanel } from "../../../pages/homePage/filterPanel.section";
import { homePage } from "../../../pages/homePage/home.page";

describe("Sort by Name of Tools on Filter Panel", () => {
  let actualProducts: { name: string; price: number }[];
  let sortedProducts: { name: string; price: number }[];
  let expectProducts: { name: string; price: number }[];

  const sortAndVerify = (sortedProducts: { name: string; price: number }[], sortOption: string, sortOrder: "asc" | "desc", numberOfItems: number) => {
    // Sort products based on the provided order
    expectProducts = sortOrder === "desc" ? sortedProducts.sort((a, b) => b.name.localeCompare(a.name)).slice(0, numberOfItems) : sortedProducts.sort((a, b) => a.name.localeCompare(b.name)).slice(0, numberOfItems);

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

  it("should sort tools alphabetically in descending order", () => {
    sortAndVerify(sortedProducts, filterPanel.strings.SORT_BY_NAME_DESC_OPTION, "desc", 9);
  });

  it("should sort tools alphabetically in ascending order", () => {
    sortAndVerify(sortedProducts, filterPanel.strings.SORT_BY_NAME_ASC_OPTION, "asc", 9);
  });
});
