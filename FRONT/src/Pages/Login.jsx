import React, { useState } from 'react';
import axios from 'axios';
import './CSS/Login.css';
import Admin from './Admin';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Connection({ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }) {
  const [formdata, setFormData] = useState({ email: '', mdp: '' });
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const handleLog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.1.25:4000/api/user/conn', formdata);
      
      const token = response.data.token;
      const isAdmin = response.data.isAdmin;

      Cookies.set('token', `${token}`, {path: '/', expires: 30});
      console.log('Token stocké dans le cookie :', Cookies.get('token'));
      setIsLoggedIn(true);
      setIsAdmin(isAdmin);

      navigate('/');

    } catch (error) {
      console.error(error);
      setLoginMessage('Échec de la connexion. Veuillez vérifier vos informations.');
    }
  };

  return (
    <>
      {isLoggedIn ? (
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
