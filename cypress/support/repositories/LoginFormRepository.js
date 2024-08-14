class LoginFormRepository {
  getUsernameField() {
    return cy.get("#loginusername");
  }

  getPasswordField() {
    return cy.get("#loginpassword");
  }

  getSubmitButton() {
    return cy.get("#logInModal .btn-primary");
  }
}

module.exports = LoginFormRepository;
