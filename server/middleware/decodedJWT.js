const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_SECRET = fs.readFileSync('certificate.csr','utf8');

exports.auth = (req, res, next) =>{
    try{
        var payload = jwt.verify(req.session.auth,  JWT_SECRET);
        req.data = payload;
        next();
    } catch (error) {
        return res.status(401).json({status: 401, message: "Unauthorized"})
    }
}