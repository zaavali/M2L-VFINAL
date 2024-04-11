import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [produits, setProduits] = useState([]);


  useEffect(() => {
    const fetchProduits = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get('http://localhost:4000/api/prod/produit');
=======
        const response = await axios.get('http://192.168.1.42:4000/api/prod/produit');
>>>>>>> e9d59a900aec3130e8399437d8de9f15113fa447
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
     
<<<<<<< HEAD
      await axios.put(`http://localhost:4000/api/prod/produit/${puid}/decrement`);
=======
      await axios.put(`http://192.168.1.42:4000/api/prod/produit/${puid}/decrement`);
>>>>>>> e9d59a900aec3130e8399437d8de9f15113fa447
      
      newCartItems[puid] += 1;
      setCartItems(newCartItems);
      console.log("La quantité a été décrémentée avec succès !");
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (puid) => {
    try {
    
<<<<<<< HEAD
      await axios.put(`http://localhost:4000/api/prod/produit/${puid}/increment`);
=======
      await axios.put(`http://192.168.1.42:4000/api/prod/produit/${puid}/increment`);
>>>>>>> e9d59a900aec3130e8399437d8de9f15113fa447
  
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
