import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/users/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
        setMessage("Erreur lors de la récupération des utilisateurs.");
      }
    };

    fetchUsers();
  }, []);

  const handleChangeRole = async (userId, newRole) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(`Rôle modifié en ${newRole} !`);
      setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
    } catch (error) {
      console.error("Erreur lors de la modification du rôle", error);
      setMessage("Erreur lors de la modification du rôle.");
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <h2>Liste des utilisateurs</h2>
        {message && <p>{message}</p>}
  
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role !== "admin" && (
                    <button onClick={() => handleChangeRole(user._id, "admin")}>
                      Promouvoir
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );  
};

export default UserList;
