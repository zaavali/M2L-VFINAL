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

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    produits.forEach((produit) => {
      if (cartItems[produit.id] > 0) {
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
