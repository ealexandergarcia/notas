const { versionMiddleware } = require('../middleware/versionMiddleware'); // Importa el middleware
const router = require("express").Router();
const {
  getNotes,
  getNoteByNoteId,
  searchNotes,
  obtenerHistorial,
  crearNota,
  crearCambio,
  actualizarNota,
  eliminarNota
} = require('../controllers/noteController');

/** 
 * --------------------------------------------------------
 * * Version 1.0.0
 * --------------------------------------------------------
 */

/**
 * @route GET /api/notes/search
 * @description Busca notas por título o descripción.
 * @header x-version: "1.0.0"
 * @returns {Object} Notas encontradas.
 */
router.get("/search", versionMiddleware('1.0.0'), searchNotes);

/**
 * @route GET /api/notes
 * @description Obtiene todas las notas con paginación opcional.
 * @header x-version: "1.0.0"
 * @returns {Object} Lista de notas.
 */
router.get("/:user_id", versionMiddleware('1.0.0'), getNotes); // Updated route

/**
 * @route GET /api/notes/:id
 * @description Obtiene una nota por ID.
 * @header x-version: "1.0.0"
 * @param {String} id - ID de la nota.
 * @returns {Object} Nota encontrada.
 */
router.get("/:userId/:noteId", versionMiddleware('1.0.0'), getNoteByNoteId);

/**
 * @route GET /api/notes/:id/history
 * @description Obtiene el historial de cambios de una nota.
 * @header x-version: "1.0.0"
 * @param {String} id - ID de la nota.
 * @returns {Object} Historial de la nota.
 */
router.get("/:id/history", versionMiddleware('1.0.0'), obtenerHistorial);

/**
 * @route POST /api/notes
 * @description Crea una nueva nota.
 * @header x-version: "1.0.0"
 * @body {String} title - Título de la nota.
 * @body {String} description - Descripción de la nota.
 * @body {ObjectId} user_id - ID del usuario.
 * @body {String} [status] - Estado de la nota (opcional).
 * @returns {Object} Nota creada.
 */
router.post("/", versionMiddleware('1.0.0'), crearNota);

/**
 * @route POST /api/notes/:id/history
 * @description Crea un nuevo cambio en el historial de una nota.
 * @header x-version: "1.0.0"
 * @param {String} id - ID de la nota.
 * @body {String} title - Nuevo título de la nota.
 * @body {String} description - Nueva descripción de la nota.
 * @returns {Object} Cambio guardado.
 */
router.post("/:id/history", versionMiddleware('1.0.0'), crearCambio);

/**
 * @route PUT /api/notes/:id
 * @description Actualiza una nota.
 * @header x-version: "1.0.0"
 * @param {String} id - ID de la nota.
 * @body {String} [title] - Nuevo título de la nota (opcional).
 * @body {String} [description] - Nueva descripción de la nota (opcional).
 * @body {String} [status] - Nuevo estado de la nota (opcional).
 * @returns {Object} Nota actualizada.
 */
router.put("/:id", versionMiddleware('1.0.0'), actualizarNota);

/**
 * @route DELETE /api/notes/:id
 * @description Elimina una nota.
 * @header x-version: "1.0.0"
 * @param {String} id - ID de la nota.
 * @returns {Object} Nota eliminada.
 */
router.delete("/:id", versionMiddleware('1.0.0'), eliminarNota);

module.exports = router;
