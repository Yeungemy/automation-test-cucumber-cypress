// cypress/support/commands.ts

declare namespace Cypress {
    interface Chainable {
        customCommand(one: string, two: string, ...args: string[]): Chainable<void>;
        getElementByIndex(selector: string, targetIndex: number): Cypress.Chainable<JQuery<HTMLElement>>;
        selectOptionFromDropdown(dropdownSelector: string, option: string): void;
        selectHandleValue(handleSelector: string, value: number): void;
        moveSliderHandle(selector: string, targetValue: number, direction: string, steps: number): void;
        getElementByTestId(testId: string): Chainable<Element>;
        fillInputField(selector: string, content: string): void;
        waitToBeVisible(selector: string, timeout: number): Cypress.Chainable<JQuery<HTMLElement>>;
        waitUntilTextToBeVisible(selector: string, text: string, timeout: number): Cypress.Chainable<JQuery<HTMLElement>>
    }
}

Cypress.Commands.add('getElementByTestId', (testId: string): any => {
    return cy.get(`[data-test="${testId}"]`);
});

Cypress.Commands.add('getElementByIndex', (selector: string, targetIndex: number = 0): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.get(selector).should('be.visible', { timeout: 15000 }).eq(targetIndex);
});

Cypress.Commands.add('fillInputField', (selector: string, content: string): void => {
    cy.get(selector).click().type('{selectall}').clear().type(content).should('contain.value', content);
});

Cypress.Commands.add('selectOptionFromDropdown', (dropdownSelector: string, option: string): void => {
    cy.get(dropdownSelector).select(option);
    cy.get(dropdownSelector).should('have.value', option);
    cy.wait(1000);
});

Cypress.Commands.add('selectHandleValue', (handleSelector: string, value: number): void => {
    cy.get(handleSelector).invoke('val', value).trigger('input');
});

Cypress.Commands.add('moveSliderHandle', (selector: string, targetValue: number, direction: string = 'right', step: number = 1): void => {
    const steps: number = direction === 'right' ? Math.floor(targetValue / step) : Math.ceil(targetValue / step);

    if (direction === 'right') {
        cy.get(selector).type(`{rightarrow}`.repeat(steps), { delay: 50, force: true });
    } else if (direction === 'left') {
        cy.get(selector).type(`{leftarrow}`.repeat(steps), { delay: 50, force: true });
    }
});

Cypress.Commands.add('waitToBeVisible', (selector: string, timeout: number = 5000): Cypress.Chainable<JQuery<HTMLElement>> => {
    return cy.get(selector).should('be.visible', { timeout });
});

Cypress.Commands.add('waitUntilTextToBeVisible', (selector: string, text: string, timeout: number = 5000): Cypress.Chainable<JQuery<HTMLElement>> => {
    const contents = [];
    return cy.get(selector, { timeout })
        .should('be.visible')
        .each($ele => {
            cy.wrap($ele)
                .invoke('text')
                .then(content => {
                    if (content.toString().trim().indexOf(text) >= 0) {
                        console.log(content.toString().trim().indexOf(text));
                        return $ele;
                    }
                });
        });
});

