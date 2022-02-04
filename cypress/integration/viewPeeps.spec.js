/// <reference types="Cypress" />

describe('Mainpage', () => {
  beforeEach(function () {
    // "this" points at the test context object
    cy.fixture('peeps_list').as('peepsJSON')
    cy.server()
    cy.route({
      method: 'GET',      // Route all GET requests
      url: '**/peeps',    // that have a URL that matches '/users/*'
      response: '@peepsJSON'        // and force the response to be: []
    }).as('peeps')
  })


  // the test callback is in "function () { ... }" form
  it('can recieve a non empty reply from the API', function () {
    // this.user exists
    cy.visit('/')
    cy.wait('@peeps').then((xhr) => {
      assert.isNotNull(xhr.response.body.data, 'list peeps API call has data')
    })
  })

  it('can display a peep from the API', function () {
    // this.user exists
    cy.visit('/')
    cy.wait('@peeps')
    cy.contains("And I'd like to take a minute Just sit right there I'll tell you how I became the prince of a town called Bel Air")
  })

  it('can display multiple peeps from the API', function () {
    // this.user exists
    cy.visit('/')
    cy.wait('@peeps')
    cy.contains("And I'd like to take a minute Just sit right there I'll tell you how I became the prince of a town called Bel Air")
    cy.contains("My life got flipped-turned upside down")
  })
})