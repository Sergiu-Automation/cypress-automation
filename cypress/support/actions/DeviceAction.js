const DevicePageRepository = require("../repositories/DevicePageRepository");

const repoDevicePage = new DevicePageRepository();

class DeviceAction {
  /**
   *
   * @return {string}
   */
  getDeviceName() {
    return repoDevicePage.getDeviceName();
  }

  /**
   *
   * @return {string}
   */
  getDevicePrice() {
    return repoDevicePage.getDevicePrice();
  }

  addDeviceToCart() {
    repoDevicePage.getAddToCartButton().click();
  }
}

module.exports = DeviceAction;
