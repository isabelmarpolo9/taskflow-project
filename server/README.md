## Backend API

El backend está construido con Express y TypeScript en la carpeta `server/`.

### Arquitectura
```
server/
├── src/
│   ├── config/        # Variables de entorno centralizadas
│   ├── controllers/   # Extrae datos de la petición y devuelve respuesta
│   ├── middleware/    # Logger y manejo global de errores
│   ├── models/        # Interfaces TypeScript del dominio
│   ├── routes/        # Mapeo de URLs a controladores
│   ├── services/      # Lógica de negocio pura
│   └── validators/    # Validación de datos con Zod
└── .env               # Variables de entorno (no se sube a GitHub)
```

### Middlewares

- **express.json()** — transforma el cuerpo de las peticiones de texto crudo a objetos JavaScript
- **cors()** — permite que el frontend en otro dominio/puerto consuma la API
- **logger** — registra método, URL, código de respuesta y tiempo de cada petición
- **errorHandler** — captura errores no controlados y devuelve respuestas limpias sin filtrar detalles técnicos

### Endpoints

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | /api/v1/tasks | Obtener todas las tareas |
| GET | /api/v1/tasks/:id | Obtener una tarea |
| POST | /api/v1/tasks | Crear una tarea |
| PUT | /api/v1/tasks/:id | Actualizar una tarea |
| DELETE | /api/v1/tasks/:id | Eliminar una tarea |

### Arrancar el servidor
```bash
cd server
npm install
npm run dev
```