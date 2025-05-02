import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import Navbar from "./pages/Navbar";
import PrivateRoute from "./pages/PrivateRoute";
import Home from "./pages/Home";
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        {/* ✅ Pages protégées */}
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute adminOnly={true}>
              <UserList />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
