# Prompt Engineering

En este documento se recogen los aprendizajes sobre cómo formular buenos prompts para obtener mejores resultados de las herramientas de IA.

## Qué se documenta aquí

- Técnicas para escribir prompts más efectivos
- Ejemplos de prompts que funcionaron bien y por qué
- Ejemplos de prompts que no funcionaron y cómo se mejoraron
- Patrones reutilizables para diferentes tipos de tareas

---

## Técnicas utilizadas

### 1. Prompts con rol (Role Prompting)
Definir un rol para la IA hace que adapte el nivel técnico, el tono y el enfoque de la respuesta. Cuanto más específico es el rol, más útil es la respuesta.

### 2. Few-shot Prompting
Dar ejemplos de entrada y salida antes de la pregunta real guía a la IA hacia el formato exacto que necesitas, sin tener que describirlo con palabras.

### 3. Razonamiento paso a paso (Chain of Thought)
Pedir que razone antes de responder produce respuestas más precisas y detecta errores que un análisis superficial pasaría por alto.

### 4. Restricciones claras
Limitar el formato, la longitud o el tipo de respuesta evita que la IA añada información innecesaria y hace las respuestas más directas y reutilizables.

---

## Los 10 prompts

---

### Prompt 1 — Rol: desarrollador senior

**Técnica:** Role prompting

**Prompt:**
```
Actúa como un desarrollador senior de JavaScript. Revisa esta función y dime 
qué mejorarías y por qué:

function añadirTarea() {
  const texto = document.getElementById('input-tarea').value
  const categoria = document.getElementById('select-categoria').value
  const prioridad = document.getElementById('select-prioridad').value
  if (texto === '') return
  tareas.push({ id: Date.now(), texto, categoria, prioridad })
  document.getElementById('input-tarea').value = ''
  guardarEnStorage()
  renderizarTareas()
}
```

**Respuesta obtenida:**

La IA identificó seis mejoras concretas: cachear referencias al DOM fuera de la función, validar el texto con `trim()` para evitar tareas con solo espacios, usar nombres consistentes con el modelo de datos (`text`, `category`, `priority`), separar la lógica de UI y dominio en funciones independientes, controlar duplicados y dar feedback al usuario, y mantener el uso de `const`/`let` en lugar de `var`.

**Por qué funciona bien:**

Definir el rol de "desarrollador senior" hace que la IA no se limite a corregir errores sintácticos sino que evalúe arquitectura, buenas prácticas y experiencia de usuario, igual que haría una revisión de código profesional.

---

### Prompt 2 — Rol: experto en seguridad

**Técnica:** Role prompting

**Prompt:**
```
Actúa como un experto en seguridad web. Analiza este código JavaScript 
y detecta posibles vulnerabilidades:

function renderizarTareas() {
  contenedorTareas.innerHTML = ''
  tareasFiltradas.forEach(tarea => {
    const div = document.createElement('div')
    div.innerHTML = `
      <span class="tarea-titulo">${tarea.texto}</span>
      <span class="badge badge-${tarea.prioridad}">${tarea.prioridad}</span>
      <button onclick="eliminarTarea(${tarea.id})">✕</button>
    `
    contenedorTareas.appendChild(div)
  })
}
```

**Respuesta obtenida:**

La IA detectó cuatro vulnerabilidades: XSS por usar `innerHTML` con datos del usuario, inyección en atributos al interpolar `tarea.prioridad` en `class` sin validar, riesgo de ejecución de JS arbitrario en el `onclick` inline si `tarea.id` está manipulado, y falta de validación de los datos antes de renderizar. Para cada una propuso una solución concreta usando `textContent` y `addEventListener`.

**Por qué funciona bien:**

El rol de "experto en seguridad" orienta el análisis hacia vectores de ataque específicos que un desarrollador genérico podría pasar por alto, como la inyección en atributos o el riesgo de los handlers inline.

---

### Prompt 3 — Few-shot: formato JSDoc

**Técnica:** Few-shot prompting

**Prompt:**
```
Quiero que añadas comentarios JSDoc a funciones JavaScript siguiendo este formato:

Ejemplo entrada:
function sumar(a, b) { return a + b }

Ejemplo salida:
/**
 * Suma dos números.
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {number} La suma de a y b
 */
function sumar(a, b) { return a + b }

Ahora aplica el mismo formato a esta función:
function filtrarTareas(tareas, categoria) {
  if (categoria === 'todas') return tareas
  return tareas.filter(t => t.categoria === categoria)
}
```

