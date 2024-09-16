const ChitterModel = require('./chitterModel');
const ChitterView = require('./chitterView');

console.log('The chitter app is running');

const model = new ChitterModel();
const view = new ChitterView(model);
