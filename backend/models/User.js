const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Définir le schéma pour les utilisateurs
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { 
    type: String, 
    enum: ["user", "admin"],
    default: "user" }
});

// Hacher le mot de passe avant de sauvegarder l'utilisateur
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Vérifier si le mot de passe est correct
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// Exporter le modèle
module.exports = mongoose.model('User', userSchema);
