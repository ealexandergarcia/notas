const mongoose = require('mongoose');
const Note = require('../models/noteModule'); // Asegúrate de que la ruta es correcta

class NoteController {
    /**
     * @method getNotes
     * @description Obtener todas las notas con paginación opcional.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     */
    static async getNotes(req, res) {
        console.log(req.user.userId);
        const userId = req.user.userId;
        //   console.log(req.auth);
    // console.log(req.session.auth);
        const { page = 1, limit = 10 } = req.query; // Pagination parameters
        console.log('Received GET request for /api/notes'); // Add log

        try {
            // Filter notes by user_id and status "visible"
            const notes = await Note.find({
                user_id:userId,
                status: "visible"
            })
                .skip((page - 1) * limit)  // Skip the first (page-1)*limit
                .limit(parseInt(limit))     // Limit the number of results
                .select('-changes');        // Exclude the changes field

            console.log(notes);

            if (!notes || notes.length === 0) {
                return res.status(404).json({ status: 404, message: 'No notes found' });
            }

            res.status(200).json({
                status: 200,
                message: 'Notes retrieved successfully',
                notes
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, message: 'Error retrieving notes' });
        }
    }

    /**
     * @method getNoteByNoteId
     * @description Obtener una nota por ID.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     */
    static async getNoteByNoteId(req, res) {
        const userId = req.user.userId;
        console.log(userId);
        const { noteId } = req.params; // Get user ID and note ID from route parameters

        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({ status: 400, message: 'Invalid note ID' });
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

            res.status(200).json({
                status: 200,
                message: 'Note retrieved successfully',
                note
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, message: 'Error retrieving note' });
        }
    }

    /**
     * @method searchNotes
     * @description Buscar notas por título o descripción.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     */
    static async searchNotes(req, res) {
        const { query } = req.query;
        const userId = req.user.userId;
        console.log(userId);
        // Check if the query is defined
        if (!query) {
            return res.status(400).json({ status: 400, message: 'You must provide a search criterion' });
        }

        try {
            const notes = await Note.find({
                $text: { $search: query },
                status: 'visible',
                user_id: userId,
            }).select('-changes');

            // Check if any notes were found
            if (!notes || notes.length === 0) {
                return res.status(404).json({ status: 404, message: 'No notes found with that search criterion' });
            }

            res.status(200).json({
                message: 'Notes found',
                notes
            });
        } catch (error) {
            console.error('Error while searching for notes:', error);
            res.status(500).json({ status: 500, message: 'Error while searching for notes', error: error.message });
        }
    }

    /**
     * @method obtenerHistorial
     * @description Obtener historial de cambios de una nota.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     */
    static async obtenerHistorial(req, res) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid note ID' });
        }

        try {
            const note = await Note.findById(id); // Sin populate

            if (!note) {
                return res.status(404).json({ message: 'Note not found' });
            }

            res.status(200).json({
                message: 'Note history',
                changes: note.changes
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving note history' });
        }
    }

    /**
     * @method crearNota
     * @description Crear una nueva nota.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     */
    static async crearNota(req, res) {
        try {
            const { title, description, status } = req.body;
            const userId = req.user.userId;

            const newNote = new Note({
                title,
                description,
                user_id:userId,
                status
            });

            await newNote.save();

            res.status(201).json({
                message: 'Note created successfully',
                note: newNote
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating note' });
        }
    }

    /**
     * @method crearCambio
     * @description Crear un nuevo cambio en el historial de una nota.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     */
    static async crearCambio(req, res) {
        const { id } = req.params;
        const { title, description } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid note ID' });
        }

        try {
            const note = await Note.findById(id);
            if (!note) {
                return res.status(404).json({ message: 'Note not found' });
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
                message: 'Change saved successfully',
                note
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating change' });
        }
    }

    /**
     * @method actualizarNota
     * @description Actualizar una nota.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     */
    static async actualizarNota(req, res) {
        const { id } = req.params;
        const { title, description, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid note ID' });
        }

        try {
            const note = await Note.findById(id);
            if (!note) {
                return res.status(404).json({ message: 'Note not found' });
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
                message: 'Note updated successfully',
                note
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating note' });
        }
    }

    /**
     * @method eliminarNota
     * @description Eliminar una nota.
     * Cambia el estado de la nota a 'hidden' en lugar de eliminarla físicamente.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     */
    static async eliminarNota(req, res) {
        const { id } = req.params;

        // Validate the provided ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: 400, message: 'Invalid note ID' });
        }

        try {
            // Find the note by ID
            const note = await Note.findById(id);

            // Check if the note exists
            if (!note) {
                return res.status(404).json({ status: 400, message: 'Note not found' });
            }

            // Check if the note is already hidden
            if (note.status === 'hidden') {
                return res.status(400).json({ status: 400, message: 'Note is already hidden' });
            }

            // Change the status to hidden
            note.status = 'hidden';
            await note.save(); // Save the updated note

            res.status(200).json({
                status: 200,
                message: 'Note successfully hidden',
                note
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, message: 'Error hiding the note' });
        }
    }
}

module.exports = NoteController;
