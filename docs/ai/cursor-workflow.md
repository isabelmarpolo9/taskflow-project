# Flujo de trabajo con Cursor

En este documento se describe cómo se ha utilizado Cursor como editor de código asistido por IA durante el desarrollo del proyecto TaskFlow.

---

## Qué se documenta aquí

- Cómo se ha integrado Cursor en el flujo de trabajo diario
- Funcionalidades de Cursor más utilizadas
- Comparativa entre escribir código manualmente y con asistencia de Cursor
- Trucos y atajos descubiertos durante el uso

---

## Interfaz de Cursor

Cursor es un editor basado en VS Code con IA integrada. Sus elementos principales son:

- **Explorador de archivos** — panel izquierdo, igual que VS Code
- **Terminal integrada** — panel inferior para ejecutar comandos
- **Chat con IA** — panel lateral para hacer preguntas sobre el código
- **Edición inline** — permite pedir cambios directamente sobre el código seleccionado
- **Composer/Agent** — genera cambios que afectan a varios archivos a la vez

---

## Atajos de teclado más usados

| Atajo | Acción |
|-------|--------|
| `Ctrl + Shift + E` | Mostrar/ocultar explorador de archivos |
| `Ctrl + J` | Mostrar/ocultar terminal integrada |
| `Ctrl + L` | Abrir chat con la IA |
| `Ctrl + Shift + L` | Nuevo agente |
| `Ctrl + K` | Edición inline (selecciona código y pide un cambio) |
| `Ctrl + I` | Abrir Composer (cambios en varios archivos) |
| `Ctrl + P` | Buscar archivo por nombre |
| `Ctrl + Shift + P` | Paleta de comandos |
| `Ctrl + Z` | Deshacer cambio |
| `Ctrl + Shift + B` | Abrir navegador integrado |
| `Ctrl + Alt + E` | Maximizar chat |

---

## Ejemplo 1: Revisión y mejora de app.js

### Prompt utilizado

> ¿Se puede mejorar algo de mi app.js?

### Qué detectó Cursor

Cursor revisó `app.js` analizando estructura, validaciones, rendimiento, accesibilidad y posibles bugs. Encontró los siguientes problemas:

**Bug crítico — el buscador no funcionaba**

`renderizarTareas()` no creaba elementos con las clases `.tarea` ni `.tarea-titulo`, por lo que el buscador no encontraba nada al intentar filtrar por texto.

**Otros problemas detectados**

- Uso de `innerHTML` con texto introducido por el usuario (riesgo de seguridad XSS)
- Uso de `onclick` inline en el HTML generado dinámicamente
- El filtro de categoría y el buscador funcionaban de forma independiente en lugar de combinarse

### Cambios aplicados

```javascript
// Antes — filtro y búsqueda por separado
const tareasFiltradas = filtroActivo === 'todas'
    ? tareas
    : tareas.filter(t => t.categoria === filtroActivo)

// Después — filtro y búsqueda combinados
let filtroActivo = 'todas'
let busquedaActiva = ''
```

- Se añadió la variable `busquedaActiva` para que el filtro de categoría y la búsqueda trabajen juntos en el mismo `renderizarTareas()`
- Se sustituyó `innerHTML` por `textContent` donde el contenido venía del usuario
- Se eliminaron los `onclick` inline y se sustituyeron por `addEventListener`
- Se añadieron las clases `.tarea` y `.tarea-titulo` a los elementos generados para que el buscador pudiera encontrarlos

### Resultado

El buscador quedó alineado con el render y funcionando correctamente. No se detectaron errores de lint tras los cambios.

---

## Ejemplo 2: Commit y push desde la terminal de Cursor

### Prompt utilizado

> Vale, ahora quiero guardarlo en GitHub para ver si ha cambiado algo en Vercel

### Qué hizo Cursor

Cursor preparó el commit revisando el estado de los cambios, creó un mensaje descriptivo y ejecutó el push a GitHub.

**Problema que encontró:** en PowerShell no funcionan `&&` ni el heredoc `<<EOF` como en bash, por lo que el primer intento falló. Cursor detectó el error y ajustó los comandos para ser compatibles con PowerShell, ejecutándolos por separado.

**Commit creado:** `b3dc736` con el mensaje `"Fix task render/search and improve safety"`

**Rama donde se subió:** `docs/ai-documentation`

### Aprendizaje

Cursor no solo genera código sino que también puede gestionar el flujo de trabajo con Git. Sin embargo, es importante revisar en qué rama está activo el proyecto antes de hacer push, ya que Vercel solo despliega automáticamente desde la rama configurada como producción (`main` o `master`).

---
---

## Ejemplo 3: Refactorización completa de TaskFlow

### Prompt utilizado

> Revisa todo el código de TaskFlow y detecta partes mejorables. Usa IA para refactorizar al menos cinco funciones, mejora nombres de variables, añade validaciones al formulario, simplifica funciones repetitivas y añade comentarios JSDoc.

### Qué detectó Cursor

Cursor analizó todos los archivos del proyecto (index.html, app.js, tailwind.config.js, input.css) y detectó los siguientes problemas:

