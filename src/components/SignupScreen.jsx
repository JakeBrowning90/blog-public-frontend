import React, { useState } from "react";

function SignupScreen() {
  return (
    <div className="screenSignup page">
      Sign Up
      <form action="">
        <form action="">
          <label htmlFor="">
            Username:
            <input type="text" />
          </label>
          <label htmlFor="">
            Email:
            <input type="text" />
          </label>
          <label htmlFor="">
            Password:
            <input type="password" />
          </label>
          <label htmlFor="">
            Confirm Password:
            <input type="password" />
          </label>
          <button>Submit</button>
        </form>
      </form>
    </div>
  );
}

export default SignupScreen;
