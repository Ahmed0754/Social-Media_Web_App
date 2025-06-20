const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model("Comment", commentSchema);

// CREATE
async function addComment(userId, postId, content) {
  return await Comment.create({ userId, postId, content });
}

// READ all comments for a post
async function getCommentsByPost(postId) {
  return await Comment.find({ postId }).populate('userId', 'username');
}

// UPDATE comment 
async function updateComment(commentId, userId, newContent) {
  const comment = await Comment.findOneAndUpdate(
    { _id: commentId, userId },
    { $set: { content: newContent } },
    { new: true }
  );
  if (!comment) throw Error("Comment not found or unauthorized");
  return comment;
}

// DELETE comment 
async function deleteComment(commentId, userId) {
  const deleted = await Comment.findOneAndDelete({ _id: commentId, userId });
  if (!deleted) throw Error("Comment not found or unauthorized");
  return deleted;
}

module.exports = {
  addComment,
  getCommentsByPost,
  updateComment,
  deleteComment
};
