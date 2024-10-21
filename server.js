// server.js
const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors'); // Importar el paquete cors
const privateKey = fs.readFileSync('private.key');
const certificate = fs.readFileSync('certificate.crt');

const app = express();
const PORT_BACKEND = 5000;
const PORT_FRONTEND = 3000;

// Cargar el certificado y la clave
const options = {
    key: privateKey, // Ruta a tu clave privada
    cert:  certificate// Ruta a tu certificado
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

// Iniciar el servidor para el back-end en el puerto 5000
https.createServer(options, app).listen(PORT_BACKEND, () => {
    console.log(`Servidor back-end corriendo en https://localhost:${PORT_BACKEND}`);
});
