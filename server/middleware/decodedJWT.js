const jwt = require("jsonwebtoken");
const fs = require("fs");
// const certificate = fs.readFileSync('certificate.csr');
const JWT_SECRET= process.env.JWT_SECRET;

const verifyJwt = (req, res, next) => {
  const token = req.session.auth;
  if (!token) {
    return res.status(401).json({ status: 401, message: 'Session expired.', otro:req.session });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ status: 401, message: 'Invalid token.' });
  }
};


module.exports = verifyJwt;