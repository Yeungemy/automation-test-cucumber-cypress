import { pagination } from "../../../pages/homePage/pagination.section";
import * as PAGINATION from "../../../../data/Pagination";

describe("Pangination", () => {
    const activePageNo = 1;
    const indexOfMinPageNo = 0;
    const indexOfMaxPageNo = 4;
    let indexOfPaginationIcon: number = 0;

    beforeEach(() => {
        cy.visit(Cypress.env('url'));
    });

    it("Should be able to see all labels of pagination", () => {
        pagination.allPageLinks.each(($pageLink, index) => {
            let expectedResult = " ";
            console.log("Index: " + index);
            console.log(expectedResult);

            //determine the expected result
            if (index > indexOfMinPageNo && index < indexOfMaxPageNo) {
                expectedResult = index.toString();
            } else {
                expectedResult = index > 0 ? Object.values(PAGINATION.PAGINATION)[1] : Object.values(PAGINATION.PAGINATION)[0];
            }

            //verify each label of page item
            cy.wrap($pageLink).should('contain.text', expectedResult);
        });
    });

    it("Should see inactive previous icon if it is on the page one", () => {
        indexOfPaginationIcon = 4; 

        // find and filter the active page
        pagination.activePageLink.should('have.length', 1).and('contain.text', activePageNo.toString());

        // verify the previous page link is inactive
        pagination.getPageLinkByIndex().should('have.class', 'disabled');

        // verify the next page link is active
        pagination.getPageLinkByIndex(indexOfPaginationIcon).should('not.have.class', 'disabled');
    });

    it("Should be able to navigate to a new page by clicking next icon", () => {
        indexOfPaginationIcon = 4; 

        //verify current active page
        pagination.activePageLink.should('have.length', activePageNo).and('contain.text', activePageNo.toString());

        //navigate to next page
        pagination.getPageLinkByIndex(indexOfPaginationIcon).click();

        //verify current active page
        pagination.activePageLink.should('have.length', activePageNo).and('not.contain.text', activePageNo.toString()).and('contain.text', (activePageNo + 1).toString());
    });

    it("Should be able to navigate to a new page by clicking number icon", () => {
        indexOfPaginationIcon = 3; 

        //verify current active page
        pagination.activePageLink.should('have.length', activePageNo).and('contain.text', activePageNo.toString());

        //navigate to next page
        pagination.getPageLinkByIndex(indexOfPaginationIcon).click();

        //verify current active page
        pagination.activePageLink.should('have.length', activePageNo).and('not.contain.text', activePageNo.toString()).and('contain.text', indexOfPaginationIcon.toString());
    });
});