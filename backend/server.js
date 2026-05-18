const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '.env') });
} else {
  require('dotenv').config({ path: path.join(__dirname, '.env') });
}

const app = require('./app');

// ====================== CORS SETUP (MUST BE BEFORE ROUTES) ======================
const cors = require('cors');

app.use(
  cors({
    origin: [
      'http://localhost:8080',
      'http://127.0.0.1:8080',
      'http://localhost:5173'
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

app.options('*', cors());
// ===============================================================================

// Prefer a hosted DATABASE env var, fall back to local connection string
let DB = process.env.DATABASE || process.env.DATABASE_LOCAL;

// Validate database connection string
if (!DB) {
  console.error('ERROR: DATABASE connection string is not set!');
  console.error('Please set the DATABASE environment variable.');
  process.exit(1);
}

// Trim whitespace
DB = DB.trim();

// Connect to MongoDB
mongoose
  .connect(DB, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000
  })
  .then(() => {
    console.log('DB connection successful!');
  })
  .catch(err => {
    console.error('DB connection error:', err.message);
    process.exit(1);
  });

// Start Server
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const server = app.listen(port, host, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
