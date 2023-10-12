require('dotenv').config();
const express = require('express');
const run = require('./utils/dbConnection');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
run().catch(console.dir);

// Routes
app.use('/users', userRoutes); // User routes
app.use('/books', bookRoutes); // Book routes

// Error Handling Middleware
app.use(errorMiddleware);

// Server initialization
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
