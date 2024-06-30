import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [viewLogin, setViewLogin] = useState(false);
  const [viewSignup, setViewSignup] = useState(false);
  const [viewPostList, setViewPostList] = useState(true);
  const [viewPostDetail, setViewPostDetail] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const navToLogin = () => {
    setViewLogin(true);
    setViewSignup(false);
    setViewPostList(false);
    setViewPostDetail(false);
  };

  const navToSignup = () => {
    setViewLogin(false);
    setViewSignup(true);
    setViewPostList(false);
    setViewPostDetail(false);
  };

  const navToPostList = () => {
    setViewLogin(false);
    setViewSignup(false);
    setViewPostList(true);
    setViewPostDetail(false);
  };

  const navToPostDetail = () => {
    setViewLogin(false);
    setViewSignup(false);
    setViewPostList(false);
    setViewPostDetail(true);
  };

  return (
    <>
      <header>
        <div onClick={navToPostList}>Home</div>
        {currentUser ? (
          <nav>
            <div>{currentUser}</div>
            <div>Logout</div>
          </nav>
        ) : (
          <nav>
            <div>Visitor</div>
            <div onClick={navToLogin}>Log in</div>
            <div onClick={navToSignup}>Sign up</div>
          </nav>
        )}
      </header>
      {viewLogin && <div className="screenLogin">Login</div>}
      {viewSignup && <div className="screenSignup">Sign-up</div>}
      {viewPostList && <div className="screenPostList">Post List</div>}
      {viewPostDetail && <div className="screenPostDetail">Post Detail</div>}
    </>
  );
}

export default App;
