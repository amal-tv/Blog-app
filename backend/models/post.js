const mongoose = require('mongoose');
const User = require('./user');

// Define the Post schema
const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true  // Ensure the title is provided
  },
  desc: {
    type: String,
    required: true  // Ensure the description is provided
  },
  categories: {
    type: [String],  // Use an array of strings for categories
    default: []     // Default to an empty array if no categories are provided
  },
  photo:
  {
    type: String,

  },
  username: {
    type: String,
    required: true  // Ensure the username is provided
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref : User,
    required: true  // Ensure the user ID is provided
  }
}, {
  timestamps: true  // Add createdAt and updatedAt fields automatically
});


const Post = mongoose.model('Post', postsSchema);

// Export the Post model
module.exports = Post;