**Respuesta obtenida:**

```javascript
/**
 * Filtra una lista de tareas por categoría.
 * @param {Array} tareas - Lista completa de tareas
 * @param {string} categoria - Categoría a filtrar ('todas' u otra categoría específica)
 * @returns {Array} Lista de tareas filtradas según la categoría
 */
function filtrarTareas(tareas, categoria) {
  if (categoria === 'todas') return tareas
  return tareas.filter(t => t.categoria === categoria)
}
```

**Por qué funciona bien:**

Dar un ejemplo concreto de entrada y salida elimina ambigüedad sobre el formato deseado. La IA reproduce exactamente la estructura del ejemplo sin necesidad de describirla con palabras.

---

### Prompt 4 — Few-shot: nombres de variables

**Técnica:** Few-shot prompting

**Prompt:**
```
Mejora los nombres de variables siguiendo este criterio:

Malo: let x = [] → Bueno: let tareasFiltradas = []
Malo: function fn(d) → Bueno: function eliminarTarea(id)

Aplica el mismo criterio a este código:
function proc(arr, q) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    let t = arr[i]
    if (t.texto.toLowerCase().includes(q.toLowerCase())) {
      res.push(t)
    }
  }
  return res
}
```

**Respuesta obtenida:**

```javascript
function filtrarTareasPorTexto(tareas, consulta) {
  const tareasFiltradas = []
  const consultaNormalizada = consulta.toLowerCase()
  for (let indice = 0; indice < tareas.length; indice++) {
    const tarea = tareas[indice]
    if (tarea.texto.toLowerCase().includes(consultaNormalizada)) {
      tareasFiltradas.push(tarea)
    }
  }
  return tareasFiltradas
}
```

**Por qué funciona bien:**

Los ejemplos de "malo → bueno" establecen un criterio claro que la IA aplica de forma consistente a todo el código, incluyendo el nombre de la función y la variable de la consulta normalizada.

---

### Prompt 5 — Paso a paso: explicar un bug

**Técnica:** Chain of thought

**Prompt:**
```
Explícame paso a paso por qué este código no funciona como se espera. 
Razona cada línea antes de dar la solución:

function multiplicar(numeros) {
  let resultado = 0
  for (let i = 0; i <= numeros.length; i++) {
    resultado *= numeros[i]
  }
  return resultado
}
```

**Respuesta obtenida:**

La IA analizó cada línea por separado. Detectó dos errores: `resultado = 0` hace que cualquier multiplicación dé siempre 0 (el neutro de la multiplicación es 1), y `i <= numeros.length` accede a un índice fuera del array devolviendo `undefined`, lo que produce `NaN`. Mostró la versión corregida con `resultado = 1` e `i < numeros.length`.

**Por qué funciona bien:**

Pedir razonamiento línea a línea obliga a la IA a no saltar directamente a la solución y detecta errores sutiles que un análisis superficial pasaría por alto. Es especialmente útil para bugs que no dan error de sintaxis.

---

### Prompt 6 — Paso a paso: refactorizar

**Técnica:** Chain of thought

**Prompt:**
```
Refactoriza esta función paso a paso. Primero explica qué hace actualmente, 
luego identifica los problemas y finalmente muestra la versión mejorada:

function guardarYMostrar(texto, categoria, prioridad) {
  let t = { id: Date.now(), texto: texto, categoria: categoria, prioridad: prioridad }
  let arr = JSON.parse(localStorage.getItem('tareas'))
  if (arr == null) arr = []
  arr.push(t)
  localStorage.setItem('tareas', JSON.stringify(arr))
  let contenedor = document.getElementById('contenedor-tareas')
  contenedor.innerHTML = ''
  arr.forEach(function(tarea) {
    let div = document.createElement('div')
    div.innerHTML = tarea.texto
    contenedor.appendChild(div)
  })
}
```

**Respuesta obtenida:**

La IA identificó seis problemas: responsabilidad múltiple en una sola función, acoplamiento directo con localStorage, nombres genéricos (`t`, `arr`), uso de `innerHTML` con contenido del usuario (XSS), re-renderizado completo poco eficiente y falta de validación de entrada. La versión mejorada separó la función en cuatro responsabilidades: `crearTarea`, `cargarTareas`, `guardarTareas` y `renderizarTareas`.

**Por qué funciona bien:**

Estructurar el prompt en tres fases (qué hace, qué falla, cómo mejorarlo) produce un análisis completo y ordenado que es más útil que pedir directamente "mejora esto".