- `app.js` mezclaba UI, storage, lógica de negocio y tema en un solo archivo
- Uso de `innerHTML` con texto introducido por el usuario (riesgo XSS)
- Parsing de localStorage sin control de errores
- Faltaban validaciones en el formulario (longitud, duplicados, valores inválidos)
- Las clases del badge de prioridad estaban repetidas en varios sitios
- Los event listeners estaban dispersos sin estructura clara

### Cambios aplicados

**Nueva estructura de archivos — separación en módulos ES:**
```
src/
├── storage.js  → readJson(), writeJson()
├── tasks.js    → loadTasks(), saveTasks(), validateTaskText(), filterTasks(), createTask(), removeTask()
├── theme.js    → getInitialTheme(), applyTheme(), toggleTheme()
├── ui.js       → renderTaskList(), showError(), clearError(), priorityBadgeClass()
└── app.js      → orquestación (eventos, estado, render)
```

**Validaciones añadidas al formulario:**

- Texto: trim + normalización de espacios, entre 1 y 120 caracteres
- Categoría y prioridad: lista blanca de valores válidos (`trabajo|estudio|personal` y `alta|media|baja`)
- Detección de tareas duplicadas
- Feedback visual: mensaje en `#form-error` y botón "Añadir" deshabilitado cuando el formulario no es válido

**JSDoc añadido** en todos los módulos con tipos personalizados (`Task`, `Priority`, `Category`).

**tailwind.config.js** actualizado para incluir `./src/**/*.js` en el escaneo de clases.

### Commits realizados

| Hash | Mensaje |
|------|---------|
| `e5cf99b` | Refactor app into modules and add validation |
| `18e438b` | Rebuild Tailwind output |

### Aprendizaje

Cursor no solo corrige bugs puntuales sino que puede proponer una arquitectura mejor para todo el proyecto. En este caso dividió un archivo monolítico en módulos con responsabilidades claras, lo que hace el código más fácil de mantener y entender. Es importante revisar manualmente cada cambio antes de aceptarlo para asegurarse de que no rompe nada.

---

## Conexión con servidor MCP

### ¿Qué es MCP?

El **Model Context Protocol** es un protocolo creado por Anthropic que permite a los asistentes de IA conectarse con herramientas externas como el sistema de archivos, GitHub, bases de datos, etc. En lugar de solo responder preguntas, la IA puede ejecutar acciones reales sobre el proyecto.

### Instalación del servidor filesystem en Cursor

**Paso 1** — Abre Cursor y ve a **Settings → Tools & MCP**

**Paso 2** — Haz clic en **Add new MCP server**

**Paso 3** — Añade esta configuración:
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Users\\Alex\\OneDrive\\Escritorio\\Taskflow"
      ]
    }
  }
}
```

**Paso 4** — Guarda y reinicia Cursor

---

### Cinco consultas realizadas con MCP

**Consulta 1: Listar archivos del proyecto**
> Lista todos los archivos del proyecto

Cursor listó todos los archivos organizados por grupos. Detectó más de 1300 archivos en total incluyendo `node_modules`, y los agrupó correctamente separando las dependencias del código propio del proyecto.

---

**Consulta 2: Leer el contenido de app.js**
> Lee el contenido de app.js

Cursor leyó directamente el archivo `src/app.js` y mostró su contenido completo, incluyendo los imports de los módulos, los tipos JSDoc, las funciones `readAndValidateForm()`, `render()`, `updateFormState()` y `onAddTask()`, y todos los event listeners.

---

**Consulta 3: Contar líneas de index.html**
> ¿Cuántas líneas tiene index.html?

Cursor respondió que `index.html` tiene **118 líneas**.

---

**Consulta 4: Ver archivos de documentación**
> ¿Qué archivos hay dentro de la carpeta docs/ai?

Cursor listó correctamente los cinco archivos de documentación:
- `experiments.md`
- `reflection.md`
- `ai-comparison.md`
- `cursor-workflow.md`
- `prompt-engineering.md`

---

**Consulta 5: Ver funciones exportadas**
> ¿Qué funciones exporta src/tasks.js?

Cursor listó las nueve funciones exportadas por el módulo:
`loadTasks`, `saveTasks`, `isPriority`, `isCategory`, `validateTaskText`, `filterTasks`, `hasDuplicateTask`, `createTask`, `removeTask`

---

### ¿En qué casos es útil MCP en proyectos reales?

- **Navegar proyectos grandes** sin tener que abrir cada archivo manualmente
- **Auditar código** preguntando directamente qué exporta cada módulo o cuántas líneas tiene cada archivo
- **Buscar dependencias** entre archivos sin leer el código entero
- **Automatizar tareas repetitivas** como renombrar archivos, mover carpetas o crear estructuras de directorios
- **Integración con GitHub** para consultar issues, pull requests o el historial de commits directamente desde el chat

## Conclusión

Cursor ha resultado útil especialmente para detectar bugs que no eran evidentes a simple vista, como el problema del buscador que no encontraba elementos porque las clases del DOM no coincidían. La edición inline y el chat contextual permiten iterar sobre el código de forma rápida sin salir del editor.