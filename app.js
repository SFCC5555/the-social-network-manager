const express = require('express');
const app = express();
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middlewares/notFound');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Configure allowed origins
const allowedOrigins = ['https://sfcc-the-wall.netlify.app'];

// Configure CORS options
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

// Apply CORS middleware with configured options
app.use(cors());
//app.use(cors(corsOptions));

// Parse JSON from request bodies
app.use(express.json());

// Parse cookies in incoming requests
app.use(cookieParser());

// Define routes for the API
app.use('/api/v1', require('./routes/auth'));
app.use('/api/v1', require('./routes/posts'));

// Handle 404 Not Found errors with the 'notFound' middleware
app.use(notFound);

// Define the port to listen on, defaulting to 3000
const PORT = process.env.PORT || 3000;

// Start the server
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI); // Connect to the MongoDB database
        app.listen(PORT, console.log(`Server is listening on port ${PORT}...`)); // Start the server and log the listening port
    } catch (error) {
        console.log(error); // Log any errors that occur during startup
    }
};

start(); // Call the start function to initiate the server