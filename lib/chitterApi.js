class ChitterApi {
  constructor() {
    this.baseUrl = "https://chitter-backend-api-v2.herokuapp.com/";
  }

  getPeeps = (callback) => {
    fetch(this.baseUrl + "peeps")
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      });
  };
  createUser = (handle, password, callback) => {
    fetch(this.baseUrl + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { handle: handle, password: password } }),
    })
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      });
  };
  createSession = (handle, password, callback) => {
    fetch(this.baseUrl + "sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session: { handle: handle, password: password } }),
    })
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      });
  };
  createPeep = (user_id, peep, callback) => {
    fetch(this.baseUrl + "peeps", {
      method: "POST",
      headers: {
        Authorization: "Token token=a_valid_session_key",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ peep: { user_id: user_id, body: peep } }),
    })
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      });
  };
}

module.exports = ChitterApi;
