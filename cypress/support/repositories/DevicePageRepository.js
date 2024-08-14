class DevicePageRepository {    
  getDeviceName() {
    return cy.get("h2.name");
  }

  getDeviceDescription() {
    return cy.get("p");
  }

  getDevicePrice() {
    return cy.get("h3.price-container");
  }

  getAddToCartButton() {
    return cy.get("#tbodyid div > a");
  }
}

module.exports = DevicePageRepository;
