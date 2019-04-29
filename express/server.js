'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const jokes = require('../jokes');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(jokes.joke());
  res.end();
});
router.get('/specific/:id', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(jokes.joke(req.params.id));
  res.end();
});
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
