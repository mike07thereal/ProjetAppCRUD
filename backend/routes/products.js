const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, checkRole } = require('../middleware/authMiddleware');
const User = require('../models/User');


// Route pour récupérer tous les produits
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// Route pour créer un produit (protéger avec 'protect')
router.post('/', protect, async (req, res) => {
  const { name, description, price, quantity } = req.body;  // Ajoute description

  try {
    const product = new Product({ name, description, price, quantity });  // Inclure description
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création du produit", error });
  }
});


// Route pour mettre à jour un produit (protéger avec 'protect' et 'checkRole')
router.put('/:id', protect, checkRole('admin'), async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Produit non trouvé" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// Route pour supprimer un produit (protéger avec 'protect' et 'checkRole')
router.delete('/:id', protect, checkRole('admin'), async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Produit non trouvé" });
    res.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// Route pour récupérer tous les utilisateurs (protéger avec 'protect' et 'checkRole')
router.get('/all', protect, checkRole('admin'), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

module.exports = router;
