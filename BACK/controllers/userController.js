const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const getEmailFromToken = require('../utils');
const { pool } = require('../database/database');

exports.getAllUser = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT uuid, nom, email FROM user');
        res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

exports.postUser = async (req, res) => {
    try {
        let conn;

    
        conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM user WHERE email = ?', [req.body.email]);
        conn.release();
        
        if (result.length > 0) {
            return res.status(400).json({ error: 'Cet utilisateur existe déjà.' });
        }

      
        const hashedPassword = await bcrypt.hash(req.body.mdp, 10);

    
        conn = await pool.getConnection();
        const uuid = crypto.randomUUID();
        const insertUserQuery = 'INSERT INTO user (uuid, nom, email, mdp) VALUES (?, ?, ?, ?)';
        const insertUserValues = [uuid, req.body.nom, req.body.email, hashedPassword];
        await conn.query(insertUserQuery, insertUserValues);
        conn.release();

      
        res.status(200).json({ message: 'Inscription réussie' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }
};


exports.conn = async (req, res) => {
    const { email, mdp } = req.body;

    const query = 'SELECT uuid,email, mdp, admin FROM user WHERE email = ?';

    try {
        const conn = await pool.getConnection();

        const rows = await conn.query(query, [email]);

        if (rows && rows.length > 0) {
            const user = rows[0];

            const isPasswordValid = await bcrypt.compare(mdp, user.mdp);

            if (isPasswordValid) {
                const expirationDate = new Date();
                expirationDate.setHours(expirationDate.getHours() + 1); 

                const tokenPayload = {
                    email: user.email,
                    isAdmin: user.admin === 1,
                    uuid: user.uuid
                };

                const token = jwt.sign(tokenPayload, process.env.API_KEY, { expiresIn: '2h' });

                res.cookie('token', token, { expires: expirationDate, httpOnly: true, secure: true, sameSite: 'strict' });

                res.status(200).json({ token, isAdmin: user.admin === 1 });
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



exports.deleteUser = async (req, res) => {
    const uuid = req.params.uuid;
    
    try {
     
        const conn = await pool.getConnection();
        
       
        const result = await conn.query('DELETE FROM user WHERE uuid = ?', [uuid]);
        
       
        conn.release();

        if (result.affectedRows === 1) {
           
            res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
        } else {
 
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
      
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    }
};




exports.handleLogout = async (req, res) => {
    try {
     
        res.status(200).json({ message: 'Déconnexion réussie', cookieToDelete: 'token' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de serveur lors de la déconnexion' });
    }
};

exports.autorisation = async (req, res) => {
    try {
       
        const token = req.cookies.token;

       
        if (!token) {
            return res.status(401).json({ message: 'Token non fourni' });
        }

       
        const decodedToken = jwt.verify(token, process.env.API_KEY);
        const isAdmin = decodedToken.isAdmin;

       
        res.status(200).json({ isAdmin });
    } catch (error) {
        console.error('Erreur lors de la vérification du statut administratif :', error);
        res.status(500).json({ message: 'Erreur de serveur lors de la vérification du statut administratif' });
    }
};