class SignUpFormRepository {
  getUsernameField() {
    return cy.get("#sign-username");
  }

  getPasswordField() {
    return cy.get("#sign-password");
  }

  getSubmitButton() {
    return cy.get("#signInModal .btn-primary");
  }
}

module.exports = SignUpFormRepository;
