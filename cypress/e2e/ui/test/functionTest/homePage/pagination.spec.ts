import { pagination } from "../../../pages/homePage/pagination.section";
import * as PAGINATION from "../../../../data/Pagination";

describe("Pangination", () => {
    beforeEach(() => {
        cy.visit(Cypress.env('url')); 
    });

    it("Should be able navigate by pagination", () => {
        pagination.allPageLinks.each(($pageLink, index) => {
            let expectedResult = " ";
            console.log("Index: " + index);
            console.log(expectedResult);

            if(index > 0 && index < 4){
                expectedResult = index.toString();
            }else{
                expectedResult = index > 0? Object.values(PAGINATION.PAGINATION)[1] : Object.values(PAGINATION.PAGINATION)[0];
            }

            cy.wrap($pageLink).should('contain.text', expectedResult);
        });
    });
});