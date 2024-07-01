import { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import PostListScreen from "./components/PostListScreen";
import PostDetailScreen from "./components/PostDetailScreen";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [viewLogin, setViewLogin] = useState(false);
  const [viewSignup, setViewSignup] = useState(false);
  const [viewPostList, setViewPostList] = useState(true);
  const [viewPostDetail, setViewPostDetail] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [currentPost, setCurrentPost] = useState("");

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
      {viewLogin && <LoginScreen />}
      {viewSignup && <SignupScreen />}
      {viewPostList && (
        <PostListScreen
          // currentPost={currentPost}
          setCurrentPost={setCurrentPost}
          navToPostDetail={navToPostDetail}
        />
      )}
      {viewPostDetail && <PostDetailScreen currentPost={currentPost} />}
    </>
  );
}

export default App;
