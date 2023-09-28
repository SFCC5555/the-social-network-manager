const User = require('../models/User'); // Import the User model
const bcrypt = require('bcryptjs');
const createAccessToken = require('../libs/jwt');

// Controller function to register a user
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the user's password for security
        const passwordHash = await bcrypt.hash(password, 10);

        // Create a new User instance with the provided data
        const newUser = new User({
            username,
            email,
            password: passwordHash
        });

        // Save the new user to the database
        const userSaved = await newUser.save();

        // Create and set a JWT token as a cookie
        const token = await createAccessToken({ id: userSaved._id });
        res.cookie('token', token);

        // Respond with a success message and user information
        res.status(200).json({ msg: 'New user has been created', username, email });

    } catch (error) {
        // Handle server error
        res.status(500).json({ msg: 'Error: ' + error });
    }
};

// Controller function to log in a user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email in the database
        const userFound = await User.findOne({ email });

        // If user not found, return a 400 (Bad Request) response with a message
        if (!userFound) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, userFound.password);

        // If the passwords do not match, return a 400 (Bad Request) response with a message
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Create and set a JWT token as a cookie
        const token = await createAccessToken({ id: userFound._id });
        res.cookie('token', token);

        // Respond with a success message and user email
        res.status(200).json({ msg: 'Successfully logged in', email });

    } catch (error) {
        // Handle server error
        res.status(500).json({ msg: 'Error: ' + error });
    }
};

// Controller function to log out a user
const logout = (req, res) => {
    try {
        // Clear the token cookie by setting it to expire immediately
        res.cookie('token', '', {
            expires: new Date(0)
        });

        // Respond with a success message
        res.status(200).json({ msg: 'Successfully logged out' });

    } catch (error) {
        // Handle server error
        res.status(500).json({ msg: 'Error: ' + error });
    }
};

// Controller function for retrieving user profile
const profile = async (req, res) => {
    try {
        // Find the user by ID in the database
        const userFound = await User.findById(req.user.id);

        // If user not found, return a 400 (Bad Request) response with a message
        if (!userFound) {
            return res.status(400).json({ message: "User not found" });
        }

        // Respond with the user's information
        res.status(200).json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });

    } catch (error) {
        // Handle server error
        res.status(500).json({ msg: 'Error: ' + error });
    }
};

module.exports = {
    register,
    login,
    logout,
    profile
};