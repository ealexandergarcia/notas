const session = require('express-session');
const fs = require("fs");
// const secret = fs.readFileSync("certificate.csr", "utf8");
const secret= process.env.JWT_SECRET;
class SessionService {
  static initializeSession(app) {
    app.use(
      session({
    secret: process.env.JWT_SECRET, // tu secret
    cookie: {
      httpOnly: true, 
      maxAge: 30 * 60 * 1000 // 30 minutos
    },
      })
    );
  }

  static setSession(req, key, value) {
    req.session[key] = value;
  }

  static getSession(req, key) {
    return req.session[key];
  }

  static destroySession(req) {
    req.session.destroy();
  }
}

module.exports = SessionService;