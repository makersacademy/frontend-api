(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // chitterModel.js
  var require_chitterModel = __commonJS({
    "chitterModel.js"(exports, module) {
      var ChitterModel2 = class {
        constructor() {
          this.peeps = [];
        }
        getPeeps() {
          return this.peeps;
        }
        addPeeps(peep) {
          return this.peeps.push(peep);
        }
        deletePeeps() {
          return this.peeps = [];
        }
      };
      module.exports = ChitterModel2;
    }
  });

  // chitterView.js
  var require_chitterView = __commonJS({
    "chitterView.js"(exports, module) {
      var ChitterView2 = class {
        constructor(model2) {
          this.model = model2;
          this.mainContainerEl = document.querySelector("#main-container");
          document.querySelector("#submit-peep-button").addEventListener("click", () => {
            let newPeep = document.querySelector("#user-input").value;
            this.addNewPeeps(newPeep);
            const clearInputField = document.getElementById("user-input");
            const btn = document.getElementById("#submit-peep-button");
            clearInputField.value = " ";
          });
        }
        addNewPeeps(newPeeps) {
          this.model.addPeeps(newPeeps);
          this.viewPeeps();
        }
        viewPeeps() {
          document.querySelectorAll(".peep").forEach((element) => {
            element.remove();
          });
          let displayPeeps = this.model.getPeeps();
          displayPeeps.forEach((peep) => {
            let div = document.createElement("div");
            div.innerText = peep;
            div.className = "peep";
            this.mainContainerEl.append(div);
          });
        }
      };
      module.exports = ChitterView2;
    }
  });

  // index.js
  var ChitterModel = require_chitterModel();
  var ChitterView = require_chitterView();
  var model = new ChitterModel();
  var view = new ChitterView(model);
  view.viewPeeps();
})();
