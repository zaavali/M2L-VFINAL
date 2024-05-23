const crypto = require('crypto');
const { pool } = require('../database/database');

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
        const uuid = req.user.uuid;  
        console.log('UUID de l\'utilisateur:', uuid); 
        const idCommande = crypto.randomUUID();
        const montantTotal = calculerMontantTotal(req.body.produits); 
        const produits = req.body.produits;

        const conn = await pool.getConnection();
        const request = 'INSERT INTO commandes (cuid, montant, puiduser, produits) VALUES (?, ?, ?, ?)';
        await conn.query(request, [idCommande, montantTotal, uuid, JSON.stringify(produits)]);
        conn.release();

        res.status(200).json({ message: 'Commande validée !', idCommande });
    } catch (error) {
        console.error('Erreur lors de la validation de la commande :', error);
        res.status(500).json({ error: 'Erreur lors de la validation de la commande.' });
    }
};

exports.getAllCommandes = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM commandes');
        console.log(rows);
        res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des commandes.' });
    } finally {
        if (conn) conn.release();
    }
};