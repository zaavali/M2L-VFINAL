const bcrypt = require('bcrypt');
const crypto = require('crypto')
const express = require ('express')
const app = express()


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

exports.postUser =async (req,res) => {
    let conn;
     
    bcrypt.hash(req.body.mdp, 10)
        .then(async (hash) => {
            console.log("connexion launch")
            conn = await pool.getConnection();
            console.log('insert request launching')
            console.log(req.body);
            let request = 'INSERT INTO user (uuid, nom, email, mdp ) VALUES (?,?,?, ?);'
            let rows = await conn.query(request, [crypto.randomUUID(), req.body.nom, req.body.email, hash ]);
            console.log(rows);
            res.status(200).json(rows.affectedRows)
        }
        ).catch((error) => res.status(500).json(error))

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
                    res.status(200).json({ message: 'Utilisateur connecté en tant qu\'admin', isAdmin: true });
                } else {
                    res.status(200).json({ message: 'Utilisateur connecté en tant qu\'utilisateur', isAdmin: false });
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
