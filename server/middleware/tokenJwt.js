const jwt = require('jsonwebtoken');

class JwtService {
  static generateToken(payload) {
    return jwt.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });
  }

  static verifyToken(token) {
    return jwt.verify(token, `${process.env.JWT_SECRET}`);
  }
}

module.exports = JwtService;