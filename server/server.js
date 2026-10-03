import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDBStatus } from './config/db.js';
import searchRoutes from './routes/searchRoutes.js';
import authRoutes from './routes/authRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database (with graceful offline / in-memory fallback)
connectDB();

// Middleware
app.use(cors({
  origin: '*', // Allow frontend access in development and deployment
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health and System Status Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    app: 'Study Resource Finder API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    geminiConfigured: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_api_key_here'),
    database: getDBStatus()
  });
});

// Mount Routes per SRS Table 7 & Section 10
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);

// Root informative endpoint
app.get('/', (req, res) => {
  res.send({
    message: 'Study Resource Finder - Backend API Server is active.',
    endpoints: {
      search: 'GET /api/search?q=<topic>',
      popular: 'GET /api/search/popular',
      health: 'GET /api/health'
    }
  });
});

// Centralized Error Handling Middleware (FR-13, NFR 9.2, Section 13)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Study Resource Finder API Server running on port ${PORT}`);
  console.log(`📡 Search Endpoint: http://localhost:${PORT}/api/search?q=Python%20Inheritance`);
  console.log(`💡 Free-Tier Zero-Key Fallback: ACTIVE & READY`);
  console.log(`=======================================================`);
});

export default app;
