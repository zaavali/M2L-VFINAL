
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
    const { nom, description, prix, quantite  } = req.body;
    console.log(req.body)
    const { puid } = req.params;

   
    const prixAsNumber = parseFloat(prix);
    if (isNaN(prixAsNumber)) {
        return res.status(400).json({ error: 'Le prix doit être un nombre valide.' });
    }

    let conn;
    try {
        conn = await pool.getConnection();

        let updateFields = '';
        const params = [];

       
        if (nom) {
            updateFields += 'nom=?, ';
            params.push(nom);
        }
        if (description) {
            updateFields += 'description=?, ';
            params.push(description);
        }
        if (prix) {
            updateFields += 'prix=?, ';
            params.push(prixAsNumber);
        }
        if (quantite) {
            updateFields += 'quantite=?, ';
            params.push(quantite);
        }
        if (req.file) {
        
            updateFields += 'img=?, ';
            params.push(req.file.path);
            console.log(req.file.path);
        }

      
        updateFields = updateFields.slice(0, -2);

      
        const query = `UPDATE produit SET ${updateFields} WHERE puid=?`;
        params.push(puid);
        const rows = await conn.query(query, params);

        res.status(200).json(rows.affectedRows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du produit.' });
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
       
        const [row] = await pool.query('SELECT quantite FROM produit WHERE puid = ?', [puid]);
   
        if (!row) {
            return res.status(404).json({ error: 'Produit non trouvé' });
        }

       
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
      
      const [rows] = await pool.query('SELECT quantite FROM produit WHERE puid = ?', [puid]);
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Produit non trouvé' });
      }
  
 
      const newQuantity = rows.quantite + 1;
      await pool.query('UPDATE produit SET quantite = ? WHERE puid = ?', [newQuantity, puid]);
  
      res.status(200).json({ message: 'Quantité incrémentée avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de l\'incrémentation de la quantité' });
    }
  };
  
