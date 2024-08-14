const SignUpFormRepository = require("../repositories/SignUpFormRepository");

const repoSignUpForm = new SignUpFormRepository();

class SignUpAction {
  doSignUp(username, password) {
    repoSignUpForm.getUsernameField().type(username);
    repoSignUpForm.getPasswordField().type(password);
    repoSignUpForm.getSubmitButton().click();
  }
}

module.exports = SignUpAction;
