const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Route d'inscription
router.post('/register', async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'L\'utilisateur avec cet email existe déjà' });
    }

    // Vérification pour éviter les doublons de `username`
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: 'Le nom d\'utilisateur est déjà pris' });
    }

    const user = await User.create({
      name,
      email,
      username,
      password,
    });

    const token = jwt.sign({ id: user._id }, 'votre_clé_secrète', {
      expiresIn: '30d',
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès', token });
  } catch (error) {
    // Si l'erreur vient d'un duplicata à cause du champ unique de MongoDB
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Un utilisateur avec ce nom d\'utilisateur ou email existe déjà',
      });
    }

    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

// Route de connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ id: user._id }, 'votre_clé_secrète', {
      expiresIn: '30d',
    });

    res.json({
      message: 'Connexion réussie',
      token,
      username: user.username,
      role: user.role,
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

module.exports = router;
