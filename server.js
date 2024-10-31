// server.js
const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors'); // Importar el paquete cors
const Database = require('./server/helper/db/connect');
// const privateKey = fs.readFileSync('private.key');
// const certificate = fs.readFileSync('certificate.crt');
const { jsonParseErrorHandler } = require('./server/middleware/errorHandler'); // Importar el manejador de errores
const  SessionService  = require('./server/middleware/sessionConfig'); // Importar el manejador de errores
const verifyJwt = require('./server/middleware/decodedJWT')
// Importar las rutas de notas
const noteRoutes = require('./server/router/noteRouters');
const userRoutes = require('./server/router/userRouters');

const PORT_BACKEND = 5000;


const app = express();

// Middleware para habilitar CORS para el puerto 3000
// app.use(cors({
//     origin: ['https://ealexandergarcia.github.io'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
//     credentials: true
// }));


 // Llama para inicializar la conexión
Database.getInstance();

// Cargar el certificado y la clave
// const options = {
//     key: privateKey, // Ruta a tu clave privada
//     cert: certificate // Ruta a tu certificado
// };


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
