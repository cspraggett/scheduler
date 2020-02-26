import { CYCLIC_KEY } from "@storybook/addon-actions/dist/constants"

describe("Naviagation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected")
    // .should("have.css", "day-list__item--selected", "rgb(242, 242, 242)");
  }) 
});