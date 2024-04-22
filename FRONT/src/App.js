import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import Prodbddshow from './Pages/prodbddshow';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignUp from './Pages/LoginSignUp';
import Login from './Pages/Login';
import Footer from './Components/Footer/Footer';
import Admin from './Pages/Admin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <Routes>
          <Route path="/" element={<Shop isConnected={isLoggedIn} setIsConnected={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
          <Route path="/badminton" element={<Prodbddshow isConnected={isLoggedIn} setIsConnected={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
          {/* <Route path="/basket" element={<Prodbddshow isConnected={isLoggedIn} setIsConnected={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
          <Route path="/tennis" element={<Prodbddshow isConnected={isLoggedIn} setIsConnected={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} /> */}
          <Route path="/product" element={<Product isConnected={isLoggedIn} setIsConnected={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>}>
            <Route path=":productId" element={<Product isConnected={isLoggedIn} setIsConnected={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
          </Route>
          <Route path="/cart" element={<Cart isConnected={isLoggedIn} setIsConnected={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
          <Route path="/signup" element={<LoginSignUp isConnected={isLoggedIn} setIsConnected={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
          <Route path="/login" element={<Login isConnected={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
          <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;


