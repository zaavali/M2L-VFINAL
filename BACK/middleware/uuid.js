const jwt = require('jsonwebtoken');

const decodeToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token non fourni' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.API_KEY);
        req.user = decoded; 
        next();
    } catch (error) {
        console.error('Erreur lors du décodage du token :', error);
        res.status(401).json({ error: 'Token invalide' });
    }
};

module.exports = decodeToken;