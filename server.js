require('dotenv').config();
const express = require('express');
const connectDB = require('./server/config/db');
const cors = require('cors');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.json());  // This is REQUIRED

// Routes
app.use('/api/contacts', require('./server/routes/contactRoutes'));
app.use('/api/projects', require('./server/routes/projectRoutes'));
app.use('/api/qualifications', require('./server/routes/qualificationRoutes'));
app.use('/api/users', require('./server/routes/userRoutes'));

// Basic route for testing
app.get('/', (req, res) => {
  res.send("Welcome to my Portfolio website's API!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});