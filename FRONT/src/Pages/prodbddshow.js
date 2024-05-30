import React, { useEffect, useState } from 'react';
import './CSS/ShopCategory.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Prodbddshow() {
  const [produits, setProduits] = useState([]);
  const [affichage, setAffichage] = useState(false);

  useEffect(() => {
    const recup = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/prod/produit');
        setProduits(response.data);
        setAffichage(true);
      } catch (error) {
        console.error(error);
      }
    };

    recup();
  }, []);

  return (
    <div className='shop-category'>
      <div className="shopcategory-products">
        {affichage ? (
          produits.map((prod, i) => (
            <div key={i} className="item">
              <Link to={`/product/${prod.puid}`}>
                <img src={`http://localhost:4000/${prod.img}`} alt={prod.img} className="adjustedimg" onClick={() => window.scrollTo(0, 0)} />
              </Link>
              <p>{prod.nom}</p> <p className="item-price">{prod.prix} €</p>

            </div>
          ))
        ) : (
          <div className="shopcategory-loadmore">Chargement...</div>
        )}
      </div>
    </div>
  );
}
