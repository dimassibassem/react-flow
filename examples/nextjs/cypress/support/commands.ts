/// <reference types="cypress" />

Cypress.Commands.add('drag', (selector, { x, y }) =>
  cy.window().then((window) =>
    cy
      .get(selector as string)
      .trigger('mousedown', { which: 1, view: window })
      .trigger('mousemove', { clientX: x, clientY: y, force: true })
      .wait(50)
      .trigger('mouseup', { view: window, force: true })
  )
);

Cypress.Commands.add('dragPane', ({ from, to }) =>
  cy.window().then((window) =>
    cy
      .get('.react-flow__pane')
      .trigger('mousedown', from.x, from.y, { which: 1, view: window })

      .trigger('mousemove', to.x, to.y)
      .trigger('mouseup', { force: true, view: window })
  )
);

Cypress.Commands.add('zoomPane', (wheelDelta: number) =>
  cy.get('.react-flow__pane').trigger('wheel', 'center', { deltaY: wheelDelta }).wait(250)
);

Cypress.Commands.add('isWithinViewport', { prevSubject: true }, (subject) => {
  const rect = subject[0].getBoundingClientRect();

  expect(rect.top).to.be.within(0, window.innerHeight);
  expect(rect.right).to.be.within(0, window.innerWidth);
  expect(rect.bottom).to.be.within(0, window.innerHeight);
  expect(rect.left).to.be.within(0, window.innerWidth);

  return subject;
});

Cypress.Commands.add('isOutsideViewport', { prevSubject: true }, (subject) => {
  const rect = subject[0].getBoundingClientRect();

  expect(rect.top).not.to.be.within(0, window.innerHeight);
  expect(rect.right).not.to.be.within(0, window.innerWidth);
  expect(rect.bottom).not.to.be.within(0, window.innerHeight);
  expect(rect.left).not.to.be.within(0, window.innerWidth);

  return subject;
});

export {};
