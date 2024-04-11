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
<<<<<<< HEAD
      axios.get('http://localhost:4000/api/user/user', config)
=======
      axios.get('http://192.168.1.42:4000/api/user/user', config)
>>>>>>> e9d59a900aec3130e8399437d8de9f15113fa447
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
<<<<<<< HEAD
      axios.delete(`http://localhost:4000/api/user/user/${uuid}`, config)
=======
      axios.delete(`http://192.168.1.42:4000/api/user/user/${uuid}`, config)
>>>>>>> e9d59a900aec3130e8399437d8de9f15113fa447
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