# Documentación de la API

## Base URL
Ruta base: https://localhost:5000/api

## Configuracion del usuario de la db
db.createRole({
  role: "adminNotePad",
  privileges: [
    {
      resource: { db: "cineCampus", collection: "" },
      actions: [
        "find",
        "insert",
        "update",
        "remove",
        "createCollection",
        "createIndex",
        "dropCollection",
        "dropIndex",
        "collStats",
        "dbStats",
        "listCollections",
        "listIndexes"
      ]
    }
  ],
  roles: [
    { role: "readWrite", db: "notas" },
    { role: "dbAdmin", db: "notas" },
    { role: "userAdmin", db: "notas" }
  ]
})


se debe crear un usuario en la db notas que tenga el rol  de adminNotePad


## Versiones de API
Versión Actual: 1.0.0

### Rutas de Usuarios

#### 1. Crear cuenta de usuario
- Método: POST
- Ruta: /users
- Descripción: Crea una nueva cuenta de usuario.
- Headers:
  - x-version: "1.0.0"
- Body:
```json

  {
    "username": "string",
    "password": "string",
    "email": "string"
  }
  ```
- Respuesta:
  - 201 Created
   ```json
    {
      "status": 201,
      "message": "User account created successfully",
      "data": {
        "username": "string",
        "email": "string",
        "id": "string"
      }
    }
   ```
  - 400 Bad Request
   ```json
    {
      "status": 400,
      "message": "Validation errors",
      "data": {
        "errors": []
      }
    }
    ```
  - 500 Internal Server Error
  ```json
    {
      "status": 500,
      "message": "Error creating user account",
      "data": {
        "error": "error message"
      }
    }
   ```
#### 2. Iniciar sesión
- Método: POST
- Ruta: /users/login
- Descripción: Inicia sesión de un usuario.
- Headers:
  - x-version: "1.0.0"
