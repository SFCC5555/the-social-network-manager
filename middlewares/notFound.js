// Define a middleware function to handle 404 "Not Found" errors
const notFound = (req, res) => {
    res.status(404).send('Route does not exist'); // Send a response with a 404 status code and a message
};

// Export the notFound middleware function to make it available for other modules
module.exports = notFound;