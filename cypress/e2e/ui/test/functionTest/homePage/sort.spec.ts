import { filterPanel } from "../../../pages/homePage/filterPanel.section";
import { homePage } from "../../../pages/homePage/home.page";

describe("Sort on Filter Panel", () => {
    let actualToolNames: string[];
    let sortedNames: string[];
    let expectToolNames: string[];

    const sortAndVerify = (sortedNames: string[], sortOption: string, sortOrder: "asc" | "desc", numberOfItems: number) => {
        // Sort tools based on the provided order
        expectToolNames = sortOrder === "desc" ? sortedNames.sort().reverse().slice(0, numberOfItems) : sortedNames.sort().slice(0, numberOfItems);

        // Sort all tools by specified order
        cy.selectOptionFromDropdown(
            filterPanel.selectors.SORT_FORM_SELECT,
            sortOption
        );

        // Use getAllToolsOfCurrentPage to get tools from the current page
        homePage.getAllToolsOfCurrentPage().then((actualToolNames) => {
            // Verify the result as expected
            expect(actualToolNames).to.deep.equal(expectToolNames);
        });
    };

    before(() => {
        cy.visit(Cypress.env('url'));

        homePage.getAllTools().then((tools) => {
            sortedNames = tools.sort();
        });
    });

    beforeEach(() => {
        cy.visit(Cypress.env('url'));
        // Initialize arrays
        actualToolNames = [];
        expectToolNames = [];
    });

    it("should sort tools alphabetically in descending order", () => {
        sortAndVerify(sortedNames, filterPanel.strings.SORT_FORM_SELECT_DESC_OPTION, "desc", 9);
    });

    it("should sort tools alphabetically in ascending order", () => {
        sortAndVerify(sortedNames, filterPanel.strings.SORT_FORM_SELECT_ASC_OPTION, "asc", 9);
    });
});
