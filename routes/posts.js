const express = require('express');
const { getAllPosts, createPost, getPost, updatePost, deletePost} = require('../controllers/posts'); // Import controller functions
const authRequired = require('../middlewares/validateToken');

const router = express.Router(); // Create an instance of an Express router

router.route('/posts').get(authRequired, getAllPosts).post(authRequired, createPost);
router.route('/posts/:id').get(authRequired, getPost).delete(authRequired, deletePost).put(authRequired, updatePost);

module.exports = router; // Export the router to make it available for other modules