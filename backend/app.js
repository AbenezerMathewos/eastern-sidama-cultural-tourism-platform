const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const experienceRouter = require('./routes/experienceRoutes');
const userRouter = require('./routes/userRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const hostApplicationRouter = require('./routes/hostApplicationRoutes');
const guideApplicationRouter = require('./routes/guideApplicationRoutes');
const walletRouter = require('./routes/walletRoutes');
const withdrawalRouter = require('./routes/withdrawalRoutes');
const adminPayoutRouter = require('./routes/admin/payoutRoutes');
const notificationRouter = require('./routes/notificationRoutes');
const experienceGuideApplicationRouter = require('./routes/experienceGuideApplicationRoutes');
const messageRouter = require('./routes/messageRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(s => s.trim())
  : [
      'http://localhost:8080',
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:8080',
      'http://10.5.214.91:8080'
    ];

app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      const isLocalNetwork = /^http:\/\/(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(
        origin
      );
      if (allowedOrigins.indexOf(origin) !== -1 || isLocalNetwork) {
        callback(null, true);
      } else {
        console.log(
          `CORS blocked origin: ${origin}. Allowed origins:`,
          allowedOrigins
        );
        callback(new Error('CORS policy: This origin is not allowed.'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 100,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());

app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

// STATIC FILES
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
}

const uploadsDir = path.join(__dirname, 'uploads');
if (fs.existsSync(uploadsDir)) {
  app.use('/uploads', express.static(uploadsDir));
  console.log('✅ Uploads directory is now accessible at /uploads');
}

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/experiences', experienceRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/host-applications', hostApplicationRouter);
app.use('/api/v1/guide-applications', guideApplicationRouter);

// --- FIXED PLURALIZATION FOR WALLET DASHBOARD ---
app.use('/api/v1/wallets', walletRouter);

app.use('/api/v1/withdrawals', withdrawalRouter);
app.use('/api/v1/admin/payouts', adminPayoutRouter);
app.use('/api/v1/notifications', notificationRouter);
app.use('/api/v1/experience-guides', experienceGuideApplicationRouter);
app.use('/api/v1/messages', messageRouter);

// Health-check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
