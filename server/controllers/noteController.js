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
        const userId = req.auth.userId;
        const { page = 1, limit = 10 } = req.query; // Paginación
        console.log('Received GET request for /api/notes');

        try {
            const notes = await Note.find({
                user_id: userId,
                status: "visible"
            })
                .skip((page - 1) * limit)
                .limit(parseInt(limit))
                .select('-changes');

            if (!notes || notes.length === 0) {
                return res.status(404).json({ status: 404, message: 'No notes found' });
            }

            res.status(200).json({
                status: 200,
                message: 'Notes retrieved successfully',
                data: notes
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
        const userId = req.auth.userId;
        const { noteId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({ status: 400, message: 'Invalid note ID' });
        }

        try {
            const note = await Note.findOne({
                _id: noteId,
                user_id: userId,
                status: 'visible'
            }).select('-changes');

            if (!note) {
                return res.status(404).json({ status: 404, message: 'Note not found or not visible' });
            }

            res.status(200).json({
                status: 200,
                message: 'Note retrieved successfully',
                data: note
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
        const userId = req.auth.userId;

        if (!query) {
            return res.status(400).json({ status: 400, message: 'You must provide a search criterion' });
        }

        try {
            const notes = await Note.find({
                $text: { $search: query },
                status: 'visible',
                user_id: userId,
            }).select('-changes');

            if (!notes || notes.length === 0) {
                return res.status(404).json({ status: 404, message: 'No notes found with that search criterion' });
            }

            res.status(200).json({
                status: 200,
                message: 'Notes found',
                data: notes
            });
        } catch (error) {
            console.error('Error while searching for notes:', error);
            res.status(500).json({ status: 500, message: 'Error while searching for notes' });
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
            return res.status(400).json({ status: 400, message: 'Invalid note ID' });
        }

        try {
            const note = await Note.findById(id);

            if (!note) {
                return res.status(404).json({ status: 404, message: 'Note not found' });
            }

            res.status(200).json({
                status: 200,
                message: 'Note history',
                data: note.changes
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, message: 'Error retrieving note history' });
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
            const userId = req.auth.userId;

            const newNote = new Note({
                title,
                description,
                user_id: userId,
                status
            });

            await newNote.save();

            res.status(201).json({
                status: 201,
                message: 'Note created successfully',
                data: newNote
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, message: 'Error creating note' });
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
            return res.status(400).json({ status: 400, message: 'Invalid note ID' });
        }

        try {
            const note = await Note.findById(id);
            if (!note) {
                return res.status(404).json({ status: 404, message: 'Note not found' });
            }

            note.changes.push({
                title: note.title,
                description: note.description,
                date: new Date()
            });

            note.title = title || note.title;
            note.description = description || note.description;

            await note.save();

            res.status(200).json({
                status: 200,
                message: 'Change saved successfully',
                data: note
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, message: 'Error creating change' });
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
            return res.status(400).json({ status: 400, message: 'Invalid note ID' });
        }

        try {
            const note = await Note.findById(id);
            if (!note) {
                return res.status(404).json({ status: 404, message: 'Note not found' });
            }

            note.changes.push({
                title: note.title,
                description: note.description,
                date: new Date()
            });

            if (title) note.title = title;
            if (description) note.description = description;
            if (status) note.status = status;

            await note.save();

            res.status(200).json({
                status: 200,
                message: 'Note updated successfully',
                data: note
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, message: 'Error updating note' });
        }
    }

    /**
     * @method eliminarNota
     * @description Eliminar una nota. Cambia el estado de la nota a 'hidden' en lugar de eliminarla físicamente.
     * @param {Object} req - La solicitud HTTP.
     * @param {Object} res - La respuesta HTTP.
     */
    static async eliminarNota(req, res) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: 400, message: 'Invalid note ID' });
        }

        try {
            const note = await Note.findById(id);

            if (!note) {
                return res.status(404).json({ status: 404, message: 'Note not found' });
            }

            if (note.status === 'hidden') {
                return res.status(400).json({ status: 400, message: 'Note is already hidden' });
            }

            note.status = 'hidden';
            await note.save();

            res.status(200).json({
                status: 200,
                message: 'Note successfully hidden',
                data: note
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ status: 500, message: 'Error hiding the note' });
        }
    }
}

module.exports = NoteController;
