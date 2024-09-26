class ChitterClient {
  loadPeeps(callback) {
    fetch("https://chitter-backend-api-v2.herokuapp.com/peeps")
      .then((response) => response.json())
      .then((data) => callback(data));
  }

  signupUser(user, callback) {
    fetch("https://chitter-backend-api-v2.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          handle: user.handle,
          password: user.password,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to signup user");
        }
        return response.json();
      })
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        console.error("Error signing up user:", error);
      });
  }

  loginUser(user, callback) {
    fetch("https://chitter-backend-api-v2.herokuapp.com/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: {
          handle: user.handle,
          password: user.password,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to login user");
        }
        return response.json();
      })
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        console.error("Error logging in user:", error);
      });
  }

  createPeep(peep, sessionKey, callback) {
    console.log("Session Key: ", sessionKey);
    fetch("https://chitter-backend-api-v2.herokuapp.com/peeps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token token=${sessionKey}`,
      },
      body: JSON.stringify({
        peep,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create peep");
        }
        return response.json();
      })
      .then((data) => {
        callback(data);
      })
      .catch((error) => {
        console.error("Error creating peep:", error);
      });
  }

  loadPeepById(id, callback) {
    fetch(`https://chitter-backend-api-v2.herokuapp.com/peeps/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => callback(data))
      .catch((error) => {
        console.error(
          `There has been a problem with your fetch operation: ${error.message}`
        );
        callback({ error: error.message });
      });
  }

  likePeep(peepId, userId, sessionKey, callback) {
    fetch(
      `https://chitter-backend-api-v2.herokuapp.com/peeps/${peepId}/likes/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Token token=${sessionKey}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => callback({ error: error.message }));
  }

  unlikePeep(peepId, userId, sessionKey, callback) {
    fetch(
      `https://chitter-backend-api-v2.herokuapp.com/peeps/${peepId}/likes/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token token=${sessionKey}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 204) {
          callback({ message: "Peep unliked successfully." });
        } else {
          return response.json();
        }
      })
      .then((data) => callback(data))
      .catch((error) => callback({ error: error.message }));
  }

  deletePeep(peepId, sessionKey, callback) {
    fetch(`https://chitter-backend-api-v2.herokuapp.com/peeps/${peepId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token token=${sessionKey}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(JSON.stringify(error));
          });
        }
        return null; // No content to return
      })
      .then((data) => {
        if (data !== null) {
          callback(JSON.parse(data));
        } else {
          callback(null);
        }
      })
      .catch((error) => {
        callback(error.message);
      });
  }
}

module.exports = ChitterClient;
