// server.js
const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors'); // Importar el paquete cors
const Database = require('./server/helper/db/connect');
const privateKey = fs.readFileSync('private.key');
const certificate = fs.readFileSync('certificate.crt');
const { jsonParseErrorHandler } = require('./server/middleware/errorHandler'); // Importar el manejador de errores

// Importar las rutas de notas
const noteRoutes = require('./server/router/noteRouters');

const PORT_BACKEND = 5000;

// Configuracion de errores globales
const app = express();
Database.getInstance(); // Llama para inicializar la conexión

// Cargar el certificado y la clave
const options = {
    key: privateKey, // Ruta a tu clave privada
    cert: certificate // Ruta a tu certificado
};

// Middleware para habilitar CORS para el puerto 3000
app.use(cors({
    origin: 'http://localhost:3000' // Permitir solicitudes desde el puerto 3000
}));

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

// Agregar las rutas de notas
app.use('/api/notes', noteRoutes);

// Configuración de manejo de errores globales
app.use(jsonParseErrorHandler);

// Iniciar el servidor para el back-end en el puerto 5000
https.createServer(options, app).listen(PORT_BACKEND, () => {
    console.log(`Servidor back-end corriendo en https://localhost:${PORT_BACKEND}`);
});
