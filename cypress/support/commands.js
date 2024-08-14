// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.overwrite("type", (originalFn, element, text, options) => {
  if (text != null) {
    return originalFn(element, text, options);
  }
});

Cypress.Commands.add("checkAlertMessage", (alertMessage) => {
  cy.on("window:alert", (t) => {
    expect(t).to.contains(alertMessage);
  });
});

Cypress.Commands.add("getValueBySelector", (selector) => {
  return cy.get(selector).invoke("text");
});

Cypress.Commands.add("saveAsAlias", (element, alias) => {
  element.then(($el) => {
    let textToSave = $el.text();
    if (textToSave === "") {
      textToSave = $el.val();
    }
    cy.wrap(textToSave).as(alias);
  });
});
