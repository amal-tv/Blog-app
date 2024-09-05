const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const verifyToken = require('../verifyToken');
const upload = require('../multerConfig'); // Import multer configuration
const mongoose = require('mongoose');

// Create a new post
router.post('/create', upload.single('photo'), async (req, res) => {
    try {
        const categories = JSON.parse(req.body.categories);

      const newPost = new Post({
        title: req.body.title,
        desc: req.body.desc,
        categories: categories,
        photo: req.file ? req.file.path : '',
        username: req.body.username,
        userId: req.body.userId
      });
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  });
  
// Update a post
router.put('/:id', verifyToken, upload.single('photo'), async (req, res) => {
    try {
      const categories = JSON.parse(req.body.categories);
  
      // Find the existing post
      const existingPost = await Post.findById(req.params.id);
  
      if (!existingPost) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Determine the photo path to use
      const photoPath = req.file ? req.file.path : existingPost.photo;
  
      // Update the post
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          desc: req.body.desc,
          categories: categories,
          photo: photoPath, // Use new photo if provided, else keep existing
          username: req.body.username,
          userId: req.body.userId
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (err) {
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  });
    
// Delete a post and coomments
router.delete('/:id', verifyToken, async (req, res) => { //used mongodb session causee what if the posts not delted and all the comment delted.session makes all wooks as a unit.it rollback if one fails

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // Find and delete the post
        const deletedPost = await Post.findByIdAndDelete(req.params.id).session(session);

        if (!deletedPost) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Post not found" });
        }

        // Delete all comments related to the deleted post
        await Comment.deleteMany({ postId: req.params.id }).session(session);

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: "Post and associated comments deleted successfully" });
    } catch (err) {
        // Abort the transaction in case of error
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});


// Get a single post by ID
router.get('/:id', async (req, res) => {
    console.log("siingle post");
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post retrieved successfully", post });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

// Get all posts
router.get('/', async (req, res) => {
    // console.log("it is posts eaijng");
    try {
        const filter = req.query.filter || "";

        // Use regex for flexible matching
        const allPosts = await Post.find({
            title : { $regex: filter, $options: 'i' } // 'i' for case-insensitive matching
        });

        res.status(200).json(allPosts);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

//get a siingle user posts
router.get('/user/:userId', async (req, res) => {
    try {
        const posts = await Post.find({userId : req.params.userId});
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});




module.exports = router;
