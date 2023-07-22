const mongoose = require('mongoose');

const {
  MONGO_DB, MONGO_HOST, MONGO_PORT 
} = require('../config/settings');

mongoose
  .connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, { useNewUrlParser: true })
  .catch((e) => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
