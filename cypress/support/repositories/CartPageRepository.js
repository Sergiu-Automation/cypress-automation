class CartPageRepository {
  getPlaceOrderButton() {
    return cy.get("[data-target='#orderModal']");
  }

  getListOfDevices() {
    return cy.get("#page-wrapper #tbodyid > tr");
  }
  getUserNameInput() {
    return cy.get("#name");
  }
  getUserCountryInput() {
    return cy.get("#country");
  }
  getUserCityInput() {
    return cy.get("#city");
  }
  getUserCreditCardInput() {
    return cy.get("#card");
  }
  getUserMonthInput() {
    return cy.get("#month");
  }
  getUserYearInput() {
    return cy.get("#year");
  }
  getPurchaseButton() {
    return cy.get("#orderModal .btn-primary");
  }
  getSweetAlertMessage() {
    return cy.get(".sweet-alert h2");
  }
  getPurchaseInfo() {
    return cy.get(".sweet-alert p");
  }
  getSweetAlertConfirmButton() {
    return cy.get(".sweet-alert .confirm");
  }
}

module.exports = CartPageRepository;
