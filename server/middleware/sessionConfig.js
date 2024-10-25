const session = require("express-session")
const fs = require('fs');
const certificate = fs.readFileSync('certificate.csr');
const JWT_SECRET= certificate.toString('utf8');

module.exports = session ({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {  secure: true, maxAge: 1800000 }
})