const { serUserName, serPassword } = require("../../fixtures/credentials.json");
const LoginAction = require("../../support/actions/LoginAction.js");
const HomePageAction = require("../../support/actions/HomePageAction.js");

const login = new LoginAction();
const home = new HomePageAction();

describe("Login functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    home.openForm("Log in");
    login.doLogin(serUserName, serPassword);
    home.userNameIs("visible");
  });

  it("should log out from application", () => {
    login.doLogout();
    home.userNameIs("not visible");
  });
});
