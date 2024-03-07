import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Navbar = ({ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }) => {
  const [menu, setMenu] = useState(""); 

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
        <li onClick={() => { setMenu("accueil") }}>
          <Link style={{ textDecoration: 'none' }} to='/'>Accueil</Link>
          {menu === "accueil" ? <hr /> : <></>}
        </li>
        <li onClick={() => { setMenu("badminton") }}>
          <Link style={{ textDecoration: 'none' }} to='badminton'>Badminton</Link>
          {menu === "badminton" ? <hr /> : <></>}
        </li>
        <li onClick={() => { setMenu("basket") }}>
          <Link style={{ textDecoration: 'none' }} to='basket'>Basket</Link>
          {menu === "basket" ? <hr /> : <></>}
        </li>
        <li onClick={() => { setMenu("tennis") }}>
          <Link style={{ textDecoration: 'none' }} to='tennis'>Tennis</Link>
          {menu === "tennis" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to='/login'><button>Se connecter</button></Link>
        <Link to='/signup'><button>S'inscrire</button></Link>
        
        {isAdmin || isLoggedIn ? (
          <>
          <div className='nav-menu'>
          {isAdmin && <Link to='/admin'>Admin</Link>} 
          </div>
           
            <button onClick={handleLogout}>Se déconnecter</button>
          </>
        ) : (
          <p></p>
        )}
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
      </div>
    </div>
  );
}

export default Navbar;

























// import React from 'react';
// import './Navbar.css';
// import logo from '../Assets/logo.png';
// import cart_icon from '../Assets/cart_icon.png';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const Navbar = ({ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }) => {
//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:4000/api/user/logout');
//       Cookies.remove('token');
//       setIsLoggedIn(false);
//       setIsAdmin(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className='navbar'>
//       <Link to='/'>
//         <div className="nav-logo">
//           <img src={logo} alt="" />
//           <p>MAISON DES LIGUES</p>
//         </div>
//       </Link>
//       <ul className="nav-menu">
//       <li onClick={()=>{setMenu("accueil")}}>
//                    <Link style={{ textDecoration: 'none'}} to='/'>Accueil</Link>
//                     {menu==="accueil"?<hr/>:<></>}
//               </li>
//                <li onClick={()=>{setMenu("badminton")}}>
//                    <Link style={{ textDecoration: 'none'}} to ='badminton'>Badminton</Link>
//                     {menu==="badminton"?<hr/>:<></>}
//                </li>
//              <li onClick={()=>{setMenu("basket")}}>
//                  <Link style={{ textDecoration: 'none'}} to ='basket'>Basket</Link>
//                    {menu==="basket"?<hr/>:<></>}
//               </li>
//                  <li onClick={()=>{setMenu("tennis")}}>
//                      <Link style={{ textDecoration: 'none'}}to ='tennis'>Tennis</Link>
//                   {menu==="tennis"?<hr/>:<></>}
//                </li>
//       </ul>
//       <div className="nav-login-cart">
//         <Link to='/login'><button>Se connecter</button></Link>
//         <Link to='/signup'><button>S'inscrire</button></Link>
//         <Link to='/cart'><img src={cart_icon} alt="" /></Link>
//         {isAdmin || isLoggedIn ? (
//           <button onClick={handleLogout}>Se déconnecter</button>
//         ) : (
//           <p></p>
//         )}
//         <div className="nav-cart-count">0</div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;













































// import React, {useState} from 'react';
// import './Navbar.css'
// import logo from'../Assets/logo.png'
// import cart_icon from '../Assets/cart_icon.png'
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const Navbar = ({isLoggedIn, setIsLoggedIn,isAdmin, setIsAdmin}) => {
//     const handleLogout = async () => {
//         try {
//           await axios.post('http://localhost:4000/api/user/logout');
//           Cookies.remove('token');
//         setIsLoggedIn(false);
//           setIsAdmin(false);
//         } catch (error) {
//           console.error(error);
//         }
//       };
//     const [menu,setMenu] = useState("shop")
   
//     return (
//         <div className='navbar'>
//             <Link to='/'>
//             <div className="nav-logo">
//                 <img src={logo} alt="" />
//                 <p>MAISON DES LIGUES</p>
//             </div>
//             </Link>
//             <ul className="nav-menu">
//                 <li onClick={()=>{setMenu("accueil")}}>
//                     <Link style={{ textDecoration: 'none'}} to='/'>Accueil</Link>
//                     {menu==="accueil"?<hr/>:<></>}
//                 </li>
//                 <li onClick={()=>{setMenu("badminton")}}>
//                     <Link style={{ textDecoration: 'none'}} to ='badminton'>Badminton</Link>
//                     {menu==="badminton"?<hr/>:<></>}
//                 </li>
//                 <li onClick={()=>{setMenu("basket")}}>
//                     <Link style={{ textDecoration: 'none'}} to ='basket'>Basket</Link>
//                     {menu==="basket"?<hr/>:<></>}
//                 </li>
//                 <li onClick={()=>{setMenu("tennis")}}>
//                     <Link style={{ textDecoration: 'none'}}to ='tennis'>Tennis</Link>
//                     {menu==="tennis"?<hr/>:<></>}
//                 </li>
//             </ul>
//         <div className="nav-login-cart">
//             <Link to ='/login'><button>Se connecter</button></Link>
//             <Link to ='/signup'><button>S'inscrire</button></Link>
//             <Link to ='/cart'><img src={cart_icon} alt="" /></Link>
//             {isAdmin ? (
//                            <button onClick={handleLogout}>Se déconnecter</button>
                        
//                      ) : ( 
//                         <p></p>
//                      )
                   
//                      }

// {isLoggedIn ? (
//                            <button onClick={handleLogout}>Se déconnecter</button>
                        
//                      ) : ( 
//                         <p></p>
//                      )
                   
//                      }

//             <div className="nav-cart-count">0</div>
           
//         </div>
//     </div>
//   )
// }

// export default Navbar