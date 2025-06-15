const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Post = mongoose.model("Post", postSchema);

// CREATE
async function createPost(userId, content) {
  const newPost = await Post.create({ userId, content });
  return newPost;
}

// READ (by user)
async function getPostsByUser(userId) {
  return await Post.find({ userId }).populate('userId', 'username');
}

// UPDATE post content
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

module.exports = {
  createPost,
  getPostsByUser,
  updatePost,
  deletePost
};
