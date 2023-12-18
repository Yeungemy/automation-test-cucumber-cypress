import { pagination } from "../../../pages/homePage/pagination.section";
import * as PAGINATION from "../../../../data/Pagination";

describe("Pangination", () => {
    const activePageNo = 1;

    beforeEach(() => {
        cy.visit(Cypress.env('url'));
    });

    it("Should be able to see all labels of pagination", () => {
        pagination.allPageLinks.each(($pageLink, index) => {
            let expectedResult = " ";
            console.log("Index: " + index);
            console.log(expectedResult);

            //determine the expected result
            if (index > 0 && index < 4) {
                expectedResult = index.toString();
            } else {
                expectedResult = index > 0 ? Object.values(PAGINATION.PAGINATION)[1] : Object.values(PAGINATION.PAGINATION)[0];
            }

            //verify each label of page item
            cy.wrap($pageLink).should('contain.text', expectedResult);
        });
    });

    it("Should see inactive previous icon if it is on the page one", () => {
        // find and filter the active page
        pagination.activePageLink.should('have.length', 1).and('contain.text', activePageNo.toString());

        // verify the previous page link is inactive
        pagination.getPageLinkByIndex().should('have.class', 'disabled');

        // verify the next page link is active
        pagination.getPageLinkByIndex(4).should('not.have.class', 'disabled');
    });

    it("Should be able to navigate to a new page", () => {
        //verify current active page
        pagination.activePageLink.should('have.length', 1).and('contain.text', activePageNo.toString());

        //navigate to next page
        pagination.getPageLinkByIndex(4).click();

        //verify current active page
        pagination.activePageLink.should('have.length', 1).and('not.contain.text', activePageNo.toString()).and('contain.text', (activePageNo + 1).toString());
    });
});