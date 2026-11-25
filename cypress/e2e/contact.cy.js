describe("Contact Form Workflow", () => {

  it("allows a visitor to submit a contact message", () => {

    cy.visit("http://localhost:3000/contact");

    cy.get('input[name="firstName"]').type("Morel");
    cy.get('input[name="lastName"]').type("Eware");
    cy.get('input[name="email"]').type("morel@centennial.ca");
    cy.get('textarea[name="message"]').type("Testing Cypress contact submission");

    cy.contains("Send message").click();

    cy.wait(2000);

  });

});