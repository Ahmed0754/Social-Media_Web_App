import React, { useEffect, useState } from 'react';
import { fetchData } from "../../main.js";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [likes, setLikes] = useState(0);

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

      // Calculate total likes across user's posts
      const totalLikes = data.reduce((sum, post) => sum + (post.likes?.length || 0), 0);
      setLikes(totalLikes);
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

  return (
    <div className="container mt-4">
      <div className="card mb-4 p-3 shadow-sm">
        <h2 className="mb-1">Welcome, {user?.username}</h2>
        <p className="text-muted mb-1">
          Followers: {user?.followers?.length || 0} | Following: {user?.following?.length || 0}
        </p>
        <p className="mb-0">Total Likes on Your Posts: {likes}</p>
      </div>

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
        {posts.map((p, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{p.content}</span>
            <span className="badge bg-primary rounded-pill">
              👍 {p.likes?.length || 0}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
