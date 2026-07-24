const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Global Middleware
app.use(cors({
  origin: '*', // Allow frontend dev server requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health Check Route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/todos', todoRoutes);

// Catch 404 Route Not Found
app.use((req, res, next) => {
  const ApiError = require('./errors/ApiError');
  next(ApiError.notFound(`Endpoint '${req.originalUrl}' not found.`));
});

// Global Error Handler Middleware
app.use(errorHandler);

module.exports = app;
