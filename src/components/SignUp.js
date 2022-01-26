import React, { useState, useEffect } from "react";
import chitter from "../apis/chitter";

const SignUp = ({ setShowSignIn, setAlert }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [matchingPasswords, setMatchingPasswords] = useState(true);
  const [signUpResponse, setSignUpResponse] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  useEffect(() => {
    if (signUpResponse) {
      setSignedUp(true);
      setSignUpResponse("");
    }
  }, [signUpResponse, setShowSignIn]);

  useEffect(() => {
    password !== confirmation
      ? setMatchingPasswords(false)
      : setMatchingPasswords(true);
  }, [password, confirmation]);

  useEffect(() => {
    if (signedUp) {
      setSignedUp(false);
      setShowSignIn(true);
      setAlert({type: 'success', message: "Registration Successful!"});
    }
    return () => {};
  }, [signedUp, setAlert, setShowSignIn]);

  const onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (username && password && matchingPasswords) {
        const response = await chitter.post("/users", {
          user: {
            handle: username,
            password: password,
          },
        });
        if (response) {
          setSignUpResponse(response);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="ui form signup" onSubmit={onFormSubmit}>
      <h1>Sign Up</h1>
      <div className="field">
        <label htmlFor="signup-username">Username</label>
        <input
          id="signup-username"
          type="text"
          value={username}
          name="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type="password"
          value={password}
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="signup-passwordconfirmation">Confirm Password</label>
        <input
          id="signup-passwordconfirmation"
          type="password"
          value={confirmation}
          name="password-confirmation"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmation(e.target.value)}
          required
        />
      </div>
      {!matchingPasswords ? (
        <div className="ui red message">Passwords do no match!</div>
      ) : (
        ""
      )}
      <div>
        Already have an account?{" "}
        <a href="#" onClick={() => setShowSignIn(true)}>
          Sign In.
        </a>
      </div>
      <br />
      <button className="ui button blue" type="submit">
        Create Account
      </button>
    </form>
  );
};

export default SignUp;
