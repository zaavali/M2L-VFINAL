import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Navbar = ({ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }) => {
  const [menu, setMenu] = useState(""); 
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      await axios.post('http://192.168.1.42:4000/api/user/logout');
      Cookies.remove('token');
      setIsLoggedIn(false);
      setIsAdmin(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour naviguer vers la page admin
  const goToAdminPage = () => {
    navigate('/admin');
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
          <Link style={{ textDecoration: 'none' }} to='badminton'>Nos produits</Link>
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
            {isAdmin && <button onClick={goToAdminPage} className="nav-button">Admin</button>}
            <button onClick={handleLogout} className="nav-button">Se déconnecter</button>
          </div>
        )}
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
      </div>
    </div>
  );
}

export default Navbar;
