const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  followers: [String],
  following: [String]
});

const User = mongoose.model("User", userSchema);

// REGISTER
async function register(username, password) {
  const user = await getUser(username);
  if (user) throw Error('Username is already in use');

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username: username,
    password: hash  // <-- fixed here: use 'hash' not 'hashed'
  });

  return newUser._doc;
}

async function login(username, password) {
    const user = await getUser(username);
    if (!user) throw Error('User not found!');
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Wrong password");
  
    return {
      _id: user._id,
      username: user.username,
      followers: user.followers,
      following: user.following
    };
  }

// UPDATE PASSWORD
async function updatePassword(id, password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const updatedUser = await User.updateOne({ _id: id }, { $set: { password: hash } });
  return updatedUser;
}

// DELETE USER
async function deleteUser(id) {
  return await User.deleteOne({ _id: id });
}

// GET USER BY USERNAME
async function getUser(username) {
  return await User.findOne({ username });
}

// FOLLOW USER
async function followUser(followerId, followeeId) {
  if (followerId === followeeId) throw Error("Users can't follow themselves");

  const follower = await User.findById(followerId);
  const followee = await User.findById(followeeId);

  if (!follower || !followee) throw Error("User not found");

  if (!follower.following.includes(followeeId)) {
    follower.following.push(followeeId);
    followee.followers.push(followerId);

    await follower.save();
    await followee.save();
  }

  return { message: "Followed successfully" };
}

// UNFOLLOW USER
async function unfollowUser(followerId, followeeId) {
  const follower = await User.findById(followerId);
  const followee = await User.findById(followeeId);

  if (!follower || !followee) throw Error("User not found");

  follower.following = follower.following.filter(id => id !== followeeId);
  followee.followers = followee.followers.filter(id => id !== followerId);

  await follower.save();
  await followee.save();

  return { message: "Unfollowed successfully" };
}

async function getAllUsers() {
    return await User.find({}, "_id username");
  }

module.exports = {
  register,
  login,
  updatePassword,
  deleteUser,
  followUser,
  unfollowUser,
  getAllUsers
};
