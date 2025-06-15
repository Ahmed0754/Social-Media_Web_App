const express = require("express");
const Post = require('../models/post');
const router = express.Router();

router
  .post('/create', async (req, res) => {
    try {
      const { userId, content } = req.body;
      const post = await Post.createPost(userId, content);
      res.send(post);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  })

  .get('/user/:userId', async (req, res) => {
    try {
      const posts = await Post.getPostsByUser(req.params.userId);
      res.send(posts);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  })

  .put('/update', async (req, res) => {
    try {
      const { postId, userId, content } = req.body;
      const updated = await Post.updatePost(postId, userId, content);
      res.send(updated);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      const { postId, userId } = req.body;
      const deleted = await Post.deletePost(postId, userId);
      res.send({ message: "Post deleted successfully", post: deleted });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

module.exports = router;
