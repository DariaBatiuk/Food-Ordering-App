const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    requireed: true,
  },
});

const productSchema = new Schema({
  name: {
    type: String,
    requireed: true,
  },
	adjective: {
    type: String,
    requireed: true,
  },
	description: {
    type: String,
    requireed: true,
  },
	price: {
    type: String,
    requireed: true,
  },
	category: {
    type: String,
    requireed: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
