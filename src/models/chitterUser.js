class ChitterUser {
  constructor(handle, password, sessionKey = null, userId = null) {
    this.handle = handle;
    this.password = password;
    this.sessionKey = sessionKey;
    this.userId = userId;
  }

  setSessionKey(key) {
    this.sessionKey = key;
  }

  setUserId(id) {
    this.userId = id;
  }
}

module.exports = ChitterUser;
