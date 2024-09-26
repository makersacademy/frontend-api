class ChitterPeep {
  constructor() {
    this.peeps = [];
  }

  setPeeps(peeps) {
    this.peeps = peeps;
  }

  getPeeps() {
    return this.peeps;
  }
}

module.exports = ChitterPeep;
