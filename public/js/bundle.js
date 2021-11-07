(() => {
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // public/templates/peep.js
  var require_peep = __commonJS({
    "public/templates/peep.js"(exports, module) {
      var renderPeep2 = (peep) => {
        let likes = peep.likes.length;
        if (likes === 0) {
          likes = "";
        }
        let date = new Date(peep.updated_at).toString();
        date = date.substring(0, 21);
        return `<div class="peep">
      <img class="peep__author-pic" src="/images/red_egg.jpeg"></img>
      <div class="peep__main">
        <div class="peep__header">
          <div class="peep__author-handle">
            ${peep.user.handle} 
          </div>
          <div class="peep__time-since">
            ${date}
          </div>
        </div>
        <div class="peep__content">
          <div class="peep__text">
            ${peep.body}
          </div>
        </div>
        <div class="peep__footer">
          <img class="peep__like-icon" src="/images/like_icon.png" width="20" height="20"></img>
          <div class="peep__like-count">
            ${likes}
          </div>
        </div>
      </div>
    </div>`;
      };
      module.exports = renderPeep2;
    }
  });

  // public/js/index.js
  var renderPeep = require_peep();
  var feed = document.getElementById("feed");
  var Token = null;
  var checkFetch = (response) => {
    if (!response.ok) {
      console.log(response);
      throw Error(response.status);
    } else {
      return response;
    }
  };
  var fetchAllPeeps = (callback) => {
    fetch("https://chitter-backend-api-v2.herokuapp.com/peeps").then((response) => response.json().then((peeps) => callback(peeps))).catch((error) => {
      console.log("Fetch all peeps error:", error);
    });
  };
  var showAllPeeps = (peeps) => {
    peeps.forEach((peep) => {
      feed.insertAdjacentHTML("beforeend", renderPeep(peep));
    });
  };
  fetchAllPeeps((peeps) => showAllPeeps(peeps));
  var modalButtons = document.querySelectorAll("[data-target-modal]");
  var modalCloseButtons = document.querySelectorAll("[data-modal-close");
  var overlay = document.getElementById("overlay");
  modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let modal = document.querySelector(button.dataset.targetModal);
      showModal(modal);
    });
  });
  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let modal = button.closest(".modal");
      hideModal(modal);
    });
  });
  overlay.addEventListener("click", () => {
    let modals = document.querySelectorAll(".modal.active");
    modals.forEach((modal) => {
      hideModal(modal);
    });
  });
  var showModal = (modal) => {
    modal.classList.add("active");
    overlay.classList.add("active");
  };
  var hideModal = (modal) => {
    modal.classList.remove("active");
    overlay.classList.remove("active");
    let error = modal.querySelector(".error.active");
    if (error) {
      hideError(error);
    }
    ;
    let inputs = modal.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });
  };
  var signupFormButton = document.getElementById("signup-form-submit");
  signupFormButton.addEventListener("click", () => {
    let handle = document.getElementById("signup-form-handle").value;
    let password = document.getElementById("signup-form-password").value;
    attemptSignup(handle, password);
  });
  var attemptSignup = (handle, password) => {
    fetch("https://chitter-backend-api-v2.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: `{"user": {"handle":"${handle}", "password":"${password}"}}`
    }).then((response) => {
      checkFetch(response);
    }).then(() => {
      signUpSuccess(handle);
    }).catch((error) => {
      console.log("Sign up error:", error);
      let errString = error.toString();
      if (errString.includes("422")) {
        errString = "That username is already taken";
      }
      let errorElement2 = document.getElementById("signup-error");
      flashError(errString, errorElement2);
    });
  };
  var signUpSuccess = (handle) => {
    const signupFormModal = document.getElementById("signup-form");
    hideModal(signupFormModal);
    const successModal = document.getElementById("signup-success");
    const signupWelcome = document.getElementById("signup-welcome");
    signupWelcome.textContent = `Your account has been created successfully, welcome to Chitter ${handle}.`;
    showModal(successModal);
  };
  var logInSuccess = (responseToken) => {
    const loginFormModal = document.getElementById("login-form");
    hideModal(loginFormModal);
    Token = responseToken;
    loggedInView();
  };
  var loggedInView = () => {
    hideButton(document.getElementById("signup-button"));
    hideButton(document.getElementById("login-button"));
    showButton(document.getElementById("logout-button"));
    showButton(document.getElementById("peep-button"));
  };
  var showButton = (button) => {
    button.classList.add("active");
  };
  var hideButton = (button) => {
    button.classList.remove("active");
  };
  var flashError = (error, errorElement2) => {
    errorElement2.textContent = error;
    showError(errorElement2);
  };
  var showError = (error) => {
    error.classList.add("active");
  };
  var hideError = (error) => {
    error.classList.remove("active");
  };
  var attemptLogin = (handle, password) => {
    fetch("https://chitter-backend-api-v2.herokuapp.com/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: `{"session": {"handle":"${handle}", "password":"${password}"}}`
    }).then((response) => {
      checkFetch(response);
    }).then(() => {
      logInSuccess();
    }).catch((error) => {
      console.log("Log in error:", error);
      let errString = error.toString();
      errorElement = document.getElementById("login-error");
      flashError(errString, errorElement);
    });
  };
  var loginFormButton = document.getElementById("login-form-submit");
  loginFormButton.addEventListener("click", () => {
    let handle = document.getElementById("login-form-handle").value;
    let password = document.getElementById("login-form-password").value;
    attemptLogin(handle, password);
  });
})();
