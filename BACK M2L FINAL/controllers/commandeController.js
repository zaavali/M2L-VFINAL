const crypto = require('crypto')
const express = require ('express')
const app = express()
const { getuuidUser } = require('../controllers/userController');

const {pool} = require('../database/database')










  app.use(express.json())


  const calculerMontantTotal = (produits) => {
    let montantTotal = 0;
    produits.forEach(produit => {
      montantTotal += produit.prix * produit.quantite;
    });
    return montantTotal;
  };
  
  exports.valider = async (req, res) => {
    console.log('valider');
    try {
      console.log('UUID de l\'utilisateur:', req.user.uuid); 
      const idCommande = crypto.randomUUID();
      const montantTotal = calculerMontantTotal(req.body.produits); 
      const uuiduser = await getuuidUser(req.body.uuid);
      const nomCommande = req.body.nom;
      const produits = req.body.produits;
  
      const conn = await pool.getConnection();
      const request = 'INSERT INTO commandes (cuid, montant, puiduser, nom, produits) VALUES (?, ?, ?, ?, ?)';
      await conn.query(request, [idCommande, montantTotal, uuiduser, nomCommande, JSON.stringify(produits)]);
      conn.release();
  
      res.status(200).json({ message: 'Commande validée !', idCommande });
    } catch (error) {
      console.error('Erreur lors de la validation de la commande :', error);
      res.status(500).json({ error: 'Erreur lors de la validation de la commande.' });
    }
  };
  
  
exports.getAllCommandes =  async(req, res) =>{
    let conn;
    try {
        
        conn = await pool.getConnection();
       
        const rows= await conn.query('SELECT * FROM commandes');
       console.log(rows)
        res.status(200).json(rows)
    }
   catch(err){
    console.log(err)
   }
};