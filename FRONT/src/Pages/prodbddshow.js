import React, { useEffect, useState, useContext } from 'react';
import './CSS/ShopCategory.css';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importez Link
import { ShopContext } from '../Context/ShopContext.jsx';

export default function Prodbddshow() {
  const [produit, setProduit] = useState([]);
  const [affichage, setAffichage] = useState(false);
  const { addToCart } = useContext(ShopContext);

  const recup = async () => {
    try {
<<<<<<< HEAD
      const response = await axios.get('http://localhost:4000/api/prod/produit');
=======
      const response = await axios.get('http://192.168.1.42:4000/api/prod/produit');
>>>>>>> e9d59a900aec3130e8399437d8de9f15113fa447
      setProduit(response.data);
      setAffichage(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    recup();
  }, []);

  return (
    <div className='shop-category'>
      {affichage ? (
        <div className="shopcategory-products">
          {produit.map((prod) => (
            <div key={prod.puid} className="item">
              {/* Utilisez Link pour entourer l'image */}
              <Link to={`/product/${prod.puid}`}>
<<<<<<< HEAD
                <img src={`http://localhost:4000/${prod.img}`} alt={prod.img} className="adjustedimg" onClick={() => window.scrollTo(0, 0)}/>
=======
                <img src={`http://192.168.1.42:4000/${prod.img}`} alt={prod.img} className="adjustedimg" onClick={() => window.scrollTo(0, 0)}/>
>>>>>>> e9d59a900aec3130e8399437d8de9f15113fa447
              </Link>
              <p>{prod.nom}</p>
              <div>
                <p className="item-price">{prod.prix} €</p>
              </div>
              <button onClick={() => addToCart(prod.puid)}>Ajouter au panier</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="shopcategory-loadmore">Chargement...</div>
      )}
    </div>
  );
}
