const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from .env
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: "API running",
    environment: process.env.NODE_ENV
  });
});

// Import your route files (make sure these exist in your project)
const authRoutes = require('./routes/auth'); // for /api/register and /api/login
const taskRoutes = require('./routes/tasks'); // for /api/tasks endpoints

// Use routes
app.use('/api', authRoutes);
app.use('/api', taskRoutes);

// Set PORT from environment variable or default
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});