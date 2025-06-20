const express = require("express");
const Comment = require("../models/comment");
const router = express.Router();

// CREATE
router.post("/add", async (req, res) => {
  try {
    const { userId, postId, content } = req.body;
    const comment = await Comment.addComment(userId, postId, content);
    res.send(comment);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// READ
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.getCommentsByPost(req.params.postId);
    res.send(comments);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// UPDATE
router.put("/update", async (req, res) => {
  try {
    const { commentId, userId, content } = req.body;
    const updated = await Comment.updateComment(commentId, userId, content);
    res.send(updated);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// DELETE
router.delete("/delete", async (req, res) => {
  try {
    const { commentId, userId } = req.body;
    const deleted = await Comment.deleteComment(commentId, userId);
    res.send({ message: "Comment deleted", deleted });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
