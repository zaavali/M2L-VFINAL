import React, {useState} from 'react';
import './Navbar.css'
import logo from'../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [menu,setMenu] = useState("shop")
    const [isAdmin] = useState(false);
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
            <Link to ='/login'><button>Se connecter</button></Link>
            <Link to ='/signup'><button>S'inscrire</button></Link>
            <Link to ='/cart'><img src={cart_icon} alt="" /></Link>
            {isAdmin ? (
                        <button>Deconnecter</button>
                        
                     ) : ( 
                        <p></p>
                     )
                   
                     }

            <div className="nav-cart-count">0</div>
           
        </div>
    </div>
  )
}

export default Navbar