import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

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

  useEffect(() => {
    const checkLoggedIn = async () => {
      const storedToken = Cookies.get("token");
      console.log("Stored token:", storedToken);

      if (storedToken) {
        try {
          const decodedToken = jwtDecode(storedToken);
          console.log("Decoded token:", decodedToken);

          const { isAdmin } = decodedToken;
          console.log("isAdmin from token:", isAdmin);

          setIsLoggedIn(true);
          setIsAdmin(isAdmin);
          Cookies.set("isAdmin", isAdmin);  // Save isAdmin to cookies
        } catch (error) {
          console.error('Error decoding token:', error);
          handleLogout();
        }
      } else {
        // If no token, use the value from cookies
        const storedIsAdmin = Cookies.get("isAdmin") === 'true';
        console.log("isAdmin from cookies:", storedIsAdmin);
        setIsAdmin(storedIsAdmin);
      }
    };

    checkLoggedIn();
  }, [setIsLoggedIn, setIsAdmin]);

  const handleLogout = async () => {
    try {
      await api.post('/user/logout');
      Cookies.remove('token');
      Cookies.remove('isAdmin');  // Remove isAdmin from cookies
      setIsLoggedIn(false);
      setIsAdmin(false);
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className='navbar'>
      <Link to='/'>
        <div className="nav-logo">
          <img src={logo} alt="" />
          <p>MAISON DES LIGUES</p>
        </div>
      </Link>
      <ul className="nav-menu">
        <li onClick={() => { setMenu("accueil") }}>
          <Link style={{ textDecoration: 'none' }} to='/'>Accueil</Link>
          {menu === "accueil" ? <hr /> : <></>}
        </li>
        <li onClick={() => { setMenu("badminton") }}>
          <Link style={{ textDecoration: 'none' }} to='/badminton'>Nos produits</Link>
          {menu === "badminton" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {!isLoggedIn && (
          <>
            <Link to='/login'><button>Se connecter</button></Link>
            <Link to='/signup'><button>S'inscrire</button></Link>
          </>
        )}

        {isLoggedIn && (
          <div>
            {isAdmin && <button onClick={() => navigate('/admin')} className="nav-button">Admin</button>}
            <button onClick={handleLogout} className="nav-button">Se déconnecter</button>
          </div>
        )}
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
      </div>
    </div>
  );
}

export default Navbar;
