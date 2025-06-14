/** 
const mongoose = require("mongoose");

// Define the schema
const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // referencing users who liked the post
});

// Create model
const Post = mongoose.model("Post", postSchema);

// Create a new post
async function createPost(userId, content) {
  const newPost = await Post.create({ userId, content, likes: [] });
  return newPost;
}

// Read post by ID
async function getPost(postId) {
  return await Post.findById(postId).populate('userId').populate('likes');
}

// Update post content
async function updatePost(postId, newContent) {
  return await Post.updateOne({ _id: postId }, { $set: { content: newContent } });
}

// Delete post
async function deletePost(postId) {
  await Post.deleteOne({ _id: postId });
}

// Like a post (adds user ID to likes array)
async function likePost(postId, userId) {
  await Post.updateOne({ _id: postId }, { $addToSet: { likes: userId } });
}

// Unlike a post (removes user ID from likes array)
async function unlikePost(postId, userId) {
  await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
}

// Export functions
module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost
};

**/