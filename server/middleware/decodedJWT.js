const jwt = require("jsonwebtoken");
const fs = require("fs");
const secret = fs.readFileSync("certificate.csr", "utf8");

const verifyJwt = (req, res, next) => {
  const token = req.session.auth;
  if (!token) {
    return res.status(401).json({ status: 401, message: 'Session expired.', otro:req.session });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ status: 401, message: 'Invalid token.', otro:req.session });
  }
};

module.exports = verifyJwt;