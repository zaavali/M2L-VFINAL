import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [formdata, setFormData] = useState({ email: '', mdp: '' });
    const [loginMessage, setLoginMessage] = useState('');

    const handleLog = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/user/conn/', formdata);
            const token = response.data.token;
            const isAdmin = response.data.isAdmin; 

            Cookies.set('token', token, { expires: 2 / 24, secure: true, sameSite: 'strict' });

            setIsLoggedIn(true);
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
            setIsLoggedIn(false);
            setIsAdmin(false);
        } catch (error) {
            console.error(error);
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
            <li onClick={()=>{setMenu("accueil")}}>
                    <Link style={{ textDecoration: 'none'}} to='/'>Accueil</Link>
                    {menu==="accueil"?<hr/>:<></>}
                </li>
                <li onClick={()=>{setMenu("badminton")}}>
                    <Link style={{ textDecoration: 'none'}} to ='mens'>Badminton</Link>
                    {menu==="badminton"?<hr/>:<></>}
                </li>
                <li onClick={()=>{setMenu("basket")}}>
                    <Link style={{ textDecoration: 'none'}} to ='womens'>Basket</Link>
                    {menu==="basket"?<hr/>:<></>}
                </li>
                <li onClick={()=>{setMenu("tennis")}}>
                    <Link style={{ textDecoration: 'none'}}to ='kids'>Tennis</Link>
                    {menu==="tennis"?<hr/>:<></>}
                </li>
            </ul>
            <div className="nav-login-cart">
                {isLoggedIn ? (
                    <button onClick={handleLogout}>Se déconnecter</button>
                ) : (
                    <>
                        <Link to='/login'><button onClick={handleLog}>Se connecter</button></Link>
                        <Link to='/signup'><button>S'inscrire</button></Link>
                    </>
                )}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                {isAdmin ? (
                    <button>Deconnecter</button>
                ) : (
                    <p></p>
                )}
                <div className="nav-cart-count">0</div>
            </div>
        </div>
    );
}

export default Navbar;
