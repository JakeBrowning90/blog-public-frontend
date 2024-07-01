import React, { useState, useEffect } from "react";

function PostDetailScreen({ currentPost }) {
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    fetch(
      `https://jakebrowning-blog-api.fly.dev/posts/${currentPost.id}/comments`,
      {
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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

      <ul>
        {commentsList.map((comment) => {
          return (
            <li key={comment.id}>
              <p>{comment.user.full_name}</p>
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
