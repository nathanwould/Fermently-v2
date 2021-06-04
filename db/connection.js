const mongoose = require('mongoose');

let MONGODB_URI = process.env.PROD_MONGODB || 'mongodb://0.0.0.1:00000/projectsDB';

mongoose
  .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Successfully connected to our project database.'))
  .catch((e) => console.error('Connection error', e.message));

  module.exports = mongoose.connection