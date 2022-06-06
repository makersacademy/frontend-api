class MessagesView {
  constructor(model, api, user) {
    this.model = model;
    this.api = api;
    this.user = user;

    this.mainContainerEl = document.querySelector('#main-container');

    this.addMessageInput = document.querySelector('#add-message-input');
    this.addMessageButton = document.querySelector('#add-message-button');

    this.addMessageButton.addEventListener('click', () => {
      this.addMessage(this.addMessageInput.value);
      this.addMessageInput.value = "";
    });

    this.signUpButton = document.querySelector('#sign-up-button');

    this.signUpButton.addEventListener('click', () => {
      document.querySelector('#sign-up-container').innerHTML = "";
      this.displaySignUpForm();
    });

    this.loginButton = document.querySelector('#login-button');

    this.loginButton.addEventListener('click', () => {
      document.querySelector('#login-container').innerHTML = "";
      this.displayLoginForm();
    });
  }

  addMessage(text) {
    const userId = this.user.getUserId();
    const sessionKey = this.user.getSessionKey();

    this.api.postMessage(userId, sessionKey, text, (data) => {
      console.log(data);
      this.displayMessagesFromApi();
    });
  }

  displayTime(timeString) {
    let date = timeString.substring(0, 10);
    let time = timeString.substring(11, 19);
    return time + "  " + date;
  }

  displayMessages() {
    document.querySelectorAll('.message').forEach(element => element.remove());

    const messages = this.model.getMessages();

    messages.forEach(message => {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'message-cont';
      
      const messageEl = document.createElement('p');
      messageEl.innerText = message.body;
      messageEl.className = 'message-text';

      const authorDiv = document.createElement('div');
      authorDiv.className = 'message-author';
      authorDiv.innerText = message.user.handle;

      const timeDiv = document.createElement('div');
      timeDiv.className = 'message-time';
      timeDiv.innerText = this.displayTime(message.updated_at);

      messageDiv.append(messageEl);
      messageDiv.append(authorDiv);
      messageDiv.append(timeDiv);
      this.mainContainerEl.append(messageDiv);
    });
  }

  displayMessagesFromApi() {
    this.api.loadMessages(data => {
      this.model.setMessages(data);
      this.displayMessages();
    });
  }

  displaySignUpForm() {
    const handleInputEl = document.createElement('input');
    handleInputEl.placeholder = 'handle';
    handleInputEl.type = 'text';
    handleInputEl.id = 'handle-input';
    
    const passwordInputEl = document.createElement('input');
    passwordInputEl.placeholder = 'password';
    passwordInputEl.type = 'password';
    passwordInputEl.id = 'password-input';

    const submitSignUpButton = document.createElement('button');
    submitSignUpButton.innerText = "Sign Up";
    submitSignUpButton.id = 'sign-up-submit-button';

    document.querySelector('#sign-up-container').append(handleInputEl);
    document.querySelector('#sign-up-container').append(passwordInputEl);
    document.querySelector('#sign-up-container').append(submitSignUpButton);

    submitSignUpButton.addEventListener('click', () => {
      this.register(handleInputEl.value, passwordInputEl.value);
    });
  }

  register(handle, password) {
    this.api.createNewUser(handle, password, (data) => {
      console.log(data);
      this.user.setHandle(data.handle);
      this.user.setUserId(data.id);
      console.log('user registered');
    });
  }

  displayLoginForm() {
    const handleInputEl = document.createElement('input');
    handleInputEl.placeholder = 'handle';
    handleInputEl.type = 'text';
    handleInputEl.id = 'handle-input-login';
    
    const passwordInputEl = document.createElement('input');
    passwordInputEl.placeholder = 'password';
    passwordInputEl.type = 'password';
    passwordInputEl.id = 'password-input-login';

    const submitLoginButton = document.createElement('button');
    submitLoginButton.innerText = "Log In";
    submitLoginButton.id = 'login-submit-button';

    document.querySelector('#login-container').append(handleInputEl);
    document.querySelector('#login-container').append(passwordInputEl);
    document.querySelector('#login-container').append(submitLoginButton);

    submitLoginButton.addEventListener('click', () => {
      this.login(handleInputEl.value, passwordInputEl.value);
    });
  }

  login(handle, password) {
    this.api.newSession(handle, password, (data) => {
      console.log(data);
      this.user.setSessionKey(data.session_key);
      this.user.setHandle(handle);
      this.user.setUserId(data.user_id);
      console.log('user logged in')
    });
  }
};

module.exports = MessagesView;