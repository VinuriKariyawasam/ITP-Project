const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res,next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      res.status(401).json('Aurthorization failed');
    }
    const decodedToken = jwt.verify(token, 'super_secret_customer_key');
    req.userData = { userId: decodedToken.userId,email:decodedToken.email};
    next();
  } catch (error) {
    console.log(error)
   
    res.status(401).json('Aurthorization failed');
  }
};
