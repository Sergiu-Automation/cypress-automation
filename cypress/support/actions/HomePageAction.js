const HomePageRepository = require("../repositories/HomePageRepository");
const DevicePageRepository = require("../repositories/DevicePageRepository");

const repoHomePage = new HomePageRepository();
const repoDevicePage = new DevicePageRepository();

class HomePageAction {
  checkCategoriesCount(count) {
    repoHomePage.getCategories().should("have.length", count);
  }

  /**
   *
   * @param {*} category
   * @param {*} count
   */
  checkDevicesCountByCategory(category, count) {
    this.clickOnCategory(category);
    repoHomePage.getDevices().should("have.length", count);
  }

  /**
   *
   * @param {*} category
   */
  clickOnCategory(category) {
    try {
      repoHomePage.getCategories().contains(category).click();
    } catch (error) {
      throw new Error("Invalid category");
    }
    cy.wait(1500);
  }

  /**
   *
   * @param {*} device
   */
  clickOnDevice(device) {
    device.click();
  }

  /**
   *
   * @param {*} device
   * @return {string}
   */
  getDeviceName(device) {
    return device.find("h4").text();
  }

  /**
   *
   * @param {*} device
   * @returns
   */
  getDevicePrice(device) {
    return device.find("h5").text();
  }

  /**
   *
   * @param {string} form
   */
  openForm(form) {
    if (form === "Log in") {
      repoHomePage.getLoginFormButton().click().should("have.text", form);
    } else if (form === "Sign up") {
      repoHomePage.getSignUpFormButton().click().should("have.text", form);
    } else {
      throw new Error("Invalid form");
    }
  }

  /**
   *
   * @param {string} page
   */
  open(page) {
    if (page === "Cart") {
      repoHomePage.getCartButton().click();
    } else if (page === "Home") {
      repoHomePage.getHomeButton().click();
    } else {
      throw new Error("Invalid page");
    }
  }

  /**
   * @param {string} display
   */
  userNameIs(display) {
    if (display === "visible") {
      repoHomePage.getUserName().should("be.visible");
    } else if (display === "not visible") {
      repoHomePage.getUserName().should("not.be.visible");
    } else {
      throw new Error("Invalid display");
    }
  }
}

module.exports = HomePageAction;
