import React, { useState , useEffect } from 'react';
import axios from 'axios';
import './CSS/Login.css';
import Admin from './admin';
import { Link } from 'react-router-dom';

export default function Connection() {
  const [formdata, setFormData] = useState({ email: '', mdp: '' });
  const [isConnected, setIsConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus && storedLoginStatus === 'true') {
      setIsConnected(true);
      const isAdminStored = localStorage.getItem('isAdmin');
      setIsAdmin(isAdminStored === 'true');
    }
  }, [setIsConnected]);




  const handleLog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/user/connexion/', formdata);
      setIsConnected(true);
      setIsAdmin(response.data.isAdmin);

      // Stocker l'information de connexion dans le localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isAdmin', response.data.isAdmin ? 'true' : 'false');
    } catch (error) {
      console.error(error);
      setLoginMessage('Échec de la connexion. Veuillez vérifier vos informations.');
    }
  };

  const handleLogout = () => {
    // Déconnecter l'utilisateur et supprimer l'information du localStorage
    setIsConnected(false);
    setIsAdmin(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
  };
  
  return (
    <>
      {isConnected ? (
        <div>
          <h1>Vous êtes connecté</h1>
          {isAdmin ? (
            <Admin></Admin>
          ) : (
            <p>Connecté en tant qu'utilisateur</p>
          )}
          <button onClick={handleLogout}>Se déconnecter</button>
        </div>
      ) : (
        <div className='loginsignup'>
          <div className='loginsignup-container'>
            <h1>Bonjour</h1>
            <form className="loginsignup-fields" onSubmit={handleLog}>
              <input
                onChange={(e) => setFormData({ ...formdata, email: e.target.value })}
                type='email'
                name='email'
                placeholder='Adresse e-mail'
              />
              <input
                onChange={(e) => setFormData({ ...formdata, mdp: e.target.value })}
                type='password'
                name='mdp'
                placeholder='Mot de passe'
              />
              <button type='submit' className="no-underline">Se connecter</button>
            </form>
            <p className="login-message">{loginMessage}</p>
            <p className="loginsignup-login">
              Vous êtes nouveau ici ? <Link to="/signup" className="no-underline">S'inscrire</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
