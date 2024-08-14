const LoginFormRepository = require("../repositories/LoginFormRepository.js");
const HomePageRepository = require("../repositories/HomePageRepository.js");

const repoLoginForm = new LoginFormRepository();
const repoHomePage = new HomePageRepository();

class LoginAction {
  doLogin(username, password) {
    repoLoginForm.getUsernameField().type(username);
    repoLoginForm.getPasswordField().type(password);
    repoLoginForm.getSubmitButton().click();
  }

  doLogout() {
    repoHomePage.getLogOutButton().click();
  }
}

module.exports = LoginAction;
