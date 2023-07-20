const mongoose = require('mongoose');

const { MONGO_DB, MONGO_HOST, MONGO_PORT, MONGO_USER, MONGO_PASSWORD } = require('../config/settings');

mongoose
    .connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    });

const db = mongoose.connection

module.exports = db