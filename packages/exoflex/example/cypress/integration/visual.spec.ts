const SITE = 'http://localhost:19006';

describe('Visual Regression', () => {
  it('Homepage', () => {
    // Load the page or perform any other interactions with the app.
    cy.visit(SITE);
    cy.contains('Welcome');

    // To wait until icon rendered
    cy.findAllByRole('img').should('have.length.greaterThan', 0);

    // Take a snapshot for visual diffing
    cy.percySnapshot();
  });

  it('Button', () => {
    cy.visit(`${SITE}/button`);
    cy.contains('WITH ICON');
    cy.findAllByRole('img').should('have.length.greaterThan', 1);
    cy.percySnapshot();
  });

  it('Card', () => {
    cy.visit(`${SITE}/card`);
    cy.findAllByRole('img').should('have.length.greaterThan', 1);
    cy.percySnapshot();
  });

  it('IconButon', () => {
    cy.visit(`${SITE}/iconbutton`);
    cy.findAllByRole('img').should('have.length.greaterThan', 2);
    cy.percySnapshot();
  });

  it('TextInput (blank)', () => {
    cy.visit(`${SITE}/textinput`);
    cy.findAllByRole('img').should('have.length.greaterThan', 1);
    cy.percySnapshot();
  });

  it('TextInput (text)', () => {
    cy.visit(`${SITE}/textinput`);
    cy.findAllByRole('img').should('have.length.greaterThan', 1);
    cy.queryByPlaceholderText('Hint Text').type('This is using label');
    cy.queryByPlaceholderText('Type here...').type('This is not using label');
    cy.percySnapshot();
  });

  it('Typography', () => {
    cy.visit(`${SITE}/typography`);
    cy.findAllByRole('img').should('have.length.greaterThan', 0);
    cy.percySnapshot();
  });
});
