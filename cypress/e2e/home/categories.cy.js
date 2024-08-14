const devices = require("../../fixtures/devices.json");
const { expect } = require("chai");
const HomePageAction = require("../../support/actions/HomePageAction.js");
const HomePageRepository = require("../../support/repositories/HomePageRepository.js");

const home = new HomePageAction();
const repoHomePage = new HomePageRepository();

describe("Categories", () => {
  beforeEach(() => {
    cy.clearCookies().visit("/");
  });

  it("should show categories", () => {
    home.checkCategoriesCount(3);
  });

  it("should contain correct count of devices", () => {
    const devicesByCategory = {
      Phones: 7,
      Laptops: 6,
      Monitors: 2,
    };

    Object.entries(devicesByCategory).forEach(([category, count]) => {
      home.checkDevicesCountByCategory(category, count);
    });
  });

  it("should show correct devices' prices", () => {
    repoHomePage.getCategories().each((category) => {
      home.clickOnCategory(category.text());
      repoHomePage.getDevices().each((device) => {
        let deviceName = home.getDeviceName(device).replace("\n", "");
        let devicePriceFromJson = devices[deviceName];
        expect(devicePriceFromJson).to.equal(home.getDevicePrice(device));
      });
    });
  });
});
