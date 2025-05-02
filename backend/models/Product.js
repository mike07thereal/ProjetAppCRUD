const mongoose = require('mongoose');

// Définir le schéma pour les produits
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Exporter le modèle
module.exports = mongoose.model('Product', productSchema);
