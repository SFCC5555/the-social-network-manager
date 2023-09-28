const express = require('express');
const { register, login, logout, profile } = require('../controllers/auth'); // Import controller functions
const authRequired = require('../middlewares/validateToken');

const router = express.Router(); // Create an instance of an Express router

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/profile').get(authRequired,profile);

module.exports = router; // Export the router to make it available for other modules