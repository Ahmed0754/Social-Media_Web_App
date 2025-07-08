const express = require("express");
const Post = require('../models/post');
const Comment = require('../models/comment'); // add
const router = express.Router();

// GET posts by userId (ObjectId) + comments
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Post.getPostsByUser(req.params.userId);

    // Fetch and attach comments
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const comments = await Comment.getCommentsByPost(post._id);
        return { ...post.toObject(), comments };
      })
    );

    res.json(postsWithComments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all posts with user info and comments
router.get("/all", async (req, res) => {
  try {
    const posts = await Post.getAllPosts(); 
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const comments = await Comment.getCommentsByPost(post._id);
        return { ...post.toObject(), comments };
      })
    );
    res.json(postsWithComments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create post
router.post('/', async (req, res) => {
  try {
    const { userId, content } = req.body;
    if (!userId || !content) {
      return res.status(400).json({ message: "Missing content or userId" });
    }
    const post = await Post.createPost(userId, content);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update post
router.put('/update', async (req, res) => {
  try {
    const { postId, userId, content } = req.body;
    const updated = await Post.updatePost(postId, userId, content);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete post
router.delete('/delete', async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const deleted = await Post.deletePost(postId, userId);
    res.json({ message: "Post deleted successfully", post: deleted });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Like post
router.post("/like", async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const post = await Post.likePost(postId, userId); // 
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
