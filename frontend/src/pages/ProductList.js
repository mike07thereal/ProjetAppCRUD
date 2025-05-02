import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits", error);
      }
    };
    fetchProducts();
  }, [refresh]);

  const sortedProducts = [...products].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];
    if (typeof valueA === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/products",
        { name, description, quantity, price },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Produit ajouté avec succès !");
      resetForm();
      setRefresh(!refresh);
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
      setMessage("Erreur lors de l'ajout du produit.");
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product._id);
    setName(product.name);
    setDescription(product.description);
    setQuantity(product.quantity);
    setPrice(product.price);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/products/${editingProductId}`,
        { name, description, quantity, price },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Produit mis à jour avec succès !");
      resetForm();
      setEditingProductId(null);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Erreur lors de la mise à jour", error);
      setMessage("Erreur lors de la mise à jour du produit.");
    }
  };

  const handleDelete = async (productId) => {
    const token = localStorage.getItem("token");
    const confirmDelete = window.confirm("Supprimer ce produit ?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage("Produit supprimé avec succès !");
        setRefresh(!refresh);
      } catch (error) {
        console.error("Erreur lors de la suppression", error);
        setMessage("Erreur lors de la suppression du produit.");
      }
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setQuantity("");
    setPrice("");
    setShowAddForm(false);
  };

  return (
    <div className="card-container">
      <div className="card">
        <h2>Liste des produits</h2>
        {message && (
          <div className={`message ${message.includes("succès") ? "success" : "error"}`}>
            {message}
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>Nom ⬍</th>
              <th>Description</th>
              <th onClick={() => handleSort("price")}>Prix (FCFA) ⬍</th>
              <th onClick={() => handleSort("quantity")}>Quantité ⬍</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((prod) =>
              editingProductId === prod._id ? (
                <tr key={prod._id}>
                  <td>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </td>
                  <td>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </td>
                  <td>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                  </td>
                  <td>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                  </td>
                  {role === "admin" && (
                    <td>
                      <button className="action-button" onClick={handleUpdate}>Valider</button>
                      <button className="action-button" onClick={resetForm}>Annuler</button>
                    </td>
                  )}
                </tr>
              ) : (
                <tr key={prod._id}>
                  <td>{prod.name}</td>
                  <td>{prod.description}</td>
                  <td>{prod.price}</td>
                  <td>{prod.quantity}</td>
                  {role === "admin" && (
                    <td>
                      <button className="action-button" onClick={() => handleEdit(prod)}>Modifier</button>
                      <button className="action-button delete" onClick={() => handleDelete(prod._id)}>Supprimer</button>
                    </td>
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                margin: "0 5px",
                backgroundColor: currentPage === i + 1 ? "#1976d2" : "#e0e0e0",
                color: currentPage === i + 1 ? "white" : "black",
                padding: "5px 10px",
                border: "none",
                borderRadius: "4px",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {role === "admin" && (
        <div className="card">
          <h3>Gestion des produits</h3>

          {!showAddForm && !editingProductId && (
            <button onClick={() => setShowAddForm(true)}>Ajouter un produit</button>
          )}

          {showAddForm && !editingProductId && (
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
              <input type="number" placeholder="Quantité" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
              <input type="number" placeholder="Prix" value={price} onChange={(e) => setPrice(e.target.value)} required />
              <button type="submit">Ajouter</button>
              <button type="button" onClick={resetForm}>Annuler</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
