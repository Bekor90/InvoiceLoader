const express = require('express');
const app = express();

app.use( require('./invoice'));
app.use( require('./weather'));

module.exports = app;