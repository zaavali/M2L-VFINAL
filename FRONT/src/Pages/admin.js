import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Prodbdd from './produitsbdd';
import './CSS/Admin.css'; // Importez le fichier CSS ici
import delete_icon from '../Components/Assets/cart_cross_icon.png';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedToken = Cookies.get("token");
        if (storedToken) {
          const config = {
            headers: {
              Authorization: ` ${storedToken}` 
            }
          };
          const response = await axios.get('http://localhost:4000/api/user/user', config);
          setUsers(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []); 

  const handleDeleteUser = async (uuid) => {
    try {
      const storedToken = Cookies.get("token");
      if (storedToken) {
        const config = {
          headers: {
            Authorization: ` ${storedToken}` 
          }
        };
        await axios.delete(`http://localhost:4000/api/user/user/${uuid}`, config);
        setUsers(users.filter(user => user.uuid !== uuid));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.uuid}>
                  <td>{user.uuid}</td>
                  <td>{user.nom}</td>
                  <td>{user.email}</td>
                  <td>
                  <button className="delete-user-button" onClick={() => handleDeleteUser(user.uuid)}>
  <img className="delete-icon" src={delete_icon} alt="Supprimer" />
</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div>
        <Prodbdd />
      </div>
    </div>
  );
}
