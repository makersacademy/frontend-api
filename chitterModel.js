class ChitterModel {

  constructor() {
    this.peeps = []
  }

  getPeeps = () => this.peeps;

  addPeep = (peep) => this.peeps.push(peep);

  reset = () => this.peeps = [];

}

module.exports = ChitterModel;

// best way to approach this task:
// 1.api > 2.model > 3.view