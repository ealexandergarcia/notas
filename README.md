# Documentación de la API

## Base URL
Ruta base: https://localhost:5000/api

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
