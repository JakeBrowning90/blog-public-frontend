import React, { useState, useEffect } from "react";
import { apiurl } from "../apiSource";

function PostDetailScreen({ currentPost, currentUser, navToPostDetail }) {
  const [commentsList, setCommentsList] = useState([]);
  const [commentErrors, setCommentErrors] = useState([]);
  const [commentBody, setCommentBody] = useState("");

  function handleCommentBody(e) {
    setCommentBody(e.target.value);
  }

  async function submitComment(e) {
    e.preventDefault();
    const response = await fetch(apiurl + "comments/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        body: commentBody,
        user: localStorage.getItem("id"),
        post: currentPost.id,
      }),
    });
    const commentResponse = await response.json();
    if (Array.isArray(commentResponse)) {
      setCommentErrors(commentResponse);
    } else {
      setCommentsList([...commentsList, commentResponse])
      setCommentBody("");
    }
  }

  useEffect(() => {
    fetch(apiurl + `posts/${currentPost.id}/comments`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Comments fetch error");
        }
        return response.json();
      })
      .then((response) => setCommentsList(response))
      .catch((error) => setError(error));
  }, []);

  return (
    <div className="screenPostDetail page">
      <h2>{currentPost.title} </h2>
      <h3>{currentPost.subtitle}</h3>
      <p>By {currentPost.user.full_name}</p>
      <p>Originally written: {new Date(currentPost.createdAt).toUTCString()}</p>
      <p>Last updated: {new Date(currentPost.updatedAt).toUTCString()}</p>
      <p>{currentPost.body}</p>

      <p>Discussion:</p>

      {currentUser ? (
        <form onSubmit={submitComment}>
          <label htmlFor="">
            Comment:
            <textarea
              name="commentBody"
              type="text"
              minLength="1"
              maxLength="500"
              rows="6"
              placeholder="Max 500 characters"
              value={commentBody}
              onChange={handleCommentBody}
              required
            ></textarea>
          </label>
          <button>Submit</button>
        </form>
      ) : (
        <div>Sign in to post a comment.</div>
      )}

      <ul>
        {commentsList.map((comment) => {
          return (
            <li key={comment.id} className="commentLI">
              <p>{comment.user.username}</p>
              <p>{new Date(comment.timestamp).toUTCString()}</p>
              <p>{comment.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PostDetailScreen;
