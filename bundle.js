(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // lib/chitterModel.js
  var require_chitterModel = __commonJS({
    "lib/chitterModel.js"(exports, module) {
      var ChitterModel2 = class {
        constructor() {
          this.peeps = [];
        }
        getPeeps() {
          return this.peeps;
        }
        setPeeps(peeps) {
          this.peeps = peeps;
        }
      };
      module.exports = ChitterModel2;
    }
  });

  // views/chitterView.js
  var require_chitterView = __commonJS({
    "views/chitterView.js"(exports, module) {
      var ChitterView2 = class {
        constructor(ChitterModel2, api2) {
          this.model = ChitterModel2;
          this.api = api2;
          this.mainContainerEl = document.querySelector("#main-container");
        }
        displayPeeps() {
          const peeps = this.model.getPeeps();
          document.querySelectorAll(".peep").forEach((e) => e.remove());
          peeps.forEach((peep) => {
            const peepEl = document.createElement("div");
            peepEl.innerText = peep.body;
            peepEl.className = "peep";
            this.mainContainerEl.append(peepEl);
          });
        }
        startSession() {
          const inputHandleEl = document.getElementById("handle");
          const inputPasswordEl = document.getElementById("password");
          localStorage.setItem("handle", inputHandleEl.value);
          this.api.startSession(inputHandleEl.value, inputPasswordEl.value, (session) => {
            this.setLocalStorage(session);
          });
          this.displayWelcome();
          this.hideSessionLogOn();
        }
        setLocalStorage(session) {
          localStorage.setItem("user-id", session.user_id);
          localStorage.setItem("session-key", session.session_key);
        }
        displayWelcome() {
          const welcomeEl = document.createElement("div");
          welcomeEl.id = "welcome";
          this.mainContainerEl.prepend(welcomeEl);
          const welcomeTextEl = document.createElement("p");
          welcomeTextEl.id = "welcomeText";
          welcomeEl.appendChild(welcomeTextEl);
          welcomeTextEl.innerText = "Welcome " + localStorage.getItem("handle");
        }
        hideSessionLogOn() {
          const formLogonEl = document.getElementById("logon-container");
          while (formLogonEl.firstChild) {
            formLogonEl.firstChild.remove();
          }
          this.mainContainerEl.removeChild(formLogonEl);
        }
        displaySessionLogOn() {
          const logOnFormEl = document.createElement("form");
          logOnFormEl.id = "logon-container";
          const handleInputEl = document.createElement("input");
          handleInputEl.id = "handle";
          handleInputEl.setAttribute("type", "text");
          handleInputEl.setAttribute("placeholder", "handle");
          const passwordInputEl = document.createElement("input");
          passwordInputEl.id = "password";
          passwordInputEl.setAttribute("type", "password");
          passwordInputEl.setAttribute("placeholder", "Password");
          const submitButtonEl = document.createElement("input");
          submitButtonEl.id = "logon";
          submitButtonEl.setAttribute("type", "submit");
          submitButtonEl.setAttribute("value", "Log on");
          submitButtonEl.addEventListener("click", () => {
            this.startSession();
          });
          logOnFormEl.appendChild(handleInputEl);
          logOnFormEl.appendChild(passwordInputEl);
          logOnFormEl.appendChild(submitButtonEl);
          this.mainContainerEl.appendChild(logOnFormEl);
        }
      };
      module.exports = ChitterView2;
    }
  });

  // lib/chitterApi.js
  var require_chitterApi = __commonJS({
    "lib/chitterApi.js"(exports, module) {
      var ChitterApi = class {
        loadPeeps(callback) {
          fetch("https://chitter-backend-api-v2.herokuapp.com/peeps").then((response) => response.json()).then((data) => {
            callback(data);
          });
        }
        startSession(handle, password, callback) {
          fetch("https://chitter-backend-api-v2.herokuapp.com/sessions", {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({ session: { handle: `${handle}`, password: `${password}` } })
          }).then((response) => response.json()).then((data) => callback(data)).catch((error) => {
            console.error("Error:", error);
          });
        }
      };
      module.exports = ChitterApi;
    }
  });

  // index.js
  var ChitterModel = require_chitterModel();
  var ChitterView = require_chitterView();
  var ChittersApi = require_chitterApi();
  var api = new ChittersApi();
  var model = new ChitterModel();
  var view = new ChitterView(model, api);
  localStorage.clear();
  view.displaySessionLogOn();
  api.loadPeeps((peeps) => {
    model.setPeeps(peeps);
    view.displayPeeps();
  });
})();
