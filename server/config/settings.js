const { config } = require('dotenv');

config({ path: '../.env' });

const ORIGINS = ['http://localhost:3000'];

const {
  PORT = 8080,
  MONGO_PORT = 27017,
  MONGO_HOST = '127.0.0.1',
  MONGO_DB = 'food-ordering',
  MONGODB_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`,
  MONGO_USER = null,
  MONGO_PASSWORD = null,
  STRIPE_SECRET_KEY = '',
  STRIPE_WEBHOOK_SECRET = '',
} = process.env;

module.exports = {
  PORT,
  MONGO_PORT,
  MONGO_HOST,
  MONGODB_URI,
  MONGO_USER,
  MONGO_PASSWORD,
  ORIGINS,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
};
