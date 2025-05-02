import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",  // Nouveau champ pour la confirmation du mot de passe
  });

  const [errorMessage, setErrorMessage] = useState("");  // Message d'erreur pour la confirmation

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vérifier si les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Inscription réussie !");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'inscription");
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Adresse email"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
          onChange={handleChange}
          required
        />
        <br />
        
        {/* Affichage de l'erreur si les mots de passe ne correspondent pas */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;
