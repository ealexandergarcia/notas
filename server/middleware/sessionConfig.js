const session = require('express-session');
const fs = require("fs");
// const secret = fs.readFileSync("certificate.csr", "utf8");
const secret= process.env.JWT_SECRET;
class SessionService {
  static initializeSession(app) {
    app.use(
      session({
        secret: secret,
        resave: true,
        saveUninitialized: false, 
        cookie: {
          secure: true, 
          httpOnly: false, 
          maxAge: 30 * 60 * 1000,
          sameSite: 'none'
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