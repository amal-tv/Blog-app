const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const verifyToken = require('../verifyToken');
// Create a new comment
router.post('/create', verifyToken, async (req, res) => {
    console.log("reaching create comment");
    try {
        // Check that required fields are present
        if (!req.body.postId || !req.body.comment || !req.body.author || !req.body.userId) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        const newComment = new Comment(req.body);
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Update a comment
router.put('/:id',verifyToken, async (req, res) => {
  try {
      // Validate userId if it is being updated
      if (req.body.userId) {
          const userExists = await Comment.findById(req.body.userId);
          if (!userExists) {
              return res.status(400).json({ message: "Invalid userId" });
          }
      }
      
      // Perform the update
      const updatedComment = await Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      
      if (!updatedComment) {
          return res.status(404).json({ message: "comment not found" });
      }
      res.status(200).json({ message: 'comment updated successfully', updatedComment});
  } catch (err) {
      res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// Delete a cmment
router.delete('/:id',verifyToken, async (req, res) => {
    console.log("dele comment");
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ message: "comment not found" });
        }
        res.status(200).json({ message: "comment deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});




//get a post comment
router.get('/post/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({postId : req.params.postId});
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});




module.exports = router;
