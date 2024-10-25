const jwt = require('jsonwebtoken');
const fs = require('fs');
const certificate = fs.readFileSync('certificate.csr');

class JwtService {
  static generateToken(payload) {
    const JWT_SECRET= certificate.toString('utf8');
    return jwt.sign(payload, `${JWT_SECRET}`, { expiresIn: 1800000 });
  }

  static verifyToken(token) {
    return jwt.verify(token, `${JWT_SECRET}`);
  }
}

module.exports = JwtService;