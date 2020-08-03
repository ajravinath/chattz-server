const express = require('express');
const cors = require('cors');
const path = require('path');

const apiRoutes = require('./api/routes');

const app = express();

app.use(cors());

process.env.PUBLIC_FOLDER = `${process.cwd()}/public`;
const publicDir = process.env.PUBLIC_FOLDER;
app.use(express.static(path.join(publicDir)));

app.get('/', (req, res) => {
  res.send('OK');
});

app.use('/api/v1', apiRoutes);

module.exports = app;
