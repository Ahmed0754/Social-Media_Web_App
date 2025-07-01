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
    const hash = await bcrypt.hash(password,salt);

    const newUser = await User.create({
         username: username,
         password: hashed
    });
    return newUser._doc;
}

// LOGIN
async function login(username, password) {
    const user = await getUser(username);
    if (!user) throw Error('User not found!');

    const isMatch = await bcrypt.compare(password, user.password);


    if (! isMatch) throw Error("Wrong password");
    return user._doc;
}

// UPDATE PASSWORD
async function updatePassword(id, password) {
    const user = await User.updateOne({ _id: id }, { $set: { password } });
    return user;
}

// DELETE
async function deleteUser(id) {
    return await User.deleteOne({ _id: id });
}

// UTILITY
async function getUser(username) {
    return await User.findOne({ username });


// Follow and Unfollow different users

}

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
  
  module.exports = { register, login, updatePassword, deleteUser, followUser, unfollowUser };
