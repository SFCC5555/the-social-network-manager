const jwt = require('jsonwebtoken');
const TOKEN_SECRET = require("../config.js"); // Import the secret token key from a configuration file

// Middleware for required authentication
const authRequired = (req, res, next) => {
    const { token } = req.cookies; // Get the token from the request's cookies

    // If no token is provided, return a 401 (Unauthorized) status with an error message
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify the token using the secret key
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        // If there's an error in token verification, return a 403 (Forbidden) status with an error message
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        // If the token is valid, store the user information in the request for future use
        req.user = user;

        // Continue with the execution of the next middleware function
        next();
    });
};

module.exports = authRequired; // Export the required authentication middleware for use in other parts of the application