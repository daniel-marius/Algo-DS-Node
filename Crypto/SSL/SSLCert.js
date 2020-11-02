const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3443;

const fs = require('fs');
const path = require('path');
const https = require('https');

const express = require('express');
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");

const LIMIT = rateLimit({
  max: 100, // max requests
  windowMs: 60 * 60 * 1000, // 1 Hour
  message: 'Too many requests' // message to send
});

// Options for cors midddleware
const OPTIONS = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: `https://localhost:${PORT}`,
  preflightContinue: false,
};

const app = express();

// Middlewares
// Helmet can help protect your app from some well-known web vulnerabilities
// by setting HTTP headers appropriately
app.use(helmet({
  frameguard: {
    action: 'deny'
  }
}));
// Enables CORS with various options
app.use(cors(OPTIONS));
// Data sanitization against XSS
app.use(xss());

app.use('/', LIMIT, (req, res, next) => {
  res.send('Hello from SSL Server!');
});

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
  },
  app
);

sslServer.listen(PORT, () => {
  console.log(`Secure ssl server running on port: ${PORT}`);
});

// Redirect http requests to use https in production
if (NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
