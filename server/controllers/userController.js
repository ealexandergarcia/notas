const User = require('../models/userModule');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const tokenJwt = require('../middleware/tokenJwt.js');

class UserController {
    // Crear cuenta de usuario
    static async createAccount(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                message: 'Validation errors',
                data: { errors: errors.array() }
            });
        }

        const { username, password, email } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ username, password: hashedPassword, email });
            res.status(201).json({
                status: 201,
                message: 'User account created successfully',
                data: user
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Error creating user account',
                data: { error: error.message }
            });
        }
    }

    // Iniciar sesión
    static async logIn(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                message: 'Validation errors',
                data: { errors: errors.array() }
            });
        }

        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    status: 404,
                    message: 'Invalid email or password'
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    status: 401,
                    message: 'Invalid email or password'
                });
            }

            const token = tokenJwt.generateToken({ userId: user._id, username: user.username });
            req.session.auth = token;
            res.status(200).json({
                status: 200,
                message: 'User logged in successfully',
                data: { token }
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Error logging in user',
                data: { error: error.message }
            });
        }
    }

    // Actualizar cuenta de usuario
    static async updateUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                message: 'Validation errors',
                data: { errors: errors.array() }
            });
        }

        const { id } = req.params;
        const { username, password, email } = req.body;
        try {
            const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
            const updateData = { username, email };
            if (hashedPassword) {
                updateData.password = hashedPassword;
            }

            const user = await User.findByIdAndUpdate(id, updateData, { new: true });
            if (!user) {
                return res.status(404).json({
                    status: 404,
                    message: 'User not found'
                });
            }
            res.status(200).json({
                status: 200,
                message: 'User account updated successfully',
                data: user
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Error updating user account',
                data: { error: error.message }
            });
        }
    }

    // Eliminar cuenta de usuario
    static async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({
                    status: 404,
                    message: 'User not found'
                });
            }
            res.status(200).json({
                status: 200,
                message: 'User account deleted successfully',
                data: user
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: 'Error deleting user account',
                data: { error: error.message }
            });
        }
    }
}

module.exports = UserController;
