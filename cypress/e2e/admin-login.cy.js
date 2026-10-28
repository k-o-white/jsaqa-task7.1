import selectors from "../fixtures/selectors.json";
import loginData from "../fixtures/login-data.json";

describe("Autorization to admin panel", () => {
  beforeEach(() => {
    cy.visit("/admin/");
  });

  it("Successful authorization", () => {
    cy.login(
      loginData.right.login, 
      loginData.right.password, 
      selectors.admin.email, 
      selectors.admin.password, 
      selectors.admin.submit
  );
    cy.get(selectors.admin.panelTitle)
      .first()
      .should("be.visible")
      .and("have.text", selectors.admin.panelTitleText);
  });

  it("Unsuccessful authorization", () => {
    cy.login(
      loginData.wrong.login, 
      loginData.wrong.password, 
      selectors.admin.email, 
      selectors.admin.password, 
      selectors.admin.submit
    );
    cy.contains(selectors.admin.errorText).should("be.visible");
  });
});