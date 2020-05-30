import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LoginContext from './loginContext';

function SignUpLogIn() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [, login] = useContext(LoginContext);
  const history = useHistory();

  const handleSignup = (evt) => {
    evt.preventDefault();
    const data = { user: { handle: name, password } };

    function processSignupResponse(response) {
      if (
        response.handle !== undefined &&
        response.handle[0] === 'has already been taken'
      ) {
        setMessage(
          'Sorry, that name has already been taken, please choose another'
        );
      } else {
        setMessage('Successfully signed up. Please log in');
      }
    }

    async function sendSignupRequest() {
      fetch('https://chitter-backend-api-v2.herokuapp.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((responseJSON) => {
          processSignupResponse(responseJSON);
        });
    }

    sendSignupRequest();
  };

  const handleLogin = (evt) => {
    evt.preventDefault();
    const data = { session: { handle: name, password } };

    function processLoginResponse(response) {
      if (response.errors !== undefined) {
        setMessage('Sorry, invalid username or password, please try again');
      } else {
        setMessage('All good, nothing to see here');
        login(response.user_id, response.session_key, name);
        history.push('/peeps');
      }
    }

    async function sendLoginRequest() {
      fetch('https://chitter-backend-api-v2.herokuapp.com/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((responseJSON) => {
          processLoginResponse(responseJSON);
        });
    }

    sendLoginRequest();
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={handleSignup}>
            Sign up
          </button>
          <button type="button" onClick={handleLogin}>
            Log in
          </button>
        </div>
        <div>{message}</div>
      </form>
    </div>
  );
}

export default SignUpLogIn;
