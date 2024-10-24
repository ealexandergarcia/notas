const { versionMiddleware } = require('../middleware/versionMiddleware'); 
const { authJwt, handleAuthErrors } = require('../middleware/authJwt'); 
const router = require("express").Router();
const UserController = require('../controllers/userController');

/** 
 * --------------------------------------------------------
 * * Version 1.0.0
 * --------------------------------------------------------
 */

/**
 * @route POST /api/users
 * @description Creates a new user account.
 * @header x-version: "1.0.0"
 * @body {String} username - Username of the user.
 * @body {String} password - Password for the account.
 * @body {String} email - Email address of the user.
 * @returns {Object} User created.
 */
router.post("/", versionMiddleware('1.0.0'), UserController.createAccount);

/**
 * @route POST /api/users/login
 * @description Logs in a user.
 * @header x-version: "1.0.0"
 * @body {String} email - Email of the user.
 * @body {String} password - Password for the account.
 * @returns {Object} Login token.
 */
router.post("/login", versionMiddleware('1.0.0'), UserController.logIn);

/**
 * @route PUT /api/users/:id
 * @description Updates user account details.
 * @header x-version: "1.0.0"
 * @param {String} id - ID of the user.
 * @body {String} [username] - New username (optional).
 * @body {String} [password] - New password (optional).
 * @body {String} [email] - New email (optional).
 * @returns {Object} Updated user account.
 */
router.put("/:id", versionMiddleware('1.0.0'), authJwt, UserController.updateUser);

/**
 * @route DELETE /api/users/:id
 * @description Deletes a user account.
 * @header x-version: "1.0.0"
 * @param {String} id - ID of the user.
 * @returns {Object} Deleted user account.
 */
router.delete("/:id", versionMiddleware('1.0.0'), authJwt, UserController.deleteUser);

module.exports = router;
