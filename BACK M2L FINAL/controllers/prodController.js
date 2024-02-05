
const crypto = require('crypto')
const express = require ('express')
const app = express()


const {pool} = require('../database/database')










  app.use(express.json())



exports.getAllProduits =  async(req, res) =>{
    let conn;
    try {
        
        conn = await pool.getConnection();
       
        const rows= await conn.query('SELECT * FROM produit');
       console.log(rows)
        res.status(200).json(rows)
    }
   catch(err){
    console.log(err)
   }
};

exports.postProd =   async (req, res) => {
    try {
        const conn = await pool.getConnection();
        
        if (req.file) {
            const imageFile = req.file;
            console.log('Insert request launched');
            console.log(req.body);
            /*console.log("image",imageFile)*/
            const request = 'INSERT INTO produit (puid, nom, description, prix, quantite, img) VALUES (?,?,?,?,?,?);';
            const rows = await conn.query(request, [
                crypto.randomUUID(),
                req.body.nom,
                req.body.description,
                req.body.prix,
                req.body.quantite,
                imageFile.path

            ]);
            
            console.log(rows);
            res.status(200).json(rows.affectedRows);
        } else {
            res.status(400).json({ error: 'No file uploaded.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error while inserting product.' });
    }
};

exports.putProdbypuid = async (req, res) => {
    const {   description, prix, quantite } = req.body;
    const { puid } = req.params
    console.log(  description, prix, quantite);

    // Vérifier si le prix est une valeur numérique valide
    const prixAsNumber = parseFloat(prix);
    if (isNaN(prixAsNumber)) {
        return res.status(400).json({ error: 'Le prix doit être un nombre valide.' });
    }

    let conn;
    try {
        conn = await pool.getConnection();

        const rows = await conn.query("UPDATE produit SET  description=?, prix=?, quantite=? WHERE puid=?", [ description, prixAsNumber, quantite, puid]);

        res.status(200).json(rows.affectedRows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'error while updating product.' });
    } finally {
        if (conn) conn.release();
    }
};

exports.deleteProd = async (req, res) => {
    const puid = (req.params.puid);
    let conn;
    try {
        conn = await pool.getConnection();

        const result = await conn.query('DELETE FROM produit WHERE puid=?', [puid]);

        res.status(200).json(result.affectedRows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    } finally {
        if (conn) conn.release();
    }
};
exports.decrementProd = async (req, res) => {
    const puid = req.params.puid;
    let conn;
    try {
      conn = await pool.getConnection();
  
    
      const currentProduct = await conn.query('SELECT quantite FROM produit WHERE puid=?', [puid]);
      const currentQuantite = currentProduct[0].quantite;
  
    
      if (currentQuantite > 0) {
       
        const newQuantite = currentQuantite - 1;
        
     
        await conn.query('UPDATE produit SET quantite=? WHERE puid=?', [newQuantite, puid]);
  
        res.status(200).json({ message: 'Quantité décrémentée avec succès' });
      } else {
        res.status(400).json({ message: 'La quantité du produit est déjà à zéro' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de la décrémentation de la quantité du produit' });
    } finally {
      if (conn) conn.release();
    }
  };