const SITE = 'http://localhost:19006';

describe('Visual Regression', () => {
  it('Accordion (Closed)', () => {
    cy.visit(`${SITE}/accordion`);
    // To wait until icon rendered
    cy.findAllByRole('img').should('have.length.greaterThan', 2);
    cy.percySnapshot();
  });

  it('Accordion (Open)', () => {
    cy.visit(`${SITE}/accordion`);
    cy.findAllByRole('img').should('have.length.greaterThan', 0);
    cy.queryByText('SECOND SECTION').click();
    cy.findAllByRole('img').should('have.length.greaterThan', 1);
    cy.wait(300);
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

  it('Calendar', () => {
    cy.visit(`${SITE}/calendar`);
    cy.findAllByRole('img').should('have.length.greaterThan', 0);
    cy.wait(200);
    cy.percySnapshot();
  });

  it('Checkbox (Unchecked)', () => {
    cy.visit(`${SITE}/checkbox`);
    cy.findAllByRole('img').should('have.length.greaterThan', 0);
    cy.percySnapshot();
  });

  it('Checkbox (Checked)', () => {
    cy.visit(`${SITE}/checkbox`);
    cy.findAllByRole('img').should('have.length.greaterThan', 0);
    cy.queryByText('Agree').click();
    cy.percySnapshot();
  });

  it('Collapsible (Closed)', () => {
    cy.visit(`${SITE}/collapsible`);
    cy.findAllByRole('img').should('have.length.greaterThan', 1);
    cy.percySnapshot();
  });

  it('Collapsible (Open)', () => {
    cy.visit(`${SITE}/collapsible`);
    cy.findAllByRole('img').should('have.length.greaterThan', 1);
    cy.queryByText('Press Me').click();
    cy.wait(300);
    cy.percySnapshot();
  });

  it('DateTimePicker (Date)', () => {
    cy.visit(`${SITE}/datetimepicker`);
    cy.findAllByRole('img').should('have.length.greaterThan', 0);
    cy.queryByText('OPEN DATEPICKER').click();
    cy.percySnapshot();
  });

  it('DateTimePicker (Time)', () => {
    cy.visit(`${SITE}/datetimepicker`);
    cy.findAllByRole('img').should('have.length.greaterThan', 0);
    cy.queryByText('OPEN TIMEPICKER').click();
    cy.percySnapshot();
  });

  it('IconButon', () => {
    cy.visit(`${SITE}/iconbutton`);
    cy.findAllByRole('img').should('have.length.greaterThan', 2);
    cy.percySnapshot();
  });

  it('Modal', () => {
    cy.visit(`${SITE}/modal`);
    cy.findAllByRole('img').should('have.length.greaterThan', 0);
    cy.queryByText('OPEN MODAL').click();
    cy.findByText('Howdy, Modal!');
    cy.wait(300);
    cy.percySnapshot();
  });

  it('Portal', () => {
    cy.visit(`${SITE}/portal`);
    cy.findAllByRole('img').should('have.length.greaterThan', 0);
    cy.queryByText('Press me to show the portal.').click();
    cy.wait(300);
    cy.percySnapshot();
  });

  xit('ProgressBar', () => {
    cy.visit(`${SITE}/progressbar`);
    cy.findAllByRole('img').should('have.length.greaterThan', 0);
    cy.wait(500);
    cy.percySnapshot();
  });

  it('RadioButton', () => {
    cy.visit(`${SITE}/radiobuttongroup`);
    cy.findAllByRole('img').should('have.length.greaterThan', 0);
    cy.queryByText('Prefer not to say').click();
    cy.percySnapshot();
  });

  it('Slider', () => {
    cy.visit(`${SITE}/slider`);
    cy.findAllByRole('img').should('have.length.greaterThan', 0);
    cy.percySnapshot();
  });

  it('Switch', () => {
    cy.visit(`${SITE}/switch`);
    cy.findAllByRole('img').should('have.length.greaterThan', 0);
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

  it('Toast', () => {
    cy.visit(`${SITE}/toast`);
    cy.findAllByRole('img').should('have.length.greaterThan', 0);
    cy.queryByText('TOGGLE CONTROLLED TOAST').click();
    cy.findAllByRole('img').should('have.length.greaterThan', 1);
    cy.findByText('Controlled Toast');
    cy.wait(500);
    cy.percySnapshot();
  });

  it('Typography', () => {
    cy.visit(`${SITE}/typography`);
    cy.findAllByRole('img').should('have.length.greaterThan', 0);
    cy.percySnapshot();
  });
});
