import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '../../src/Pages/Cookie';
import Prodbdd from './produitsbdd';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = getCookie("token", document.cookie); 
    if (storedToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      };
      axios.get('http://localhost:4000/api/user/user', config) // Endpoint pour récupérer la liste des utilisateurs
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, []); 

  const handleDeleteUser = (uuid) => {
    const storedToken = getCookie("token", document.cookie); 
    if (storedToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      };
      axios.delete(`http://localhost:4000/api/user/user/${uuid}`, config) // Endpoint pour supprimer l'utilisateur
        .then(() => {
          // Mettre à jour la liste des utilisateurs après la suppression
          setUsers(users.filter(user => user.uuid !== uuid));
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <h1>Connecté en tant qu'admin</h1>
      <h1>Liste des utilisateurs</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div>
          {users.map(user => (
            <div key={user.uuid}>
              <p>id: {user.uuid}</p>
              <p> nom: {user.nom}</p>
              <p> email: {user.email}</p>
              <button onClick={() => handleDeleteUser(user.uuid)}>Supprimer</button>
            </div>
          ))}
        </div>
      )}
      <div>
        <Prodbdd></Prodbdd>
      </div>
    </div>
  );
}
