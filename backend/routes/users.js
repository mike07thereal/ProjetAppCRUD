const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, checkRole } = require('../middleware/authMiddleware');

// Récupérer tous les utilisateurs (admin uniquement)
router.get('/all', protect, checkRole('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password'); // on masque les mots de passe
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// Modifier le rôle d’un utilisateur (admin uniquement)
router.put('/:id', protect, checkRole('admin'), async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

module.exports = router;
