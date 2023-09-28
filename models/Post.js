const mongoose = require('mongoose');

// Define the schema for the Post model
const PostSchema = new mongoose.Schema({
    content: {
        type: String, // Data type: String
        required: [true, 'Must provide content'], // Field is required with a custom error message
        trim: true // Remove whitespace from the beginning and end of the content
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Data type: String
        ref: 'User',
        required:true
    },
    date: {
        type: Date,
        default: Date.now // Default value: current date and time
    },
    likes: {
        type: Number, // Data type: Number
        required: [true, 'Must provide the number of likes'], // Field is required with a custom error message
    },
}, {
    timestamps: true // Automatically add timestamps for 'createdAt' and 'updatedAt'
});

// Create a model named 'Post' using the PostSchema
module.exports = mongoose.model('Post', PostSchema);