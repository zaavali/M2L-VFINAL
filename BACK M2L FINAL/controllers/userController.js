const bcrypt = require('bcrypt');
const crypto = require('crypto')
const express = require ('express')
const app = express()
const jwt = require('jsonwebtoken');

const {pool} = require('../database/database')
const users = [];
 app.use(express.json())


 exports.getUser = async(req, res) =>{
    let conn;
    try {
        
        conn = await pool.getConnection();
       
        const rows= await conn.query('SELECT uuid,nom, email FROM user');
       
        res.status(200).json(rows)
    }
   catch(err){
    console.log(err)
   }
};


    exports.postUser = async (req, res) => {
        try {
            let conn;
    
            // Vérification si l'utilisateur existe déjà dans la base de données
            conn = await pool.getConnection();
            const result = await conn.query('SELECT * FROM user WHERE email = ?', [req.body.email]);
            conn.release();
            
            if (result.length > 0) {
                return res.status(400).json({ error: 'Cet utilisateur existe déjà.' });
            }
    
            // Hachage du mot de passe avec bcrypt
            const hashedPassword = await bcrypt.hash(req.body.mdp, 10);
    
            // Enregistrement du nouvel utilisateur dans la base de données
            conn = await pool.getConnection();
            const uuid = crypto.randomUUID();
            const insertUserQuery = 'INSERT INTO user (uuid, nom, email, mdp) VALUES (?, ?, ?, ?)';
            const insertUserValues = [uuid, req.body.nom, req.body.email, hashedPassword];
            await conn.query(insertUserQuery, insertUserValues);
            conn.release();
    
            // Génération du token JWT
            const token = jwt.sign({ email: req.body.email }, process.env.API_KEY, { expiresIn: '1h' });
    
            // Envoi du token en réponse
            res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur lors de l\'inscription' });
        }
    };


    exports.conn = async (req, res) => {
        const { email, mdp } = req.body;
    
        const query = 'SELECT email, mdp, admin FROM user WHERE email = ?';
    
        try {
            const conn = await pool.getConnection();
    
            const rows = await conn.query(query, [email]);
    
            if (rows && rows.length > 0) {
                const user = rows[0];
    
                const isPasswordValid = await bcrypt.compare(mdp, user.mdp);
    
                if (isPasswordValid) {
                    if (user.admin === 1) {
                        const token = jwt.sign({ email: user.email, isAdmin: true }, process.env.API_KEY, { expiresIn: '1h' });
                        // Affiche le token et le statut d'admin dans la console
                        console.log('Token pour l\'administrateur:', token);
                        console.log('L\'utilisateur est un administrateur');
                        res.status(200).json({ token, isAdmin: true });
                    } else {
                        const token = jwt.sign({ email: user.email, isAdmin: false }, process.env.API_KEY, { expiresIn: '1h' });
                        // Affiche le token et le statut d'admin dans la console
                        console.log('Token pour l\'utilisateur:', token);
                        console.log('L\'utilisateur n\'est pas un administrateur');
                        res.status(200).json({ token, isAdmin: false });
                    }
                } else {
                    res.status(401).json({ message: 'Identifiants invalides' });
                }
            } else {
                res.status(401).json({ message: 'Identifiants invalides' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur de serveur' });
        }
    };
    

exports.updateUser =async (req, res) => {
    const {  nom, email, mdp} = req.body;
    console.log(id, nom, email, mdp, admin);
    const adminValue = isNaN(parseInt(admin)) ? 0 : parseInt(admin);
    let conn;
    try {
        conn = await pool.getConnection();

        const hashedPassword = await bcrypt.hash(mdp, 10);

        const rows = await conn.query("UPDATE user SET nom=?, email=?, mdp=?", [nom, email, hashedPassword]);

        res.status(200).json(rows.affectedRows);
    } catch (err) {
        console.log(err);
    } finally {
       
        if (conn) conn.release();
    }
};
 
exports.deleteUser = async (req, res) => {
    const uuid = (req.params.uuid);
    
    let conn;
    try {
        conn = await pool.getConnection();

        const results = await conn.query('DELETE FROM user WHERE uuid=?', [uuid]);

        res.status(203).json(results.affectedRows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    } finally {
        if (conn) conn.release();
    }
};
