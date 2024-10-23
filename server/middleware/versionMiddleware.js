// server/middleware/versionMiddleware.js
const semver = require('semver');

exports.versionMiddleware = (version) => {
    return function (req, res, next) {
        const requestedVersion = req.headers['x-version'];

        if (requestedVersion) { // Si existe el encabezado
            if (semver.gte(requestedVersion, version)) {
                return next(); // La versión es suficiente, continúa
            }
            return next('route'); // La versión no es suficiente, ir a la siguiente ruta
        } else {
            return next('route'); // Sin versión, ir a la siguiente ruta
        }
    };
};
