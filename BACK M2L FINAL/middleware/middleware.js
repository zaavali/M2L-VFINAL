const jwt = require('jsonwebtoken')
exports.authenticator = (req, res , next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization;
    if (token && process.env.API_KEY) {
        jwt.verify(token, process.env.API_KEY,  (err, decoded) => {
            if (err) {
                res.status(401).json({error: 'Access denied.'});
            } else {
                next();
            }
        });
    } else {
        res.status(401).json({error: 'Acces denied'});
    }
};