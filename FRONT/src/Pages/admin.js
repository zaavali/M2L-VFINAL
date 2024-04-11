import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Prodbdd from './produitsbdd';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      const config = {
        headers: {
     
        }
      };
      axios.get('http://192.168.1.420/api/user/user', config)
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
    const storedToken = Cookies.get("token");
    if (storedToken) {
      const config = {
        headers: {
         
        }
      };
      axios.delete(`http://192.168.1.420/api/user/user/${uuid}`, config)
        .then(() => {
          setUsers(users.filter(user => user.uuid !== uuid));
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div>
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