import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/Login.css';
import Admin from './admin';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Connection() {
  const [formdata, setFormData] = useState({ email: '', mdp: '' });
  const [loginMessage, setLoginMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); 

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsConnected(true);
      
    }
  }, []);

  const handleLog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/user/conn/', formdata);
      const token = response.data.token;
      const isAdmin = response.data.isAdmin; 

      Cookies.set('token', token, { expires: 2 / 24, secure: true, sameSite: 'strict' });

      setIsConnected(true);
      setIsAdmin(isAdmin);

    } catch (error) {
      console.error(error);
      setLoginMessage('Échec de la connexion. Veuillez vérifier vos informations.');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/api/user/logout');
      Cookies.remove('token');
      setIsConnected(false);
      setIsAdmin(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isConnected ? (
        <div>
          <h1>Vous êtes connecté</h1>
          {isAdmin ? (
            <>
              <p>Connecté en tant qu'admin</p>
              <Admin />
            </>
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

