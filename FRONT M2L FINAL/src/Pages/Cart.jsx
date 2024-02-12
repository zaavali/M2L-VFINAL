import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext.jsx'
import axios from 'axios';

const Cart = () => {
  const { produits, cartItems, removeFromCart  } = useContext(ShopContext);

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


  const afficherProduitsDansPanier = () => {
    const produitsDansPanier = getProduitsDansPanier();
    if (produitsDansPanier.length === 0) {
      return <p>Votre panier est vide.</p>;
    } else {
      return (
        <div>
          {produitsDansPanier.map((produit) => (
            <div key={produit.puid}>
              <p>Nom : {produit.nom}</p>
              <p>Prix : {produit.prix}</p>
              <p>Quantité : {produit.quantite}</p>
              <button onClick={() => handleDelete(produit.puid)}>Supprimer</button>
            </div>
          ))}
          <p>Total : {calculerTotal()}$</p>
        </div>
      );
    }
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

  return (
    <div>
      <h2>Votre panier :</h2>
      {afficherProduitsDansPanier()}
    </div>
  );
};

export default Cart;
