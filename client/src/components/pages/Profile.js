import React, { useEffect, useState } from 'react';
import { fetchData } from "../../main.js";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentingOn, setCommentingOn] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || !user._id) {
      navigate('/login');
    } else {
      fetchUserPosts();
    }
  }, []);

  const fetchUserPosts = async () => {
    try {
      const data = await fetchData(`/api/posts/user/${user._id}`);
      setPosts(data);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  const createPost = async (e) => {
    e.preventDefault();
    try {
      await fetchData('/api/posts', {
        content,
        userId: user._id
      }, 'POST');
      setContent('');
      fetchUserPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      await fetchData(`/api/comments/add`, {
        userId: user._id,
        postId: commentingOn,
        content: commentContent
      }, 'POST');
      setCommentContent('');
      setCommentingOn(null);
      fetchUserPosts();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await fetchData(`/api/comments/delete`, {
        commentId,
        userId: user._id
      }, 'DELETE');
      fetchUserPosts();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Welcome, {user?.username}</h2>

      <form onSubmit={createPost} className="mb-4">
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="3"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Post</button>
      </form>

      <h5>Your Posts:</h5>
      <ul className="list-group">
        {posts.map((post) => (
          <li key={post._id} className="list-group-item mb-3">
            <p><strong>Post:</strong> {post.content}</p>
            <small className="text-muted">Likes: {post.likes?.length || 0}</small>

            <div className="mt-2">
              <button
                className="btn btn-sm btn-outline-secondary me-2"
                onClick={() => setCommentingOn(post._id)}
              >
                💬 Add Comment
              </button>
            </div>

            {commentingOn === post._id && (
              <form onSubmit={addComment} className="mt-2">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Write a comment..."
                    required
                  />
                  <button className="btn btn-primary" type="submit">Post</button>
                </div>
              </form>
            )}

            {post.comments?.length > 0 && (
              <ul className="list-group mt-3">
                {post.comments.map((c) => (
                  <li key={c._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>
                      <strong>{c.userId?.username}:</strong> {c.content}
                    </span>
                    {c.userId?._id === user._id && (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteComment(c._id)}
                      >
                        🗑
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
