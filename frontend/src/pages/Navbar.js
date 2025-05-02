import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
      <Link to="/products" style={{ marginRight: "10px" }}>Produits</Link>
      {role === "admin" && (
        <Link to="/users" style={{ marginRight: "10px" }}>Utilisateurs</Link>
      )}
      {!token ? (
        <>
          <Link to="/login" style={{ marginRight: "10px" }}>Connexion</Link>
          <Link to="/register">Inscription</Link>
        </>
      ) : (
        <>
          <span style={{ marginRight: "10px" }}>👤 {username}</span>
          <button onClick={handleLogout}>Se déconnecter</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