---

### Prompt 7 — Restricción: respuesta corta

**Técnica:** Restricciones claras

**Prompt:**
```
Explica qué es un closure en JavaScript. Responde en máximo 3 líneas, sin ejemplos de código.
```

**Respuesta obtenida:**

> Un closure es una función que "recuerda" el entorno léxico en el que fue creada, incluso después de que ese entorno haya dejado de ejecutarse. Esto significa que la función interna mantiene acceso a las variables de la función externa que la contiene. Es un mecanismo fundamental en JavaScript que permite la encapsulación de datos y la creación de funciones con estado persistente.

**Por qué funciona bien:**

Limitar la longitud y prohibir ejemplos de código fuerza una definición concisa y precisa, útil para entender el concepto sin distracciones. Ideal para fichas de estudio o documentación rápida.

---

### Prompt 8 — Restricción: solo código

**Técnica:** Restricciones claras

**Prompt:**
```
Escribe una función JavaScript que filtre un array de objetos por la propiedad "prioridad". 
Responde únicamente con el código, sin explicaciones ni comentarios.
```

**Respuesta obtenida:**

```javascript
function filtrarPorPrioridad(array, prioridad) {
  return array.filter(objeto => objeto.prioridad === prioridad);
}
```

**Por qué funciona bien:**

Cuando solo necesitas el código para usarlo directamente, eliminar las explicaciones hace la respuesta más limpia y lista para copiar y pegar. Útil cuando ya entiendes el concepto y solo necesitas la implementación.

---

### Prompt 9 — Restricción: formato tabla

**Técnica:** Restricciones claras

**Prompt:**
```
Lista las cinco mejores prácticas para escribir JavaScript limpio. 
Responde en formato de tabla con dos columnas: "Práctica" y "Por qué importa".
```

**Respuesta obtenida:**

| Práctica | Por qué importa |
|----------|-----------------|
| Usar nombres descriptivos para variables y funciones | Hace el código autoexplicativo y reduce la necesidad de comentarios |
| Preferir `const` y `let` sobre `var` | Evita problemas de hoisting y limita el scope, reduciendo bugs inesperados |
| Mantener funciones pequeñas y con una sola responsabilidad | Facilita el testing, la reutilización y la lectura del código |
| Evitar efectos secundarios en las funciones | Hace el comportamiento predecible y el código más fácil de depurar |
| Manejar errores explícitamente con `try/catch` | Previene fallos silenciosos y mejora la robustez de la aplicación |

**Por qué funciona bien:**

Especificar el formato de salida hace que la respuesta sea directamente reutilizable en documentación o presentaciones sin necesidad de reformatearla.

---

### Prompt 10 — Combinado: rol + restricciones + paso a paso

**Técnica:** Combinación de técnicas

**Prompt:**
```
Actúa como un profesor de programación explicando a un estudiante de primero. 
Explica qué es el Event Loop en JavaScript siguiendo estos pasos: 
1) analogía con la vida real, 
2) explicación técnica simple, 
3) ejemplo de código de 5 líneas máximo.
```

**Respuesta obtenida:**

La IA usó la analogía del cajero de una pizzería: no se queda paralizado esperando que se hornee la pizza, sino que atiende al siguiente cliente y vuelve cuando está lista. Luego explicó que el Event Loop vigila la Call Stack y la Cola de tareas, moviendo tareas cuando el stack está vacío. El ejemplo de código mostró `setTimeout` con dos `console.log` y el orden de ejecución comentado.

**Por qué funciona bien:**

Combinar rol (profesor de primero), estructura (tres pasos ordenados) y restricción (máximo 5 líneas de código) produce una explicación pedagógica y bien estructurada que es difícil de conseguir con un prompt genérico.

---

## Conclusiones

- **El rol es lo que más cambia la calidad** — un desarrollador senior y un experto en seguridad analizan el mismo código de formas completamente distintas.
- **Few-shot elimina ambigüedad** — cuando el formato importa, un ejemplo vale más que cien palabras de descripción.
- **Las restricciones ahorran tiempo** — pedir solo código o máximo 3 líneas elimina el ruido y hace la respuesta directamente usable.
- **El razonamiento paso a paso detecta más bugs** — forzar a la IA a razonar línea a línea produce análisis más profundos que pedir directamente la solución.
- **Combinar técnicas da los mejores resultados** — el prompt 10 combinó rol, estructura y restricción y produjo la explicación más completa y pedagógica de todas.