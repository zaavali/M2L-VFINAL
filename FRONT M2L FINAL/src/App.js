
// import './App.css';
// import Navbar from './Components/Navbar/Navbar';
// import { BrowserRouter,Routes,Route } from 'react-router-dom';
// import Shop from './Pages/Shop';

// import Product from './Pages/Product';
// import Cart from './Pages/Cart';
// import LoginSignUp from './Pages/LoginSignUp';
// import Login from './Pages/Login';
// import Footer from './Components/Footer/Footer';


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import Prodbddshow from './Pages/prodbddshow';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignUp from './Pages/LoginSignUp';
import Login from './Pages/Login';
import Footer from './Components/Footer/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<Prodbddshow />} />
          <Route path='/womens' element={<Prodbddshow />} />
          <Route path='/kids' element={<Prodbddshow />} />
          <Route path="/product" element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/signup' element={<LoginSignUp />} />
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

