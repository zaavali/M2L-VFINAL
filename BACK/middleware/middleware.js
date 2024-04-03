const jwt = require('jsonwebtoken');
const Cookies = require('js-cookie');

exports.authenticator = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            throw new Error('Accès refusé : Aucun jeton fourni.');
        }

        jwt.verify(token, process.env.API_KEY, (err, decoded) => {
            if (err) {
                throw new Error('Accès refusé : Jeton invalide.');
            }

            req.user = decoded;

            if (decoded.isAdmin) {
                next(); 
            } else {
                throw new Error('Accès refusé : L\'utilisateur n\'est pas un administrateur.');
            }
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
