import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Prodbddshow() {
 
  const [produit, setUser] = useState([]);
  const [affichage, setAffichage] = useState(false);
  







  const recup = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/prod/produit');
      console.log(response);
      setUser(response.data);
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
      
      {affichage ? (
        produit.map((prod) => (
          <div key={prod.puid} className="product-item" >
         
            
        
           
              
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
           
          </div>
        ))
      ) : (
        <p>Chargement...</p>
      )}
      <div>
       
      
      </div>
    </div>
  )
}
