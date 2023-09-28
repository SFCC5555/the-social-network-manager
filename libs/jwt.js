const TOKEN_SECRET = require("../config.js");
const jwt = require('jsonwebtoken');

// Function to create an access token with the provided payload
function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d" // Set the token expiration to 1 day
            },
            (err, token) => {
                if (err) {
                    reject(err); // If there's an error, reject the promise with the error
                } else {
                    resolve(token); // If successful, resolve the promise with the generated token
                }
            }
        );
    });
}

module.exports = createAccessToken; // Export the function to create access tokens for use in other parts of the application
