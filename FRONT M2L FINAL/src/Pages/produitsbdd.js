import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Prodbdd() {
  const [formdata, setFormData] = useState({ nom: '', description: '', prix: '', quantite: '', img: null ,});
  const [produit, setUser] = useState([]);
  const [affichage, setAffichage] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);




  const handleChangeData = (e) => {
    setFormData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };
 

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };


  const handleSubmit = async (e , puid) => {
    e.preventDefault();
    console.log(puid);
    try {
        // Assurez-vous que formdata.puid est défini avant d'envoyer la requête PUT
        if (!puid) {
            console.error('Le puid du produit n\'est pas défini.');
            return;
        }

        await axios.put(`http://localhost:4000/api/prod/produit/${puid}`, formdata);
        console.log("Update request executed successfully!");
        setSelectedProductId(null); // Réinitialisez selectedProductId après la mise à jour
    } catch (error) {
        console.error(error);
    }
};

 

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('nom', formdata.nom);
    formData.append('description', formdata.description);
    formData.append('prix', formdata.prix);
    formData.append('quantite', formdata.quantite);
    formData.append('image', image);

    // Afficher les clés et leurs valeurs dans la console
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
console.log(formData)
    try {
      const response = await axios.post('http://localhost:4000/api/prod/produit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); // Affiche la réponse du serveur
      console.log("Create request executed successfully!");
    } catch (error) {
      console.error(error);
    }

  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/prod/produit/${id}`);
      console.log("Delete request executed successfully!");
    } catch (error) {
      console.error(error);
    }
  };

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

  // return (
  //   <div>
  //     <h1>Products Test</h1>
  //     {affichage ? (
  //       produit.map((prod) => (
         
  //         <div key={prod.puid}>
  //           <fieldset>
  //             <p>id: {prod.puid}</p>
  //             <p> nom: {prod.nom}</p>
  //             <p> description: {prod.description}</p>
  //             <p> prix: {prod.prix}</p>
  //             <p> quantité: {prod.quantite}</p>
  //             <img src={`http://localhost:4000/${prod.img}`} alt={prod.img} />
              

  //             <button onClick={() => handleDelete(prod.puid)}>Delete</button>
  //           </fieldset>
  //         </div>
  //       ))
  //     ) : (
  //       <p>Chargement...</p>
  //     )}
  return (
    <div>
      <h1>Products Test</h1>
      {affichage ? (
        produit.map((prod) => {
          const productToUpdate = produit.find((p) => p.puid === selectedProductId);

          return (
            <div key={prod.puid}>
              <fieldset>
                <p>id: {prod.puid}</p>
                <p> nom: {prod.nom}</p>
                <p> description: {prod.description}</p>
                <p> prix: {prod.prix}</p>
                <p> quantité: {prod.quantite}</p>
                <img src={`http://localhost:4000/${prod.img}`} alt={prod.img} />

                <button onClick={() => setSelectedProductId(prod.puid)}>Update product</button>
                <button onClick={() => handleDelete(prod.puid)}>Delete</button>
              </fieldset>
              <form onSubmit={(e) => handleSubmit(e, prod.puid)}> {/* Pass prod.puid to the handleSubmit function */}
                {/* Rest of your form inputs */}
                <input
                  onChange={(e) => handleChangeData(e)}
                  type='text'
                  name='nom'
                  placeholder='choose a name'
                  value={selectedProductId ? productToUpdate.nom : ''}
                />
                <input
                  onChange={handleChangeData}
                  type='text'
                  name='description'
                  placeholder='choose a description'
                />
                <input
                  onChange={handleChangeData}
                  type='text'
                  name='prix'
                  placeholder='choose a price'
                />
                <input
                  onChange={handleChangeData}
                  type='text'
                  name='quantite'
                  placeholder='choose quantity'
                />
                <input
                  onChange={(e) => handleImageUpload(e)}
                  type='file'
                  name='image'
                  accept='image/*'
                />
                <button type='submit'>Update product</button>
              </form>
            </div>
          );
        })
      ) : (
        <p>Chargement...</p>
      )}
      <div>

        <form onSubmit={handleCreate}>

          <input
            onChange={handleChangeData}
            type='text'
            name='nom'
            placeholder='choose a name'
          />
          <input
            onChange={handleChangeData}
            type='text'
            name='description'
            placeholder='choose a description'
          />
          <input
            onChange={handleChangeData}
            type='text'
            name='prix'
            placeholder='choose a price'
          />
          <input
            onChange={handleChangeData}
            type='text'
            name='quantite'
            placeholder='choose a quantity'
          />
          <input
            onChange={(e) => handleImageUpload(e)}
            type='file'
            name='image'
            accept='image/*'
          />
          <button type='submit'>Create a product</button>
        </form>
      </div>
    </div>
  )
}

