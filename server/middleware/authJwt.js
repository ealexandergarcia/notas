const { expressjwt: expressJwt } = require('express-jwt');
const fs = require('fs');
// const certificate = fs.readFileSync('certificate.csr');
const JWT_SECRET= process.env.JWT_SECRET;

const authJwt = expressJwt({
  secret: JWT_SECRET,
  algorithms: ['HS256']
}).unless({
  path: [
    '/users/create',
    '/users/login'
  ]
});

const handleAuthErrors = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Invalid or missing token. Please provide a valid token or sign up.' });
  } else {
    next(err);
  }
};

module.exports = { authJwt, handleAuthErrors };