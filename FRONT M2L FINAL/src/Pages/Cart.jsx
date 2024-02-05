import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext.jsx'

const Cart = () => {
  const { produits, cartItems } = useContext(ShopContext);

  // Fonction pour obtenir les informations sur les produits dans le panier
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

  // Afficher les produits dans le panier
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
            </div>
          ))}
          <p>Total : {calculerTotal()}$</p>
        </div>
      );
    }
  };

  // Calculer le total du panier
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
