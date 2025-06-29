require('dotenv').config();
const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const winston = require('winston');
const { isIPv4, isIPv6 } = require('net');

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.IPGEOLOCATION_API_KEY;
const cache = new NodeCache({ stdTTL: 24 * 60 * 60 }); // 24 hours TTL

// Validate API key presence
if (!apiKey) {
  console.error('IPGEOLOCATION_API_KEY is not set in .env');
  process.exit(1);
}

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'access.log' }),
    new winston.transports.Console()
  ]
});

// Middleware to validate and extract IP
const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.ip;
  if (!ip || (!isIPv4(ip) && !isIPv6(ip))) {
    throw new Error('Invalid or missing IP address');
  }
  console.log("IP Address: " + ip)
  return ip;
};


// Middleware for geolocation check
const restrictToUS = async (req, res, next) => {
  let clientIp;
  try {
    clientIp = getClientIp(req);

    // Check cache
    const cachedResult = cache.get(clientIp);
    if (cachedResult) {
      logger.info(`Cache hit for IP: ${clientIp}, Country: ${cachedResult.country_code2}, Status: ${cachedResult.country_code2 === 'US' ? 200 : 403}`);
      if (cachedResult.country_code2 === 'US') {
        return next();
      }
      return res.status(403).json({ error: 'Access restricted to US users only' });
    }

    // Call ipgeolocation.io API
    const response = await axios.get('https://api.ipgeolocation.io/ipgeo', {
      params: { apiKey, ip: clientIp }
    });

    const { ip, country_code2, country_name } = response.data;
    logger.info(`API response for IP: ${ip}, Country: ${country_code2}, Name: ${country_name}, Status: ${country_code2 === 'US' ? 200 : 403}`);

    // Cache the result
    cache.set(clientIp, { country_code2, country_name });

    // Check if country is US
    if (country_code2 === 'US') {
      return next();
    }

    res.status(403).json({ error: 'Access restricted to US users only' });
  } catch (error) {
    // Log error with clientIp if available, otherwise indicate unknown IP
    const ipForLog = clientIp || 'unknown';
    if (error.response && error.response.status === 429) {
      logger.error(`Rate limit exceeded for IP: ${ipForLog}`);
      return res.status(429).json({ error: 'Rate limit exceeded, try again later' });
    }
    if (error.message === 'Invalid or missing IP address') {
      logger.error(`Invalid or missing IP address for request`);
      return res.status(400).json({ error: error.message });
    }
    logger.error(`Error processing IP: ${ipForLog}, Message: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Sample protected route
app.get('/protected', restrictToUS, (req, res) => {
  res.json({ message: 'Welcome, US user!' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Start server
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

// Error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  process.exit(1);
});

