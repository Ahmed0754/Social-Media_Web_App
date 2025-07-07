import React, { useEffect, useState } from "react";
import { fetchData } from "../../main";

const UsersList = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState(currentUser?.following || []);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const data = await fetchData("/user/all"); // 🔁 You'll need to add this backend route
      const otherUsers = data.filter((u) => u._id !== currentUser._id);
      setUsers(otherUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const toggleFollow = async (targetId) => {
    const isFollowing = following.includes(targetId);
    const endpoint = isFollowing ? "/user/unfollow" : "/user/follow";

    try {
      await fetchData(endpoint, {
        followerId: currentUser._id,
        followeeId: targetId,
      }, "POST");

      const updatedFollowing = isFollowing
        ? following.filter((id) => id !== targetId)
        : [...following, targetId];

      setFollowing(updatedFollowing);

      // Update localStorage
      const updatedUser = { ...currentUser, following: updatedFollowing };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Error toggling follow:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Users</h4>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {user.username}
            <button
              className={`btn ${following.includes(user._id) ? "btn-danger" : "btn-success"}`}
              onClick={() => toggleFollow(user._id)}
            >
              {following.includes(user._id) ? "Unfollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
