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

## Conclusión

Cursor ha resultado útil especialmente para detectar bugs que no eran evidentes a simple vista, como el problema del buscador que no encontraba elementos porque las clases del DOM no coincidían. La edición inline y el chat contextual permiten iterar sobre el código de forma rápida sin salir del editor.