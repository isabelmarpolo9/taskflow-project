# Gestión de Tareas ✦

Aplicación web de gestión de tareas construida con HTML, Tailwind CSS y JavaScript modular. Permite organizar tareas por categoría y prioridad, con persistencia en localStorage.

## Funcionalidades

- **Añadir tareas** con categoría (trabajo, estudio, personal) y prioridad (alta, media, baja)
- **Marcar como completadas** — las tareas completadas se tachan y se atenúan
- **Editar tareas** inline sin salir de la pantalla
- **Eliminar tareas** individualmente
- **Filtrar por categoría** desde el menú lateral
- **Buscar por texto** en tiempo real
- **Ordenar por prioridad** (alta → media → baja)
- **Contador de tareas** por categoría en el aside
- **Modo oscuro / claro** con persistencia
- **Persistencia** — las tareas se guardan en localStorage

## Tecnologías

- HTML5
- Tailwind CSS 3
- JavaScript ES Modules
- localStorage API

## Estructura del proyecto

```
taskflow/
├── index.html
├── input.css
├── output.css          # generado por Tailwind
├── tailwind.config.js
├── src/
│   ├── app.js          # punto de entrada, eventos
│   ├── tasks.js        # lógica de tareas
│   ├── ui.js           # renderizado del DOM
│   ├── theme.js        # modo oscuro
│   └── storage.js      # lectura/escritura localStorage
└── docs/
    └── ai/             # documentación del uso de IA
```

## Instalación y uso local

```bash
# Instalar dependencias
npm install

# Compilar Tailwind en modo watch
npx tailwindcss -i ./input.css -o ./output.css --watch
```

Abre `index.html` con Live Server en VS Code.

## Ejemplos de uso

### Añadir una tarea
1. Escribe el nombre de la tarea en el campo "¿Qué hay que hacer?"
2. Selecciona la categoría y la prioridad
3. Pulsa **Añadir tarea** o presiona **Enter**

### Marcar una tarea como completada
Haz clic en el círculo a la izquierda de la tarea. El texto se tachará y la tarjeta se atenuará.

### Editar una tarea
Haz clic en el icono ✏️ de la tarjeta. Escribe el nuevo texto y pulsa **Enter** o el botón ✓ para guardar. Pulsa **Escape** para cancelar.

### Ordenar por prioridad
Haz clic en el botón **↕ Ordenar por prioridad** para ordenar las tareas de mayor a menor prioridad. Vuelve a hacer clic para desactivar el orden.

### Filtrar por categoría
Haz clic en **Trabajo**, **Estudio** o **Personal** en el menú lateral para ver solo las tareas de esa categoría.

## Documentación del uso de IA

Consulta la carpeta [`docs/ai/`](./docs/ai/) para ver cómo se ha utilizado la IA en este proyecto:

- [`ai-comparison.md`](./docs/ai/ai-comparison.md) — Comparativa Claude vs ChatGPT
- [`cursor-workflow.md`](./docs/ai/cursor-workflow.md) — Flujo de trabajo con Cursor
- [`prompt-engineering.md`](./docs/ai/prompt-engineering.md) — Técnicas de prompting
- [`experiments.md`](./docs/ai/experiments.md) — Experimentos con y sin IA

## Despliegue

- Ejercicio 2 (JS + LocalStorage): [taskflow-project-omega.vercel.app](https://taskflow-project-omega.vercel.app)
- Ejercicio 3 (Tailwind): [taskflow-project-git-feature-tailwind-isabelmarpolo9s-projects.vercel.app](https://taskflow-project-git-feature-tailwind-isabelmarpolo9s-projects.vercel.app)

## Diseño de la interfaz

La aplicación se divide en tres zonas principales:

- **Cabecera** — título de la app y botón de modo oscuro
- **Aside** — menú lateral con filtros por categoría y contadores de tareas
- **Área principal** — buscador, formulario para añadir tareas y lista de tarjetas

Cada tarjeta de tarea muestra el texto, la categoría, el badge de prioridad y los botones de completar, editar y eliminar.

El diseño completo está en [`docs/design/wireframe.png`](./docs/design/wireframe.png).