const mongoose = require('mongoose');

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
    username: {
        type: String, // Data type: String
        required: [true, 'Must provide a username'], // Field is required with a custom error message
        trim: true // Remove whitespace from the beginning and end of the username
    },
    email: {
        type: String, // Data type: String
        required: [true, 'Must provide an email'], // Field is required with a custom error message
        trim: true, // Remove whitespace from the beginning and end of the email
        unique: true // Email field must be unique
    },
    password: {
        type: String, // Data type: String
        required: [true, 'Must provide a password'], // Field is required with a custom error message
    }
}, {
    timestamps: true // Add timestamps for 'createdAt' and 'updatedAt' automatically
});

// Create a model named 'User' using the UserSchema
module.exports = mongoose.model('User', UserSchema);