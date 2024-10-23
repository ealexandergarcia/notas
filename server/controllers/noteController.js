const mongoose = require('mongoose');
const Note = require('../models/noteModule'); // Asegúrate de que la ruta es correcta

// Obtener todas las notas con paginación opcional
exports.getNotes = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Pagination parameters
  const { user_id } = req.params; // Get user_id from route params
  console.log('Received GET request for /api/notes'); // Add log

  try {
    // Filter notes by user_id and status "visible"
    const notes = await Note.find({
      user_id,
      status: "visible"
    })
      .skip((page - 1) * limit)  // Skip the first (page-1)*limit
      .limit(parseInt(limit))     // Limit the number of results
      .select('-changes');        // Exclude the changes field

    console.log(notes);

    if (!notes || notes.length === 0) {
      return res.status(404).json({ status:404,message: 'No notes found' });
    }

    res.status(200).json({
      status: 200,
      message: 'Notes retrieved successfully',
      notes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status:500 ,message: 'Error retrieving notes' });
  }
}

// Obtener una nota por ID
exports.getNoteByNoteId = async (req, res) => {
  const { userId, noteId } = req.params; // Get user ID and note ID from route parameters

  if (!mongoose.Types.ObjectId.isValid(noteId) || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ status:400, message: 'Invalid note ID or user ID' });
  }

  try {
    const note = await Note.findOne({
      _id: noteId,
      user_id: userId,
      status: 'visible' // Ensure the note is visible
    }).select('-changes');

    if (!note) {
      return res.status(404).json({ message: 'Note not found or not visible' });
    }

    // Return the found note without changes
    res.status(200).json({
      status: 200,
      message: 'Notes retrieved successfully',
      note
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status:500 ,message: 'Error retrieving notes' });
  }
}


// Buscar notas por título o descripción
exports.searchNotes = async (req, res) => {
  const { query } = req.query;

  // Check if the query is defined
  if (!query) {
    return res.status(400).json({ status: 400,message: 'You must provide a search criterion' });
  }

  try {
    const notes = await Note.find({
      $text: { $search: query },
      status: 'visible'
    }).select('-changes');

    // Check if any notes were found
    if (!notes || notes.length === 0) {
      return res.status(404).json({ status: 404,message: 'No notes found with that search criterion' });
    }

    res.status(200).json({
      message: 'Notes found',
      notes
    });
  } catch (error) {
    console.error('Error while searching for notes:', error);  // Add more context to the error
    res.status(500).json({ status: 500,message: 'Error while searching for notes', error: error.message });
  }
};


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

  // Validate the provided ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status:400,message: 'Invalid note ID' });
  }

  try {
    // Find the note by ID
    const note = await Note.findById(id);

    // Check if the note exists
    if (!note) {
      return res.status(404).json({ status:400,message: 'Note not found' });
    }

    // Check if the note is already hidden
    if (note.status === 'hidden') {
      return res.status(400).json({ status:400,message: 'Note is already hidden' });
    }

    // Change the status to hidden
    note.status = 'hidden';
    await note.save(); // Save the updated note

    res.status(200).json({
      status:200,
      message: 'Note successfully hidden',
      note
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status:500,message: 'Error hiding the note' });
  }
}

