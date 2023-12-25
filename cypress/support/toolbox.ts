import { Chance } from 'chance';
const chance = new Chance();


export function getCurrentUrl(): Cypress.Chainable<string> {
    return cy.url();
}

export function generateRandomString(): string {
    return chance.string();
}

export function generateRandomNumber(minNum: number, maxNum: number): number {
    return  chance.integer({ min: minNum, max: maxNum });
}