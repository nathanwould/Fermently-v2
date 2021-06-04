const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const projectRoutes = require('./routes/projects');
// const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));

// app.use('/api', projectRoutes);
// app.use('/api', userRoutes);

module.exports = app;