// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Parses incoming JSON requests
app.use('/uploads', express.static('uploads')); // Serve uploaded files statically

// API Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));