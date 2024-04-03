const jwt = require('jsonwebtoken');

const getEmailFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.API_KEY);
    return decoded.email;
  } catch (error) {
    return null;
  }
};

module.exports = getEmailFromToken;
