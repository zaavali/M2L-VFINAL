const jwt = require('jsonwebtoken');

exports.authenticator = (req, res, next) => {
    try {
       
        let token = req.headers.authorization;

        // Vérification si le token est présent dans les en-têtes
        if (!token) {
            throw new Error('Access denied: No token provided.');
        }

        // Extraction du token du format 'Bearer <token>'
        if (token.startsWith('Bearer ')) {
            token = token.slice(7); // Extrait seulement le token sans 'Bearer '
        } else {
            throw new Error('Invalid token format.');
        }

        // Vérification si la clé secrète est définie
        if (!process.env.API_KEY) {
            throw new Error('Internal Server Error: No secret key defined.');
        }

        // Vérification du token
        jwt.verify(token, process.env.API_KEY, (err, decoded) => {
            if (err) {
                throw new Error('Access denied: Invalid token.');
            }

            // Authentification réussie
            req.user = decoded; // Stockage des informations utilisateur dans req.user si besoin
            next(); // Passer au middleware suivant
        });
    } catch (error) {
        // Gestion des erreurs
     
        res.status(401).json({ error: error.message });
    }
};