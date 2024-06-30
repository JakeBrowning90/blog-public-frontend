import React, { useState } from "react";

function LoginScreen() {
  return (
    <div className="screenLogin page">
        Log In
      <form action="">
        <label htmlFor="">
          Email:
          <input type="text" />
        </label>
        <label htmlFor="">
          Password:
          <input type="password" />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default LoginScreen;
