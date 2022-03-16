
/**
 * @jest-environment jsdom
 */

const ChitterView = require('./chitterView')
require('jest-fetch-mock').enableMocks()
const fs = require('fs')
const ChitterModel = require('./ChitterModel')
let model
let view

describe('notesView', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html')
    model = new ChitterModel()
    view = new ChitterView(model)
  })
  it('create a new PostView with the model injected', () => {
    model.addPost('Cheese')
    model.addPost('Twitter')
    view.displayPosts()
    expect(document.querySelectorAll('div.post').length).toEqual(2)
  })
  it('adds a note to the page from the user input', () => {
    model.addPost('Hang the DJ')
    const postButtonEl = document.querySelector('#post-button')
    postButtonEl.click()
    console.group(document.querySelectorAll('div.post').innerText)
    expect(document.querySelectorAll('div.post').innerText).toBe('Hang the DJ')
  })
  it('clears the notes before showing the new list', () => {
    model.addPost('Bromley')
    view.displayPosts()
    model.addPost('Eddie')
    view.displayPosts()
    expect(document.querySelectorAll('div.post').length).toEqual(2)
  })
  it('displays an error if the fetch fails', () => {
    view.displayError('error')
    expect(document.querySelector('#error-message').innerText).toBe('error')
  })
})
