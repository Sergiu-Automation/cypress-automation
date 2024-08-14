const CartPageRepository = require("../repositories/CartPageRepository");

const repoCartPage = new CartPageRepository();

class CartAction {
  /**
   *
   * @param {*} device
   */
  clickOnPlaceOrderButton() {
    repoCartPage
      .getPlaceOrderButton()
      .click()
      .should("have.text", "Place Order");
  }

  /**
   *
   * @param {int} count
   */
  checkDevicesCount(count) {
    repoCartPage.getListOfDevices().should("have.length", count);
  }

  /**
   *
   * @param {*} device
   * @param {string} parameter
   * @return {string}
   */
  getDeviceParameter(device, parameter) {
    if (parameter === "name") {
      return device.find("td").eq(1).invoke("text");
    } else if (parameter === "price") {
      return device.find("td").eq(2).invoke("text");
    } else {
      return "Invalid parameter";
    }
  }

  /**
   *
   * @param {*} device
   */
  clickOnRemoveButton(device) {
    device.find("td").eq(3).find("a").click();
  }

  /**
   * @param {object} user
   */
  doPlaceOrder(user) {
    cy.wait(1000);
    repoCartPage.getUserNameInput().type(user.name);
    repoCartPage.getUserCountryInput().type(user.country);
    repoCartPage.getUserCityInput().type(user.city);
    repoCartPage.getUserCreditCardInput().type(user.creditCard);
    repoCartPage.getUserMonthInput().type(user.month);
    repoCartPage.getUserYearInput().type(user.year);
    repoCartPage.getPurchaseButton().click();
  }

  /**
   * @param {object} user
   */
  checkPurchaseInfo(user, devicePrice) {
    repoCartPage
      .getSweetAlertMessage()
      .should("have.text", "Thank you for your purchase!");
    repoCartPage.getPurchaseInfo().then((info) => {
      expect(info.text()).to.contain(user.name);
      expect(info.text()).to.contain(user.creditCard);
      expect(info.text()).to.contain(devicePrice + " USD");
    });
    repoCartPage.getSweetAlertConfirmButton().click();
  }
}

module.exports = CartAction;
