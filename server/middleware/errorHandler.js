// errorHandler.js
exports.jsonParseErrorHandler = (err, req, res, next) => {
  // Manejo de errores de sintaxis
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(err.message);
    return res.status(400).json({
      status: 400,
      message: "El JSON enviado no cumple con el formato requerido",
    });
  }
  next(err); // Pasa al siguiente middleware de manejo de errores
};
