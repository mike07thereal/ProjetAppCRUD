import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/products");
    }
  }, [navigate]);

  return (
    <div>
      <h2>Bienvenue sur l’application de gestion de produits</h2>
      <p>Veuillez vous connecter ou vous inscrire pour continuer.</p>
    </div>
  );
};

export default Home;
