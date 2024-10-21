// server.js
const express = require('express');
const cors = require('cors'); // Importar el paquete cors
const app = express();
const PORT = process.env.PORT || 5000;

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

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});