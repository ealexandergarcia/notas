const mongoose = require('mongoose');
const Note = require('../models/noteModule'); // Asegúrate de que la ruta es correcta

// Obtener todas las notas con paginación opcional
exports.obtenerNotas = async (req, res)=> {
  const { page = 1, limit = 10 } = req.query;  // Paginación por query params
  console.log('Recibiendo solicitud GET para /api/notes'); // Agregar log
  try {
    const notes = await Note.find()
      .skip((page - 1) * limit)  // Saltar los primeros (page-1)*limit
      .limit(parseInt(limit));  // Limitar la cantidad de resultados
    console.log(notes);

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron notas' });
    }

    res.status(200).json({
      message: 'Notas obtenidas exitosamente',
      notes,
      page,
      limit
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las notas' });
  }
}

// Obtener una nota por ID
exports.obtenerNotaPorId = async(req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID de nota no válido' });
  }

  try {
    const note = await Note.findById(id); // Sin populate

    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    res.status(200).json({
      message: 'Nota encontrada',
      note
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la nota' });
  }
}

// Buscar notas por título o descripción
exports.buscarNotas = async (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ message: 'Debe proporcionar un criterio de búsqueda' });
  }

  try {
    const notes = await Note.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });

    if (notes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron notas con ese criterio de búsqueda' });
    }

    res.status(200).json({
      message: 'Notas encontradas',
      notes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al buscar las notas' });
  }
}

// Obtener historial de cambios de una nota
exports.obtenerHistorial = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID de nota no válido' });
  }

  try {
    const note = await Note.findById(id); // Sin populate

    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    res.status(200).json({
      message: 'Historial de la nota',
      changes: note.changes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el historial de la nota' });
  }
}

// Crear una nueva nota
exports.crearNota = async (req, res) => {
  try {
    const { title, description, user_id, status } = req.body;

    const newNote = new Note({
      title,
      description,
      user_id,
      status
    });

    await newNote.save();

    res.status(201).json({
      message: 'Nota creada exitosamente',
      note: newNote
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la nota' });
  }
}

// Crear un nuevo cambio en el historial de una nota
exports.crearCambio = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID de nota no válido' });
  }

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    // Guardar el cambio en el historial
    note.changes.push({
      title: note.title,
      description: note.description,
      date: new Date()
    });

    // Actualizar la nota actual con los datos nuevos
    note.title = title || note.title;
    note.description = description || note.description;

    await note.save();

    res.status(200).json({
      message: 'Cambio guardado exitosamente',
      note
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el cambio' });
  }
}

// Actualizar una nota
exports.actualizarNota = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID de nota no válido' });
  }

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    // Guardar el cambio en el historial
    note.changes.push({
      title: note.title,
      description: note.description,
      date: new Date()
    });

    // Actualizar solo los campos que han sido modificados
    if (title) note.title = title;
    if (description) note.description = description;
    if (status) note.status = status;

    await note.save();

    res.status(200).json({
      message: 'Nota actualizada exitosamente',
      note
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la nota' });
  }
}

// Eliminar una nota
exports.eliminarNota = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID de nota no válido' });
  }

  try {
    const deletedNote = await Note.findByIdAndDelete(id); // Sin populate

    if (!deletedNote) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    res.status(200).json({
      message: 'Nota eliminada exitosamente',
      note: deletedNote
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la nota' });
  }
}
