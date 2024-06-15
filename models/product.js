const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0, // Enforce non-negative stock
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Enforce non-negative price
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
}, { timestamps: true }); // Include timestamps for created and updated at

module.exports = mongoose.model('Product', productSchema);
