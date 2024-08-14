import { faker } from "@faker-js/faker";
const HomePageAction = require("../../support/actions/HomePageAction");
const DeviceAction = require("../../support/actions/DeviceAction");
const CartAction = require("../../support/actions/CartAction");
const CartPageRepository = require("../../support/repositories/CartPageRepository");
const HomePageRepository = require("../../support/repositories/HomePageRepository");
const { expect } = require("chai");

const home = new HomePageAction();
const device = new DeviceAction();
const cart = new CartAction();
const repoCartPage = new CartPageRepository();
const repoHomePage = new HomePageRepository();

let user = {};

describe("Device Actions", () => {
  beforeEach(() => {
    cy.clearCookies().visit("/");
    user = {
      name: faker.person.firstName(),
      country: faker.location.country(),
      city: faker.location.city(),
      creditCard: faker.finance.creditCardNumber(),
      month: faker.date.month(),
      year: faker.date.past().getFullYear(),
    };
  });

  const categories = ["Phones", "Laptops", "Monitors"];

  categories.forEach((category) => {
    it("should add device to cart", () => {
      home.clickOnCategory(category);
      home.clickOnDevice(repoHomePage.getDevices().eq(0));
      cy.get(".product-image").should("exist");

      cy.saveAsAlias(device.getDeviceName(), "addedDeviceName");
      cy.saveAsAlias(device.getDevicePrice(), "addedDevicePrice");

      device.addDeviceToCart();
      cy.checkAlertMessage("Product added");

      home.open("Cart");
      cart.checkDevicesCount(1);

      cart
        .getDeviceParameter(repoCartPage.getListOfDevices().eq(0), "name")
        .then((cartDeviceName) => {
          cy.log("Cart Device Name: ", cartDeviceName);
          cy.get("@addedDeviceName").then((addedDeviceName) => {
            cy.log("Added Device Name: ", addedDeviceName);
            expect(cartDeviceName).to.equal(addedDeviceName);
          });
        });

      cart
        .getDeviceParameter(repoCartPage.getListOfDevices().eq(0), "price")
        .then((cartDevicePrice) => {
          cy.log("Cart Device Price: ", cartDevicePrice);
          cy.get("@addedDevicePrice").then((addedDevicePrice) => {
            cy.log("Added Device Price: ", addedDevicePrice);
            expect("$" + cartDevicePrice).to.equal(
              addedDevicePrice.replace(" *includes tax", "")
            );
          });
        });
    });
  });

  categories.forEach((category) => {
    it("should remove device from cart", () => {
      home.clickOnCategory(category);
      home.clickOnDevice(repoHomePage.getDevices().eq(0));
      device.addDeviceToCart();
      cy.checkAlertMessage("Product added");
      home.open("Cart");
      cart.checkDevicesCount(1);
      cart.clickOnRemoveButton(repoCartPage.getListOfDevices().eq(0));
      cart.checkDevicesCount(0);
    });
  });

  categories.forEach((category) => {
    it("should place order", () => {
      home.clickOnCategory(category);
      home.clickOnDevice(repoHomePage.getDevices().eq(0));

      cy.saveAsAlias(device.getDevicePrice(), "addedDevicePrice");

      device.addDeviceToCart();
      cy.checkAlertMessage("Product added");

      home.open("Cart");
      cart.checkDevicesCount(1);
      cart.clickOnPlaceOrderButton();

      cart.doPlaceOrder(user);

      cy.get("@addedDevicePrice").then((addedDevicePrice) => {
        cart.checkPurchaseInfo(
          user,
          addedDevicePrice.replace(" *includes tax", "").replace("$", "")
        );
      });
    });
  });
});
