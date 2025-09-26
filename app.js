const express = require('express');
const rateLimit = require('express-rate-limit');
const waitlistRoutes = require('./routes/waitlistRoute');

const app = express();

if (process.env.NODE_ENV === 'development') {
  console.log('NODE_ENV:', process.env.NODE_ENV);
}

// app.set('trust proxy', 1);
// console.log('trust proxy setting:', app.get('trust proxy'));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // Fixed typo (100 -> 1000 for milliseconds)
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));

// Custom data sanitization
app.use((req, res, next) => {
  const sanitize = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    for (let key in obj) {
      if (/^\$/.test(key) || /\./.test(key)) {
        const safeKey = key.replace(/^\$|\./g, '_');
        obj[safeKey] = obj[key];
        delete obj[key];
      }
    }
  };

  sanitize(req.body);
  sanitize(req.query);
  sanitize(req.params);
  next();
});

app.use('/api/v1/waitlist', waitlistRoutes);

module.exports = app;
