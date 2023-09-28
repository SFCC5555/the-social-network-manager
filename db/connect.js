const mongoose = require('mongoose');

// Define a function to connect to the MongoDB database using the provided URL
const connectDB = (url) => {
    return mongoose.connect(url); // Return the promise returned by mongoose.connect
}

// Export the connectDB function to make it available for other modules
module.exports = connectDB;