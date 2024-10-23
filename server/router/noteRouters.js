const router = require("express").Router();
const {
  obtenerNotas,
  obtenerNotaPorId,
  buscarNotas,
  obtenerHistorial,
  crearNota,
  crearCambio,
  actualizarNota,
  eliminarNota
} = require('../controllers/noteController');

// Rutas de notas
router.get("/search", buscarNotas);  // Para buscar notas por título o descripción
router.get("/", obtenerNotas);  // Debe manejar la ruta /api/notes/
router.get("/:id", obtenerNotaPorId);  // Para obtener una nota por ID
router.get("/:id/history", obtenerHistorial);  // Para obtener el historial de cambios de una nota
router.post("/", crearNota);  // Para crear una nueva nota
router.post("/:id/history", crearCambio);  // Para crear un cambio en el historial
router.put("/:id", actualizarNota);  // Para actualizar una nota
router.delete("/:id", eliminarNota);  // Para eliminar una nota

module.exports = router;
