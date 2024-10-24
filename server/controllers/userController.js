const User = require('../models/userModule');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const tokenJwt = require('../middleware/tokenJwt.js');

class UserController {
    // Crear cuenta de usuario
    static async createAccount(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password, email } = req.body;
        try {
            // Hashear la contraseña antes de guardar
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, password: hashedPassword, email });
            res.status(201).json({ message: 'User account created successfully', user });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user account', error: error.message });
        }
    }

    // Iniciar sesión
    static async logIn(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'Invalid email or password' });
            }

            // Comparar la contraseña proporcionada con la almacenada
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const token = tokenJwt.generateToken({ userId: user._id, username: user.username });
            res.status(200).json({ message: 'User logged in successfully', token });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in user', error: error.message });
        }
    }

    // Actualizar cuenta de usuario
    static async updateUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { username, password, email } = req.body;
        try {
            // Hashear la nueva contraseña si se proporciona
            const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
            const updateData = { username, email };
            if (hashedPassword) {
                updateData.password = hashedPassword;
            }

            const user = await User.findByIdAndUpdate(id, updateData, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User account updated successfully', user });
        } catch (error) {
            res.status(500).json({ message: 'Error updating user account', error: error.message });
        }
    }

    // Eliminar cuenta de usuario
    static async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User account deleted successfully', user });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user account', error: error.message });
        }
    }

}

module.exports = UserController;
