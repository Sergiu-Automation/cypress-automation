import { faker } from "@faker-js/faker";
const SignUpAction = require("../../support/actions/SignUpAction");
const LoginAction = require("../../support/actions/LoginAction");
const HomePageAction = require("../../support/actions/HomePageAction");

const signUp = new SignUpAction();
const login = new LoginAction();
const home = new HomePageAction();

let userName;
let password;

describe("Sign up functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    home.openForm("Sign up");
    userName = faker.person.firstName();
    password = faker.internet.password();
  });

  it("should sign up with valid credentials", () => {
    signUp.doSignUp(userName, password);
    cy.checkAlertMessage("Sign up successful.");
    home.openForm("Log in");
    login.doLogin(userName, password);
    cy.get("#nameofuser").should("have.text", `Welcome ${userName}`);
  });

  it("shouldn't sign up with empty login or password", () => {
    signUp.doSignUp(null, password);
    cy.checkAlertMessage("Please fill out Username and Password.");
    cy.reload();
    home.openForm("Sign up");
    signUp.doSignUp(userName, null);
    cy.checkAlertMessage("Please fill out Username and Password.");
  });
});
