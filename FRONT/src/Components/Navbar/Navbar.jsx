import React, { useState, useEffect, useCallback } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://192.168.1.25:4000/api',
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const Navbar = ({ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }) => {
  const [menu, setMenu] = useState("");
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      await api.post('/user/logout');
      Cookies.remove('token');
      setIsLoggedIn(false);
      setIsAdmin(false);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }, [navigate, setIsLoggedIn, setIsAdmin]);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const storedToken = Cookies.get("token");
      if (storedToken) {
        try {
          const response = await api.get('/auth/conn');
          setIsLoggedIn(true);
          setIsAdmin(response.data.isAdmin);
          console.log('Admin status:', response.data.isAdmin);
        } catch (error) {
          console.error(error);
          handleLogout();
        }
      } else {
        setIsAdmin(false);
      }
    };

    checkLoggedIn();
  }, [handleLogout, setIsLoggedIn, setIsAdmin]);

  console.log('Rendering Navbar');
  console.log('isLoggedIn:', isLoggedIn);
  console.log('isAdmin:', isAdmin);

  return (
    <div className='navbar'>
      <Link to='/'>
        <div className="nav-logo">
          <img src={logo} alt="Logo" />
          <p>MAISON DES LIGUES</p>
        </div>
      </Link>
      <ul className="nav-menu">
        <li onClick={() => { setMenu("accueil") }}>
          <Link style={{ textDecoration: 'none' }} to='/'>Accueil</Link>
          {menu === "accueil" && <hr />}
        </li>
        <li onClick={() => { setMenu("badminton") }}>
          <Link style={{ textDecoration: 'none' }} to='badminton'>Nos produits</Link>
          {menu === "badminton" && <hr />}
        </li>
      </ul>
      <div className="nav-login-cart">
        {!isLoggedIn ? (
          <>
            <Link to='/login'><button>Se connecter</button></Link>
            <Link to='/signup'><button>S'inscrire</button></Link>
          </>
        ) : (
          <div>
            {isAdmin && <button onClick={() => navigate('/admin')} className="nav-button">Admin</button>}
            <button onClick={handleLogout} className="nav-button">Se déconnecter</button>
          </div>
        )}
        <Link to='/cart'><img src={cart_icon} alt="Cart Icon" /></Link>
      </div>
    </div>
  );
};

export default Navbar;
