# Gestión de Tareas ✦

Aplicación web fullstack de gestión de tareas personal. Permite crear, organizar, filtrar y completar tareas con una interfaz moderna y un backend REST propio.

## Demo

[Ver aplicación en producción](https://taskflow-project-git-feature-fu-677fc5-isabelmarpolo9s-projects.vercel.app)

## Funcionalidades

- Añadir tareas con categoría (trabajo, estudio, personal) y prioridad (alta, media, baja)
- Marcar tareas como completadas
- Editar tareas inline
- Eliminar tareas individualmente
- Marcar todas las tareas como completadas
- Borrar todas las tareas completadas
- Filtrar por categoría desde el menú lateral
- Buscar tareas por texto en tiempo real
- Ordenar por prioridad
- Panel de estadísticas (total, completadas, pendientes)
- Modo oscuro / claro
- Diseño responsive para móvil y escritorio

## Tecnologías

**Frontend**
- HTML5 semántico
- Tailwind CSS 3
- JavaScript ES Modules
- Fetch API para comunicación con el backend

**Backend**
- Node.js
- Express
- TypeScript
- Zod (validación de datos)
- dotenv (variables de entorno)

## Estructura del proyecto
```
taskflow/
├── api/
│   └── index.ts        # API Express para Vercel
├── src/
│   ├── api/
│   │   └── client.js   # Capa de comunicación con el backend
│   ├── app.js          # Punto de entrada, eventos
│   ├── tasks.js        # Lógica de tareas
│   ├── ui.js           # Renderizado del DOM
│   ├── theme.js        # Modo oscuro
│   └── storage.js      # LocalStorage
├── server/             # Servidor Express para desarrollo local
├── docs/               # Documentación técnica
├── index.html
└── output.css          # CSS generado por Tailwind
```

## Instalación local
```bash
# Instalar dependencias del frontend
npm install

# Compilar Tailwind en modo watch
npx tailwindcss -i ./input.css -o ./output.css --watch

# Arrancar el backend local
cd server
npm install
npm run dev
```

Abre `index.html` con Live Server en VS Code.

## API REST

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/v1/tasks | Obtener todas las tareas |
| POST | /api/v1/tasks | Crear una tarea |
| PUT | /api/v1/tasks/:id | Actualizar una tarea |
| DELETE | /api/v1/tasks/:id | Eliminar una tarea |