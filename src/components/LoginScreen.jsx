import React, { useState } from "react";
import { apiurl } from "../apiSource";

function LoginScreen({
  email,
  password,
  handleEmail,
  handlePassword,
  setCurrentUser,
  navToPostList,
}) {
  const [invalidLogin, setInvalidLogin] = useState(false);
  // TODO - Add fetch for login
  async function submitLogin(e) {
    e.preventDefault();
    const response = await fetch(apiurl + "users/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });
    if (response.status != 200) {
      setInvalidLogin(true);
    } else {
      const loginResponse = await response.json();
      localStorage.setItem("username", loginResponse.username);
      localStorage.setItem("id", loginResponse.id);
      localStorage.setItem("token", `Bearer ${loginResponse.token}`);
      setCurrentUser(loginResponse.username);
      setInvalidLogin(false);
      navToPostList();
    }
  }
  return (
    <div className="screenLogin page">
      Log In
      {invalidLogin && <p>Incorrect email / password. Please try again.</p>}
      <form className="userForm" onSubmit={submitLogin}>
        <label htmlFor="">
          Email:
          <input
            name="email"
            type="text"
            id="email"
            value={email}
            onChange={handleEmail}
          />
        </label>
        <label htmlFor="">
          Password:
          <input
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
          />
        </label>
        <button>Submit</button>
      </form>
      <a
        className="navWord bodyLink"
        href="https://blog-private-frontend.fly.dev/"
        target="_blank"
      >
        Go to private site
      </a>
    </div>
  );
}

export default LoginScreen;
