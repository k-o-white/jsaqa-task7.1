import selectors from "../fixtures/selectors.json";
import loginData from "../fixtures/login-data.json";

describe("Booking tickets", () => {
  it("Successfully books first three seats in third row", () => {
    cy.visit("/admin/");
    cy.login(
      loginData.right.login, 
      loginData.right.password, 
      selectors.admin.email, 
      selectors.admin.password, 
      selectors.admin.submit
    );
    let movieName;
    cy.get(selectors.admin.movie)
      .find(selectors.admin.movieTitle)
      .invoke("text")
      .then((text) => {
        movieName = text.trim();
      });
    cy.visit("/");
    cy.get(selectors.mainPage.thirdDay).click();
    cy.then(() => {
      cy.contains(selectors.mainPage.movieObject, movieName)
        .contains(selectors.mainPage.time)
        .click();
    });
    const seats = require("../fixtures/seats.json");
    seats.forEach((seat) => {
      cy.get(
        `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
      ).click();
    });
    cy.get(selectors.bookingPage.bookButton).click();
    cy.contains(selectors.paymentPage.paymentHeader).should("be.visible");
    const expectedSeats = seats
      .map(seat => `${seat.row}/${seat.seat}`)
      .join(", ");
    cy.get(selectors.paymentPage.chairs).should("have.text", expectedSeats);
  });
});
