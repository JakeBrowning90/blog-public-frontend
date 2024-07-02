import React, { useState } from "react";
import { apiurl } from "../apiSource";

function SignupScreen({ navToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupErrors, setSignupErrors] = useState([]);

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  // TODO: Add function to POST new user
  async function submitSignup(e) {
    e.preventDefault();
    const response = await fetch(apiurl + "users/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        confirm_password: confirmPassword,
      }),
    });
    const signupResponse = await response.json();
    if (Array.isArray(signupResponse)) {
      setSignupErrors(signupResponse);
    } else {
      navToLogin();
    }
  }

  return (
    <div className="screenSignup page">
      Sign Up
      <form className="signupForm" onSubmit={submitSignup}>
        <ul className="errorList">
          {signupErrors.map((err) => {
            return <li key={signupErrors.indexOf(err)}>{err.msg}</li>;
          })}
        </ul>
        <label htmlFor="username">
          Username:
          <input
            name="username"
            type="text"
            id="username"
            value={username}
            onChange={handleUsername}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="text"
            id="email"
            value={email}
            onChange={handleEmail}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
          />
        </label>
        <label htmlFor="confirmPassword">
          Confirm Password:
          <input
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
        </label>
        <button>Create User</button>
      </form>
    </div>
  );
}

export default SignupScreen;
