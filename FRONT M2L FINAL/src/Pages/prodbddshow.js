import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../Context/ShopContext.jsx'; 

export default function Prodbddshow() {
  const [produit, setProduit] = useState([]);
  const [affichage, setAffichage] = useState(false);
  const { getTotalCartItems, addToCart } = useContext(ShopContext);

  const recup = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/prod/produit');
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
    <div className='popular'>
      <div>
        <img src="/chemin/vers/icon-panier.png" alt="Panier" />
        {getTotalCartItems() > 0 && <span>{getTotalCartItems()}</span>}
      </div>
      {affichage ? (
        produit.map((prod) => (
          <div key={prod.puid} className="product-item">
            <img src={`http://localhost:4000/${prod.img}`} alt={prod.img} className="adjustedimg"/>
            <div>
              <p> nom: {prod.nom}</p>
            </div>
            <div>
              <p> prix: {prod.prix}</p>
            </div>
            <div>
              <p> quantité: {prod.quantite}</p>
            </div>
            <button onClick={() => addToCart(prod.puid)}>Ajouter au panier</button>
          </div>
        ))
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
