/**
 * @jest-environment jsdom
 */

const fs = require('fs');

const ChitterModel = require('./chitterModel');
const ChitterView = require('./chitterView'); 

describe('Chitter view', () => {
  it('displaying two peeps', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    const model = new ChitterModel();
    const view = new ChitterView(model);
    model.addPeep('First peep');
    model.addPeep('Another one');

    view.displayPeeps();

    expect(document.querySelectorAll('div.peep').length).toEqual(2);
  })
})

