import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [produits, setProduits] = useState([]);


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
     
      const newCartItems = { ...cartItems };
      if (newCartItems[puid] === undefined) {
        newCartItems[puid] = 0;
      }
     
      await axios.put(`http://localhost:4000/api/prod/produit/${puid}/decrement`);
      
      newCartItems[puid] += 1;
      setCartItems(newCartItems);
      console.log("La quantité a été décrémentée avec succès !");
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (puid) => {
    try {
    
      await axios.put(`http://localhost:4000/api/prod/produit/${puid}/increment`);
  
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
