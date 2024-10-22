const { body, param, query, validationResult } = require('express-validator');

// Validaciones para crear una nota
const crearNotaValidator = [
  body('title')
    .isString()
    .withMessage('El título debe ser una cadena de caracteres.')
    .notEmpty()
    .withMessage('El título es obligatorio.')
    .isLength({ max: 100 })
    .withMessage('El título no puede tener más de 100 caracteres.'),
  
  body('description')
    .isString()
    .withMessage('La descripción debe ser una cadena de caracteres.')
    .notEmpty()
    .withMessage('La descripción es obligatoria.')
    .isLength({ max: 500 })
    .withMessage('La descripción no puede tener más de 500 caracteres.'),
  
  body('usuario_id')
    .isMongoId()
    .withMessage('El ID del usuario debe ser un ID de MongoDB válido.'),
  
  body('status')
    .optional()
    .isIn(['visible', 'not visible'])
    .withMessage('El estado debe ser "visible" o "not visible".')
];

// Validaciones para actualizar una nota
const actualizarNotaValidator = [
  param('id')
    .isMongoId()
    .withMessage('El ID de la nota debe ser un ID de MongoDB válido.'),
  
  body('title')
    .optional()
    .isString()
    .withMessage('El título debe ser una cadena de caracteres.')
    .isLength({ max: 100 })
    .withMessage('El título no puede tener más de 100 caracteres.'),
  
  body('description')
    .optional()
    .isString()
    .withMessage('La descripción debe ser una cadena de caracteres.')
    .isLength({ max: 500 })
    .withMessage('La descripción no puede tener más de 500 caracteres.'),
  
  body('status')
    .optional()
    .isIn(['visible', 'not visible'])
    .withMessage('El estado debe ser "visible" o "not visible".')
];

// Validaciones para el ID de la nota en las rutas PUT y DELETE
const notaIdValidator = [
  param('id')
    .isMongoId()
    .withMessage('El ID de la nota debe ser un ID de MongoDB válido.')
];

// Validaciones para la búsqueda de notas
const buscarNotasValidator = [
  query('query')
    .isString()
    .withMessage('El parámetro de búsqueda debe ser una cadena de caracteres.')
    .notEmpty()
    .withMessage('El parámetro de búsqueda es obligatorio.')
];

// Middleware para manejar los errores de validación
const validarCampos = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      message: 'Errores de validación',
      errors: errores.array()
    });
  }
  next();
};

module.exports = {
  crearNotaValidator,
  actualizarNotaValidator,
  notaIdValidator,
  buscarNotasValidator,
  validarCampos
};
