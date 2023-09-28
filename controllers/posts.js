// Import the Post model
const Post = require('../models/Post');

// Function to get all posts for a specific user
const getAllPosts = async (req, res) => {
    try {
        // Find all posts that belong to the user specified in the request
        const posts = await Post.find({ user: req.user.id }).populate('user');
        // Respond with a JSON object containing the posts
        res.status(200).json({ posts });
    } catch (error) {
        // Handle errors and respond with a 500 Internal Server Error along with an error message
        res.status(500).json({ msg: error });
    }
}

// Function to create a new post
const createPost = async (req, res) => {
    try {
        // Assign the user ID from the request to the post's user field
        req.body.user = req.user.id;
        // Create a new post using the request body
        const post = await Post.create(req.body);
        // Respond with a JSON object containing the created post
        res.status(201).json({ post });
    } catch (error) {
        // Handle errors and respond with a 500 Internal Server Error along with an error message
        res.status(500).json({ msg: error });
    }
}

// Function to get a specific post by its ID
const getPost = async (req, res) => {
    try {
        // Find a post by its ID specified in the request parameters
        const post = await Post.findById(req.params.id);

        if (!post) {
            // If no post is found, respond with a 404 Not Found and an error message
            return res.status(404).json({ msg: `No post with id: ${req.params.id}` });
        }

        // Respond with a JSON object containing the found post
        res.status(200).json({ post });
    } catch (error) {
        // Handle errors and respond with a 500 Internal Server Error along with an error message
        res.status(500).json({ msg: error });
    }
}

// Function to update a specific post by its ID
const updatePost = async (req, res) => {
    try {
        // Find and update a post by its ID with the data provided in the request body
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,           // Return the updated post
            runValidators: true  // Run validation checks on the updated data
        });

        if (!post) {
            // If no post is found, respond with a 404 Not Found and an error message
            return res.status(404).json({ msg: `No post with id: ${req.params.id}` });
        }

        // Respond with a JSON object containing the updated post
        res.status(200).json({ post });
    } catch (error) {
        // Handle errors and respond with a 500 Internal Server Error along with an error message
        res.status(500).json({ msg: error });
    }
}

// Function to delete a specific post by its ID
const deletePost = async (req, res) => {
    try {
        // Find and delete a post by its ID specified in the request parameters
        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            // If no post is found, respond with a 404 Not Found and an error message
            return res.status(404).json({ msg: `No post with id: ${req.params.id}` });
        }

        // Respond with a JSON object indicating that the post has been deleted
        res.status(200).json({ msg: "Post deleted" });
    } catch (error) {
        // Handle errors and respond with a 500 Internal Server Error along with an error message
        res.status(500).json({ msg: error });
    }
}

// Export the functions as an object for use in other parts of the application
module.exports = {
    getAllPosts,
    createPost,
    getPost,
    updatePost,
    deletePost
};