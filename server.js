// server.js
const express = require('express');
const Database = require('./server/helper/db/connect');
const { jsonParseErrorHandler } = require('./server/middleware/errorHandler');
const SessionService = require('./server/middleware/sessionConfig');
const verifyJwt = require('./server/middleware/decodedJWT');
const noteRoutes = require('./server/router/noteRouters');
const userRoutes = require('./server/router/userRouters');

const PORT_BACKEND = 5000;

const app = express();

app.use(cors({
    origin: 'https://ealexandergarcia.github.io',
    credentials: true, // Habilita el envío de cookies si es necesario
  }));

// Llama para inicializar la conexión
Database.getInstance();

// Middleware para parsear JSON
app.use(express.json());
SessionService.initializeSession(app);
// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

// Agregar las rutas de notas
app.use('/api/users', userRoutes);
app.use('/api/notes',verifyJwt, noteRoutes);

// Configuración de manejo de errores globales
app.use(jsonParseErrorHandler);

// Iniciar el servidor para el back-end en el puerto 5000
app.listen(PORT_BACKEND, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log("Edwin es gay")