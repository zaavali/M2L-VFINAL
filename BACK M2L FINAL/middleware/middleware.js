const jwt = require('jsonwebtoken');

exports.authenticator = (req, res, next) => {
    try {
       
        let token = req.headers.authorization;

       
        if (!token) {
            throw new Error('Access denied: No token provided.');
        }

      
        if (token.startsWith('Bearer ')) {
            token = token.slice(7); 
        } else {
            throw new Error('Invalid token format.');
        }

       
        if (!process.env.API_KEY) {
            throw new Error('Internal Server Error: No secret key defined.');
        }


        jwt.verify(token, process.env.API_KEY, (err, decoded) => {
            if (err) {
                throw new Error('Access denied: Invalid token.');
            }

            
            req.user = decoded; 
            next(); 
        });
    } catch (error) {
       
     
        res.status(401).json({ error: error.message });
    }
};