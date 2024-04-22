const jwt = require('jsonwebtoken');

exports.getUser = (req, res) => {
    try {
        const token = req.cookies.token; 
        if (!token) {
            throw new Error('Aucun jeton fourni.');
        }

        jwt.verify(token, process.env.API_KEY, (err, decoded) => {
            if (err) {
                throw new Error('Jeton invalide.');
            }

            const isAdmin = decoded.isAdmin;

            res.json({ isLoggedIn: true, isAdmin: isAdmin });
        });
    } catch (error) {
        res.json({ isLoggedIn: false });
    }
};
