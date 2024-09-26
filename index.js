const ChitterPeep = require("./src/models/chitterPeep");
const ChitterView = require("./src/views/chitterView");
const ChitterClient = require("./src/clients/chitterClient");
const ChitterUser = require("./src/models/chitterUser");

const model = new ChitterPeep();
const client = new ChitterClient();
const view = new ChitterView(model, client);
view.displayPeepsFromApi();
