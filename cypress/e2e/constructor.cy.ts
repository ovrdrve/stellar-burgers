/// <reference types='cypress'/>

describe('ingredients added to the constructor correctly', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });

    cy.viewport(1280, 800);
    cy.visit('http://localhost:4000/');
  });

  it('should add bun', () => {
    cy.get('[data-cy=constructor]').contains('bun-1').should('not.exist');
    cy.get('[data-cy=category-buns]').contains('Добавить').click();

    cy.get('[data-cy=constructor-bun-top]').contains('bun-1').should('exist');
    cy.get('[data-cy=constructor-bun-bottom]')
      .contains('bun-1')
      .should('exist');
  });

  it('should add ingredient', () => {
    cy.get('[data-cy=constructor]').contains('main-1').should('not.exist');
    cy.get('[data-cy=category-mains]').contains('Добавить').click();
    cy.get('[data-cy=constructor]').contains('sauce-1').should('not.exist');
    cy.get('[data-cy=category-sauces]').contains('Добавить').click();

    cy.get('[data-cy=constructor-ingredients]')
      .contains('main-1')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('sauce-1')
      .should('exist');
  });
});

describe('ingredients details modal should open and close correctly', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });

    cy.viewport(1280, 800);
    cy.visit('http://localhost:4000/');
  });

  it('should open and close by button', () => {
    cy.get('[data-cy=category-buns]').contains('bun-1').click();
    cy.get('#modals').contains('bun-1').should('exist');

    cy.get('[data-cy=modal-close]').click();
    cy.get('#modals').contains('bun-1').should('not.exist');
  });

  it('should open and close by overlay', () => {
    cy.get('[data-cy=category-buns]').contains('bun-1').click();
    cy.get('#modals').contains('bun-1').should('exist');

    cy.get('[data-cy=modal-overlay]').click('right', { force: true });
    cy.get('#modals').contains('bun-1').should('not.exist');
  });
});

describe('order made correctly', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('testRefreshToken')
    );
    cy.setCookie('accessToken', 'testAccessToken');

    cy.viewport(1280, 800);
    cy.visit('http://localhost:4000/');
  });

  afterEach(() => {
    cy.clearAllLocalStorage();
    cy.clearAllCookies();
  });

  it('should order', () => {
    cy.get('[data-cy=category-buns]').contains('Добавить').click();
    cy.get('[data-cy=category-mains]').contains('Добавить').click();
    cy.get('[data-cy=category-sauces]').contains('Добавить').click();
    cy.get('button').contains('Оформить заказ').click();

    cy.get('#modals').contains('12345').should('exist');
    cy.get('[data-cy=modal-close]').click();

    cy.get('#modals').contains('12345').should('not.exist');
    cy.get('[data-cy=constructor]').contains('bun-1').should('not.exist');
    cy.get('[data-cy=constructor]').contains('main-1').should('not.exist');
    cy.get('[data-cy=constructor]').contains('sauce-1').should('not.exist');
  });
});
