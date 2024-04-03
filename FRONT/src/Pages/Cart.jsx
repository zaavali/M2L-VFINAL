import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext.jsx';
import axios from 'axios';
import Cookies from 'js-cookie';
import './CSS/Cart.css';
import remove_icon from '../Components/Assets/cart_cross_icon.png';



const Cart = () => {
  const { produits, cartItems, removeFromCart } = useContext(ShopContext);
  const [userUuid, setUserUuid] = useState('');

 

  const getProduitsDansPanier = () => {
    const produitsDansPanier = [];
    for (const idProduit in cartItems) {
      const quantite = cartItems[idProduit];
      if (quantite > 0) {
        const produit = produits.find((prod) => prod.puid === idProduit);
        if (produit) {
          produitsDansPanier.push({ ...produit, quantite });
        }
      }
    }
    return produitsDansPanier;
  };

  const handleDelete = async (puid) => {
    try {
      removeFromCart(puid);
      await axios.put(`http://localhost:4000/api/prod/produit/${puid}/increment`);
      console.log("Item removed from cart successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const envoyerCommandeBackend = async (commande) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.post('http://localhost:4000/api/commande/valider', commande, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Commande envoyée au Backend !");
    } catch (error) {
      console.error("Erreur lors de l'envoi de la commande au backend :", error);
    }
  };
  

  const validerCommande = () => {
    const produitsDansPanier = getProduitsDansPanier();
    const commande = {
      produits: produitsDansPanier,
      montantTotal: calculerTotal(),
      uuid: userUuid, 
    };
    console.log('UUID de l\'utilisateur:', userUuid);
    localStorage.setItem('commande', JSON.stringify(commande));
    envoyerCommandeBackend(commande);
  };

  const calculerTotal = () => {
    let total = 0;
    for (const idProduit in cartItems) {
      const quantite = cartItems[idProduit];
      if (quantite > 0) {
        const produit = produits.find((prod) => prod.puid === idProduit);
        if (produit) {
          total += quantite * produit.prix;
        }
      }
    }
    return total;
  };

  const afficherProduitsDansPanier = () => {
    const produitsDansPanier = getProduitsDansPanier();
    if (produitsDansPanier.length === 0) {
      return (
        <div className="center-content">
          <p>Votre panier est vide.</p>
        </div>
      );
    } else {  
      return (
        <div className='cartitems'>
          <div className="cartitems-format-main">
            <p>Produits</p>
            <p>Nom</p>
            <p>Prix</p>
            <p>Quantité</p>
            <p>Total</p>
            <p>Supprimer</p>
          </div>
          <hr />
          {produitsDansPanier.map((produit) => (
  <div key={produit.puid}>
    <div className="cartitems-format cartitems-format-main">
      <p><img className="product-image" src={`http://localhost:4000/${produit.img}`} alt={produit.nom} /></p>
      <p>{produit.nom}</p>
      <p>{produit.prix} €</p>
      <p>{produit.quantite}</p>
      <p>{produit.quantite * produit.prix} €</p>
      <img className='cartitems-remove-icon' src={remove_icon} onClick={() => handleDelete(produit.puid)} alt="Supprimer" />
    </div>
    <hr />
  </div>
))}

          <div className="cartitems-down">
            <div className="cartitems-total">
                
                  <p className='total'>Total : {calculerTotal()} €</p>
               
              <button onClick={validerCommande}>COMMANDER</button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1 className="titre-mon-panier">Mon panier</h1>
        </div>
      </div>
      {afficherProduitsDansPanier()}
    </div>
  );
  
};

export default Cart;