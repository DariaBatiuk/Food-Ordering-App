const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config/settings');

console.log({ MONGODB_URI });

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).catch((e) => {
  console.error('Connection error', e.message);
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
