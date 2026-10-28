import selectors from "../fixtures/selectors.json";

describe("Main page test suit", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should display the page header title", () => {
    cy.get(selectors.mainPage.title)
      .should("be.visible")
      .and("have.text", "Идёмвкино");
  });

  it("Should display 7 days in the navigation bar", () => {
    cy.get(selectors.mainPage.days)
      .should("be.visible")
      .and("have.length", 7);
  });
});