- Body:
```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- Respuesta:
  - 200 OK
  ```json
    {
      "status": 200,
      "message": "User logged in successfully",
      "data": {
        "token": "string"
      }
    }
    ```
  - 400 Bad Request
  ```json
    {
      "status": 400,
      "message": "Validation errors",
      "data": {
        "errors": []
      }
    }
    ```
  - 404 Not Found
  ```json
    {
      "status": 404,
      "message": "Invalid email or password"
    }
    ```
  - 401 Unauthorized
  ```json
    {
      "status": 401,
      "message": "Invalid email or password"
    }
    ```
  - 500 Internal Server Error
  ```json
    {
      "status": 500,
      "message": "Error logging in user",
      "data": {
        "error": "error message"
      }
    }
    ```

#### 3. Actualizar cuenta de usuario
- Método: PUT
- Ruta: /users/:id
- Descripción: Actualiza los detalles de la cuenta del usuario.
- Headers:
  - x-version: "1.0.0"
- Params:
  - id: ID del usuario.
- Body:
```json
  {
    "username": "string",
    "password": "string",
    "email": "string"
  }
  ```
- Respuesta:
  - 200 OK
  ```json
    {
      "status": 200,
      "message": "User account updated successfully",
      "data": {
        "username": "string",
        "email": "string",
        "id": "string"
      }
    }
    ```
  - 400 Bad Request
  ```json
    {
      "status": 400,
      "message": "Validation errors",
      "data": {
        "errors": []
      }
    }
    ```
  - 404 Not Found
  ```json
    {
      "status": 404,
      "message": "User not found"
    }
    ```
  - 500 Internal Server Error
  ```json
    {
      "status": 500,
      "message": "Error updating user account",
      "data": {
        "error": "error message"
      }
    }
    ```

#### 4. Eliminar cuenta de usuario
- Método: DELETE
- Ruta: /users/:id
- Descripción: Elimina una cuenta de usuario.
- Headers:
  - x-version: "1.0.0"
- Params:
  - id: ID del usuario.
- Respuesta:
  - 200 OK
  ```json
    {
      "status": 200,
      "message": "User account deleted successfully",
      "data": {
        "username": "string",
        "email": "string",
        "id": "string"
      }
    }
    ```
  - 404 Not Found
  ```json
    {
      "status": 404,
      "message": "User not found"
    }
    ```
  - 500 Internal Server Error
  ```json
    {
      "status": 500,
      "message": "Error deleting user account",
      "data": {
        "error": "error message"
      }
    }
    ```

### Rutas de Notas

#### 1. Buscar notas
- Método: GET
- Ruta: /notes/search
- Descripción: Busca notas por título o descripción.
- Headers:
  - x-version: "1.0.0"
  - Authorization: Bearer {token}
- Query Params:
  - query: Término de búsqueda.
- Respuesta:
  - 200 OK
  ```json
    {
      "message": "Notes found",
      "notes": []
    }
    ```
  - 400 Bad Request
  ```json
    {
      "status": 400,
      "message": "You must provide a search criterion"
    }
    ```
  - 404 Not Found
  ```json
    {
      "status": 404,
      "message": "No notes found with that search criterion"
    }
    ```
  - 500 Internal Server Error
  ```json
    {
      "status": 500,
      "message": "Error while searching for notes",
      "error": "error message"
    }
    ```

#### 2. Obtener todas las notas
- Método: GET
- Ruta: /notes
- Descripción: Obtiene todas las notas con paginación opcional.
- Headers:
  - x-version: "1.0.0"
  - Authorization: Bearer {token}
- Query Params:
  - page: Número de página (opcional, por defecto 1).
  - limit: Límites de resultados por página (opcional, por defecto 10).
- Respuesta:
  - 200 OK
  ```json
    {
      "status": 200,
      "message": "Notes retrieved successfully",
      "notes": []
    }
    ```
  - 404 Not Found
  ```json
    {
      "status": 404,
      "message": "No notes found"
    }
    ```
  - 500 Internal Server Error
  ```json
    {
      "status": 500,
      "message": "Error retrieving notes"
    }
    ```

#### 3. Obtener una nota por ID
- Método: GET
- Ruta: /notes/:noteId
- Descripción: Obtiene una nota por ID.
- Headers:
  - x-version: "1.0.0"
  - Authorization: Bearer {token}
- Params:
  - noteId: ID de la nota.
- Respuesta:
  - 200 OK
  ```json
    {
      "status": 200,
      "message": "Note retrieved successfully",
      "note": {}
    }
    ```
  - 400 Bad Request
  ```json
    {
      "status": 400,
      "message": "Invalid note ID"
    }
    ```
  - 404 Not Found
  ```json
    {
      "status": 404,
      "message": "Note not found or not visible"
    }
    ```
  - 500 Internal Server Error
  ```json
    {
      "status": 500,
      "message": "Error retrieving note"
    }
    ```

#### 4. Obtener historial de cambios de una nota
- Método: GET
- Ruta: /notes/:id/history
- Descripción: Obtiene el historial de cambios de una nota.
- Headers:
  - x-version: "1.0.0"
  - Authorization: Bearer {token}
- Params:
  - id: ID de la nota.
- Respuesta:
  - 200 OK
  ```json
    {
      "message": "Note history",
      "changes": []
    }
    ```
  - 400 Bad Request
  ```json
    {
      "message": "Invalid note ID"
    }
    ```
  - 404 Not Found
  ```json
    {
      "message": "Note not found"
    }
    ```
  - 500 Internal Server Error
  ```json
    {
      "message": "Error retrieving note history"
    }
    ```

#### 5. Crear una nota
- Método: POST
- Ruta: /notes
- Descripción: Crea una nueva nota.
- Headers:
  - x-version: "1.0.0"
  - Authorization: Bearer {token}
- Body:
```json
  {
    "title": "string",
    "description": "string"
  }
  ```
- Respuesta:
  - 201 Created
  ```json
    {
      "status": 201,
      "message": "Note created successfully",
      "note": {}
    }
    ```
  - 400 Bad Request
  ```json
    {
      "status": 400,
      "message": "Validation errors",
      "data": {
        "errors": []
      }
    }
    ```
  - 500 Internal Server Error
  ```json
    {
      "status": 500,
      "message": "Error creating note",
      "data": {
        "error": "error message"
      }
    }
    ```

#### 6. Actualizar una nota
- Método: PUT
- Ruta: /notes/:id
- Descripción: Actualiza una nota existente.
- Headers:
  - x-version: "1.0.0"
  - Authorization: Bearer {token}
- Params:
  - id: ID de la nota.
- Body:
```json
  {
    "title": "string",
    "description": "string"
  }
  ```
- Respuesta:
  - 200 OK
  ```json
    {
      "status": 200,
      "message": "Note updated successfully",
      "note": {}
    }
    ```
  - 400 Bad Request
  ```json
    {
      "status": 400,
      "message": "Validation errors",
      "data": {
        "errors": []
      }
    }
    ```
  - 404 Not Found
  ```json
    {
      "status": 404,
      "message": "Note not found"
    }
    ```
  - 500 Internal Server Error
  ```json
    {
      "status": 500,
      "message": "Error updating note",
      "data": {
        "error": "error message"
      }
    }
    ```

#### 7. Eliminar (ocultar) una nota
- Método: DELETE
- Ruta: /notes/:id
- Descripción: Elimina (oculta) una nota por ID.
- Headers:
  - x-version: "1.0.0"
  - Authorization: Bearer {token}
- Params:
  - id: ID de la nota.
- Respuesta:
  - 200 OK
  ```json
    {
      "status": 200,
      "message": "Note deleted successfully",
      "note": {}
    }
    ```
  - 404 Not Found
  ```json
    {
      "status": 404,
      "message": "Note not found"
    }
    ```
  - 500 Internal Server Error
  ```json
    {
      "status": 500,
      "message": "Error deleting note",
      "data": {
        "error": "error message"
      }
    }
    ```
## DEPENCENDIAS
```json
{
  "name": "notepad",                      // Nombre del proyecto
  "version": "1.0.0",                     // Versión actual del proyecto
  "main": "server.js",                    // Archivo principal del proyecto
  "keywords": [],                          // Palabras clave relacionadas con el proyecto
  "author": "",                            // Autor del proyecto
  "license": "ISC",                       // Licencia del proyecto
  "scripts": {                             // Scripts de NPM para tareas de desarrollo
    "dev:back": "node --env-file .env --watch server.js",  // Inicia el servidor en modo desarrollo
    "dev:front": "vite",                   // Inicia el frontend con Vite
    "dev": "concurrently \"npm run dev:front\" \"npm run dev:back\"",  // Inicia ambos servidores simultáneamente
    "build": "vite build",                 // Compila el proyecto para producción
    "lint": "eslint .",                    // Ejecuta el linter ESLint en el proyecto
    "preview": "vite preview"              // Previsualiza el proyecto después de compilar
  },
  "dependencies": {                        // Dependencias del proyecto
    "bcrypt": "^5.1.1",                    // Librería para encriptar contraseñas
    "bcryptjs": "^2.4.3",                  // Implementación de bcrypt en JavaScript puro
    "concurrently": "^9.0.1",              // Ejecuta múltiples comandos al mismo tiempo
    "cors": "^2.8.5",                      // Middleware para habilitar CORS
    "express": "^4.21.1",                  // Framework web para Node.js
    "express-jwt": "^8.4.1",               // Middleware para autenticación JWT en Express
    "express-rate-limit": "^7.4.1",        // Middleware para limitar las tasas de solicitud
    "express-session": "^1.18.1",          // Middleware para manejar sesiones en Express
    "express-validator": "^7.2.0",         // Middleware para validar datos en Express
    "https": "^1.0.0",                     // Módulo de HTTPS para seguridad
    "jsonwebtoken": "^9.0.2",              // Librería para manejar JWT
    "lucide-react": "^0.453.0",            // Librería de iconos SVG para React
    "mongoose": "^8.7.2",                  // ODM para MongoDB
    "notepad": "file:",                    // Dependencia local, probablemente un módulo personalizado
    "react": "^18.3.1",                    // Biblioteca para construir interfaces de usuario
    "react-dom": "^18.3.1",                // Interfaz entre React y el DOM
    "react-router-dom": "^6.27.0",         // Librería para manejar rutas en aplicaciones React
    "semver": "^7.6.3",                    // Biblioteca para manejar versiones semánticas
    "sweetalert2": "^11.14.4",             // Librería para mostrar alertas atractivas
    "sweetalert2-react-content": "^5.0.7"  // Integración de SweetAlert2 con React
  },
  "devDependencies": {                     // Dependencias de desarrollo
    "@eslint/js": "^9.11.1",               // ESLint para JavaScript
    "@types/react": "^18.3.10",            // Tipos para React
    "@types/react-dom": "^18.3.0",         // Tipos para React DOM
    "@vitejs/plugin-react": "^4.3.2",      // Plugin para usar React con Vite
    "autoprefixer": "^10.4.20",            // PostCSS plugin para agregar prefijos CSS automáticamente
    "eslint": "^9.11.1",                    // Herramienta de linting para mantener la calidad del código
    "eslint-plugin-react": "^7.37.0",      // Plugin de ESLint para verificar reglas de React
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",  // Plugin de ESLint para verificar reglas de hooks de React
    "eslint-plugin-react-refresh": "^0.4.12",  // Plugin para habilitar React Fast Refresh
    "globals": "^15.9.0",                   // Definiciones de variables globales
    "postcss": "^8.4.47",                   // Herramienta para transformar CSS con plugins
    "tailwindcss": "^3.4.14",               // Framework de CSS para diseño rápido
    "vite": "^5.4.8"                        // Herramienta de construcción para proyectos web
  }
}
```