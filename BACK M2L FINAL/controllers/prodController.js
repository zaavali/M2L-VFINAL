
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
exports.decrementQuantity = async (req, res) => {
    try {
        const { puid } = req.params;
        // Vérifiez d'abord si le produit existe
        const [row] = await pool.query('SELECT quantite FROM produit WHERE puid = ?', [puid]);
        console.log('row:', row); // Afficher les données retournées par la requête SQL
        if (!row) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

        // Accédez directement à la propriété quantite de l'objet row
        const newQuantity = row.quantite - 1;
        if (newQuantity < 0) {
            return res.status(400).json({ error: 'La quantité ne peut pas être inférieure à zéro' });
        }
        
        await pool.query('UPDATE produit SET quantite = ? WHERE puid = ?', [newQuantity, puid]);

        res.status(200).json({ message: 'Quantité décrémentée avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la décrémentation de la quantité' });
    }
};

exports.incrementQuantity = async (req, res) => {
    try {
      const { puid } = req.params;
      // Vérifiez d'abord si le produit existe
      const [rows] = await pool.query('SELECT quantite FROM produit WHERE puid = ?', [puid]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Produit non trouvé' });
      }
  
      // Incrémentez la quantité du produit dans la base de données
      const newQuantity = rows.quantite + 1;
      await pool.query('UPDATE produit SET quantite = ? WHERE puid = ?', [newQuantity, puid]);
  
      res.status(200).json({ message: 'Quantité incrémentée avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de l\'incrémentation de la quantité' });
    }
  };
  