const mongoose = require('mongoose');

// Define the Comment schema
const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the Post model
    ref: 'Post',  // Name of the Post model
    required: true
  },
  userId : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User',
      required : true
  }
}, {
  timestamps: true  // Add createdAt and updatedAt fields automatically
});

// Create the Comment model from the schema
const Comment = mongoose.model('Comment', commentSchema);

// Export the Comment model
module.exports = Comment;
