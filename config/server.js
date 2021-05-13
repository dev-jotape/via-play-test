
const express = require('express');
const { cacheMiddleware } = require('./cacheMiddleware');
require('dotenv').config()

const app = express();

app.use(express.json());
  
app.use(cacheMiddleware);

app.set('port', (process.env.PORT  || 5000));

module.exports = app;