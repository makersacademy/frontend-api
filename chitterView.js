class ChitterView {
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');

    this.peepButtonEl = document.querySelector('#peep-button');
    this.peepButtonEl.addEventListener('click', () => {
      this.model.addPeep(document.querySelector('#new-peep').value);
      this.displayPeeps();
      document.querySelector('#new-peep').value = "";
    })
  }

  displayPeeps() {
    document.querySelectorAll('.peep').forEach(element => {
      element.remove();
    });

    const peeps = this.model.getPeeps();

    peeps.forEach(peep => {
      const peepEl = document.createElement('div');
      peepEl.innerText = peep;
      peepEl.className = 'peep';
      this.mainContainerEl.append(peepEl);
    })
  }

}

module.exports = ChitterView; 