
// import './App.css';
// import Navbar from './Components/Navbar/Navbar';
// import { BrowserRouter,Routes,Route } from 'react-router-dom';
// import Shop from './Pages/Shop';

// import Product from './Pages/Product';
// import Cart from './Pages/Cart';
// import LoginSignUp from './Pages/LoginSignUp';
// import Login from './Pages/Login';
// import Footer from './Components/Footer/Footer';


import Prodbddshow from './Pages/prodbddshow';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
// import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignUp from './Pages/LoginSignUp';
import Login from './Pages/Login';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<Prodbddshow></Prodbddshow>}/>
        <Route path='/womens' element={<Prodbddshow></Prodbddshow>}/>
        <Route path='/kids' element={<Prodbddshow></Prodbddshow>}/>
        <Route path="/product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/signup' element={<LoginSignUp/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
