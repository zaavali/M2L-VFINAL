import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [produits, setProduits] = useState([]);

  // Fonction pour récupérer les données des produits depuis la base de données
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/prod/produit');
        setProduits(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduits();
  }, []);

  // Fonction pour initialiser le panier avec des quantités à zéro pour chaque produit
  useEffect(() => {
    const initialiserPanier = () => {
      const nouveauPanier = {};
      produits.forEach((produit) => {
        nouveauPanier[produit.puid] = 0;
      });
      setCartItems(nouveauPanier);
    };
    initialiserPanier();
  }, [produits]);

  const addToCart = async (puid) => {
    try {
      // Vérifier si le produit existe déjà dans le panier local
      const newCartItems = { ...cartItems };
      if (newCartItems[puid] === undefined) {
        newCartItems[puid] = 0;
      }
      // Décrémenter la quantité dans la base de données
      await axios.put(`http://localhost:4000/api/prod/produit/${puid}/decrement`);
      // Incrémenter la quantité dans le panier local
      newCartItems[puid] += 1;
      setCartItems(newCartItems);
      console.log("La quantité a été décrémentée avec succès !");
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (puid) => {
    try {
      // Incrémenter la quantité dans la base de données
      await axios.put(`http://localhost:4000/api/prod/produit/${puid}/increment`);
      // Mettre à jour le panier dans l'état local
      setCartItems((prev) => {
        const newCartItems = { ...prev };
        if (newCartItems[puid] === undefined) {
          newCartItems[puid] = 0;
        }
        newCartItems[puid] -= 1;
        return newCartItems;
      });
      console.log("La quantité a été incrémentée avec succès !");
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    produits.forEach((produit) => {
      if (cartItems[produit.puid] > 0) {
        totalAmount += cartItems[produit.puid] * produit.prix;
      }
    });
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    produits.forEach((produit) => {
      if (cartItems[produit.puid] > 0) {
        totalItem += cartItems[produit.puid];
      }
    });
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    produits,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
