// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String, // URL to the product image
});

module.exports = mongoose.model('Product', productSchema);
