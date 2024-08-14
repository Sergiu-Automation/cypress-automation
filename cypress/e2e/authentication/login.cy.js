const { serUserName, serPassword } = require("../../fixtures/credentials.json");
const LoginAction = require("../../support/actions/LoginAction.js");
const HomePageAction = require("../../support/actions/HomePageAction.js");

const login = new LoginAction();
const home = new HomePageAction();

describe("Login functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    home.openForm("Log in");
  });

  it("should login with valid credentials", () => {
    login.doLogin(serUserName, serPassword);
    home.userNameIs("visible");
  });

  it("shouldn't login with invalid credentials", () => {
    login.doLogin("ser", "Cc12345678!");
    cy.checkAlertMessage("Wrong password.");
  });

  it("shouldn't login with empty login or password", () => {
    login.doLogin(null, serPassword);
    cy.checkAlertMessage("Please fill out Username and Password.");
    cy.reload();
    home.openForm("Log in");
    login.doLogin(serUserName, null);
    cy.checkAlertMessage("Please fill out Username and Password.");
  });
});
