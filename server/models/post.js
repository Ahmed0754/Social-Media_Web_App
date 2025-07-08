const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Post = mongoose.model("Post", postSchema);

// CREATE
async function createPost(userId, content) {
  return await Post.create({ userId, content });
}

// READ: All posts (with user populated)
async function getAllPosts() {
  return await Post.find().populate("userId", "username");
}

// READ: Posts by specific user
async function getPostsByUser(userId) {
  return await Post.find({ userId }).populate("userId", "username");
}

// UPDATE post
async function updatePost(postId, userId, newContent) {
  const post = await Post.findOneAndUpdate(
    { _id: postId, userId: userId },
    { $set: { content: newContent } },
    { new: true }
  );
  if (!post) throw Error("Post not found or unauthorized");
  return post;
}

// DELETE post
async function deletePost(postId, userId) {
  const deleted = await Post.findOneAndDelete({ _id: postId, userId: userId });
  if (!deleted) throw Error("Post not found or unauthorized");
  return deleted;
}

// LIKE a post
async function likePost(postId, userId) {
  const post = await Post.findById(postId);
  if (!post) throw Error("Post not found");

  if (!post.likes.includes(userId)) {
    post.likes.push(userId);
    await post.save();
  }

  return { message: "Post liked", likes: post.likes.length };
}

module.exports = {
  Post, // keeping this in case you're using it somewhere else
  createPost,
  getAllPosts,
  getPostsByUser,
  updatePost,
  deletePost,
  likePost
};
