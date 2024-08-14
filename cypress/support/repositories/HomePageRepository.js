class HomePageRepository {
  getLoginFormButton() {
    return cy.get("#login2");
  }
  getLogOutButton() {
    return cy.get("#logout2");
  }
  getSignUpFormButton() {
    return cy.get("#signin2");
  }

  getCartButton() {
    return cy.get("#cartur");
  }
  getHomeButton() {
    return cy.get("li [href='index.html']");
  }

  getCategories() {
    return cy.get(".list-group > a:not(#cat)");
  }

  getDevices() {
    return cy.get(".container #tbodyid > div");
  }

  getUserName() {
    return cy.get("#nameofuser");
  }
}

module.exports = HomePageRepository;
