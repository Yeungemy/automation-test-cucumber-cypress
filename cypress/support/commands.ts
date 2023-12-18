// cypress/support/commands.ts

declare namespace Cypress {
    interface Chainable {
        customCommand(one: string, two: string, ...args: string[]): Chainable<void>;
        getElementByIndex(selector: string, targetIndex: number): Chainable<JQuery<HTMLElement>>;
    }
}

Cypress.Commands.add('getElementByIndex', (selector: string, targetIndex: number = 0): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.get(`${selector}:nth-child(${targetIndex + 1})`);
});

Cypress.Commands.add('customCommand', (one: string, two: string, ...args: string[]): void => {
    cy.log('this is a message from cy custom command');
    cy.log(one);
    cy.log(two);
    args.forEach((arg) => {
        cy.log(arg);
    });
});
