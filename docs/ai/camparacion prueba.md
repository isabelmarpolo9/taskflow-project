# Comparativa de herramientas de IA

En este documento se comparan las diferentes herramientas de inteligencia artificial utilizadas durante el desarrollo del proyecto, como Claude, ChatGPT, Cursor u otras.

## Qué se documenta aquí

- Comparativa de respuestas entre diferentes IAs para el mismo problema
- Ventajas e inconvenientes de cada herramienta
- Casos en los que una IA fue más útil que otra
- Ejemplos concretos de prompts y sus resultados

---

# Comparativa entre asistentes de IA

Comparativa entre Claude y ChatGPT evaluando claridad, profundidad y calidad de código.

---

## 1. Explicación de conceptos técnicos

### Concepto: Closures

**Prompt utilizado:**

> Explícame qué es un closure en JavaScript con un ejemplo práctico y sencillo

---

#### Respuesta de Claude

Un closure es una función que "recuerda" las variables del entorno donde fue creada, incluso después de que ese entorno haya dejado de ejecutarse.

**La idea clave**

Cuando defines una función dentro de otra función, la función interna tiene acceso a las variables de la función externa. Ese acceso persiste aunque la función externa ya haya terminado.

**Ejemplo práctico: un contador**

```javascript
function crearContador() {
    let cuenta = 0;

    return function () {
        cuenta++;
        return cuenta;
    };
}

const contador = crearContador();

console.log(contador()); // 1
console.log(contador()); // 2
console.log(contador()); // 3
```

`crearContador()` ya terminó de ejecutarse, pero la variable `cuenta` sigue viva porque la función interna la está "sosteniendo". Eso es un closure.

**¿Por qué es útil?**

1. **Datos privados** — `cuenta` no es accesible desde fuera, solo a través de la función retornada.
2. **Cada instancia es independiente:**

```javascript
const contadorA = crearContador();
const contadorB = crearContador();

contadorA(); // 1
contadorA(); // 2
contadorB(); // 1  ← su propio "cuenta", separado
```

3. **Funciones con memoria**, como cachés, configuraciones o fábricas de funciones:

```javascript
function multiplicador(factor) {
    return (numero) => numero * factor;
}

const doble = multiplicador(2);
const triple = multiplicador(3);

doble(5);  // 10
triple(5); // 15
```

**En resumen**

| | |
|---|---|
| ¿Qué es? | Una función + las variables de su entorno de creación |
| ¿Cuándo ocurre? | Cuando una función interna accede a variables de una función externa |
| ¿Para qué sirve? | Encapsular estado, crear datos privados, funciones con memoria |

---

#### Respuesta de ChatGPT

Un closure en JavaScript es cuando una función recuerda las variables que estaban en su entorno aunque se ejecute fuera de él.

👉 Una función puede usar variables de la función donde fue creada, incluso después de que esa función haya terminado.

**Ejemplo sencillo**

```javascript
function contador() {
    let numero = 0;

    return function () {
        numero++;
        console.log(numero);
    };
}

const contar = contador();

contar(); // 1
contar(); // 2
contar(); // 3
```

**Explicado fácil**

Un closure es como una mochila de variables que una función lleva consigo. La función que se devuelve se lleva en la mochila la variable `numero` y puede seguir usándola.

**Ejemplo práctico real: contador de clics**

```javascript
function crearContadorClicks() {
    let clicks = 0;

    return function () {
        clicks++;
        return clicks;
    };
}

const contarClicks = crearContadorClicks();

console.log(contarClicks()); // 1
console.log(contarClicks()); // 2
console.log(contarClicks()); // 3
```

> ✅ **Idea clave:** Un closure es una función que puede acceder a las variables de su ámbito externo incluso después de que ese ámbito haya terminado de ejecutarse.

---

#### Conclusión

Aunque ambos han dado explicaciones muy parecidas, la de ChatGPT me ha parecido más fácil de entender por estar explicada de una forma más cercana, con un lenguaje quizás un poco más accesible. Los ejemplos que han dado son prácticamente los mismos aunque Claude luego ha dado alguno un poco más complejo. Me ha gustado un poco más el de ChatGPT por la cercanía de la explicación y el poner ejemplos con otros casos similares.

---

### Concepto: Event Loop

**Prompt utilizado:**

> Explícame qué es el Event Loop en JavaScript con un ejemplo práctico y sencillo

---

#### Respuesta de Claude

El Event Loop es el mecanismo que permite a JavaScript ejecutar código asíncrono a pesar de ser un lenguaje de un solo hilo. Es lo que hace que tu página no se congele mientras espera una respuesta del servidor.

**Ejemplo paso a paso**

```javascript
console.log("1 - Inicio");

setTimeout(() => {
    console.log("2 - setTimeout");
}, 0);

Promise.resolve().then(() => {
    console.log("3 - Promise");
});

console.log("4 - Fin");
```

**Resultado en consola:**

```
1 - Inicio
4 - Fin
3 - Promise
2 - setTimeout
```

**¿Por qué ese orden?**

| Paso | Qué pasa |
|------|----------|
| 1 | Ejecuta `console.log("1")` → stack |
| 2 | Registra el `setTimeout` → va a la Task Queue |
| 3 | Registra la `Promise` → va a la Microtask Queue |
| 4 | Ejecuta `console.log("4")` → stack |
| 5 | Stack vacío → Event Loop revisa **primero** microtareas → ejecuta Promise |
| 6 | Microtareas vacías → revisa Task Queue → ejecuta setTimeout |

**La regla de oro:** `Call Stack → Microtask Queue → Task Queue`

Las microtareas (Promises) siempre tienen prioridad sobre las tareas (setTimeout, setInterval).

---

#### Respuesta de ChatGPT

El Event Loop decide cuándo se ejecuta cada tarea. JavaScript solo puede ejecutar una cosa a la vez, pero gracias al Event Loop puede manejar tareas que tardan tiempo sin bloquear el programa.

**Ejemplo sencillo**

```javascript
console.log("Inicio");

setTimeout(() => {
    console.log("Hola");
}, 2000);

console.log("Fin");
```

Resultado real:

```
Inicio
Fin
Hola
```

Muchos esperarían ver `Hola` en segundo lugar, pero el `setTimeout` se delega al navegador y el código sigue ejecutándose. Solo cuando el stack está vacío y han pasado los 2 segundos, se ejecuta el callback.

> ✅ **Definición corta:** El Event Loop es el mecanismo de JavaScript que gestiona la ejecución de código asíncrono, moviendo funciones desde la cola de callbacks al call stack cuando este queda libre.

---

#### Conclusión

En este caso también me ha gustado más la explicación de ChatGPT ya que la veo más cercana, explicada de forma más simple. También pone ejemplos y luego los explica paso a paso.

---

### Concepto: DOM

**Prompt utilizado:**

> Explícame qué es el DOM en JavaScript con un ejemplo práctico y sencillo

---

#### Respuesta de Claude

El DOM (Document Object Model) es la representación en memoria del HTML de tu página. JavaScript lo usa para leer y modificar el contenido, la estructura y el estilo de forma dinámica.

Cuando el navegador carga tu HTML, lo convierte en un árbol de objetos llamado DOM. Cada etiqueta HTML se convierte en un nodo que puedes manipular con JavaScript.

**Seleccionar elementos**

```javascript
const titulo = document.getElementById("titulo");
const items = document.querySelectorAll(".item");
const boton = document.querySelector("button");
```

**Leer y modificar contenido**

```javascript
titulo.textContent = "Nuevo título";
titulo.innerHTML = "<em>Título</em> con cursiva";
titulo.style.color = "red";
titulo.classList.add("activo");
titulo.classList.toggle("resaltado");
```

**Ejemplo práctico: lista dinámica**

```html
<input id="input" placeholder="Escribe un item..." />
<button id="btn">Agregar</button>
<ul id="lista"></ul>
```

```javascript
const input = document.getElementById("input");
const boton = document.getElementById("btn");
const lista = document.getElementById("lista");

boton.addEventListener("click", () => {
    if (!input.value.trim()) return;
    const nuevoItem = document.createElement("li");
    nuevoItem.textContent = input.value;
    lista.appendChild(nuevoItem);
    input.value = "";
});
```

**Operaciones más comunes**

| Operación | Métodos |
|-----------|---------|
| Seleccionar | `querySelector`, `getElementById` |
| Crear | `createElement` |
| Insertar | `appendChild`, `prepend`, `insertBefore` |
| Eliminar | `element.remove()` |
| Escuchar eventos | `addEventListener` |
| Leer/escribir texto | `textContent`, `innerHTML` |
| Cambiar clases | `classList.add/remove/toggle` |
| Cambiar estilos | `element.style.propiedad` |

---

#### Respuesta de ChatGPT

El DOM permite que JavaScript lea y cambie el contenido de una página web escrita en HTML.

**Ejemplo práctico sencillo**

```html
<h1 id="titulo">Hola</h1>
<button onclick="cambiarTexto()">Cambiar</button>
```

```javascript
function cambiarTexto() {
    document.getElementById("titulo").textContent = "Hola JavaScript";
}
```

Cuando pulsas el botón, JavaScript busca el elemento con id `titulo` en el DOM y cambia su contenido.

> ✅ **Definición corta:** El DOM es una representación del documento HTML como una estructura de objetos que permite a JavaScript acceder y modificar los elementos de una página web.

---

#### Conclusión

En este caso Claude me ha dado más ejemplos y me ha explicado más claro. ChatGPT noto que se ha quedado un poco escaso.

---

## 2. Detección de errores en código

### Función 1

**Prompt utilizado:**

> Encuentra y explica el error en esta función JavaScript:
> ```javascript
> function sumar(a, b) {
>   return a - b
> }
> ```

---

#### Respuesta de Claude

El error es simple: la función se llama `sumar` pero usa el operador `-` en lugar de `+`.

```javascript
// ❌ Incorrecto
function sumar(a, b) {
    return a - b; // Resta en vez de sumar
}

// ✅ Correcto
function sumar(a, b) {
    return a + b;
}
```

`sumar(3, 2)` con el código original devuelve `1` en lugar de `5`. Un error de lógica clásico: el código es sintácticamente válido pero produce resultados incorrectos.

---

#### Respuesta de ChatGPT

El código no tiene errores de sintaxis, pero la operación que realiza no es la esperada.

```javascript
// ❌ Incorrecto
function sumar(a, b) {
    return a - b; // usa resta → sumar(3, 2) = 1
}

// ✅ Correcto
function sumar(a, b) {
    return a + b; // sumar(3, 2) = 5
}
```

**Tipo de error:** error de lógica — la sintaxis es válida, el programa se ejecuta, pero el resultado es incorrecto.

---

#### Conclusión

En este caso me gusta más la explicación de Claude porque, aunque las dos están bien explicadas, ChatGPT ha dado más vueltas para explicarlo. Claude ha sido más breve y la explicación se ha entendido a la primera igual de bien.

---

### Función 2

**Prompt utilizado:**

> Encuentra y explica el error en esta función JavaScript:
> ```javascript
> function saludar(nombre) {
>   console.log("Hola " + Nombre)
> }
> ```

---

#### Respuesta de Claude

El error está en que `Nombre` con mayúscula no existe — la variable se llama `nombre` en minúscula.

```javascript
// ❌ Incorrecto
function saludar(nombre) {
    console.log("Hola " + Nombre); // ReferenceError: Nombre is not defined
}

// ✅ Correcto
function saludar(nombre) {
    console.log("Hola " + nombre);
}
```

JavaScript es **case-sensitive**: `nombre` y `Nombre` son variables distintas. Como `Nombre` nunca fue declarada, el programa lanza un `ReferenceError` en tiempo de ejecución.

---

#### Respuesta de ChatGPT

La función recibe un parámetro llamado `nombre` pero dentro de `console.log` se utiliza `Nombre`. En JavaScript las mayúsculas y minúsculas distinguen variables, por lo que `nombre ≠ Nombre`. JavaScript intentará usar `Nombre`, pero esa variable nunca fue declarada y aparecerá:

```
ReferenceError: Nombre is not defined
```

```javascript
// ✅ Correcto
function saludar(nombre) {
    console.log("Hola " + nombre);
}

saludar("Ana"); // Hola Ana
```

---

#### Conclusión

Me vuelve a gustar más el resultado de Claude. Aunque los dos están bien explicados, ChatGPT da más vueltas y Claude lo explica de forma mucho más concisa y brevemente, entendiéndose igual de bien.

---

### Función 3

**Prompt utilizado:**

> Encuentra y explica el error en esta función JavaScript:
> ```javascript
> function multiplicar(numeros) {
>   let resultado = 0
>   for (let i = 0; i <= numeros.length; i++) {
>     resultado *= numeros[i]
>   }
>   return resultado
> }
> ```

---

#### Respuesta de Claude

Hay **dos errores** en esta función:

**Error 1 — Valor inicial incorrecto**

```javascript
let resultado = 0 // ❌ Multiplicar por 0 siempre da 0
let resultado = 1 // ✅ El neutro de la multiplicación es 1
```

**Error 2 — Condición del bucle fuera de rango**

```javascript
for (let i = 0; i <= numeros.length; i++) // ❌ Accede a numeros[length] → undefined
for (let i = 0; i < numeros.length; i++)  // ✅ El último índice válido es length - 1
```

En la última iteración, `numeros[numeros.length]` es `undefined`, y cualquier número multiplicado por `undefined` da `NaN`.

**Función corregida**

```javascript
function multiplicar(numeros) {
    let resultado = 1;
    for (let i = 0; i < numeros.length; i++) {
        resultado *= numeros[i];
    }
    return resultado;
}

multiplicar([2, 3, 4]); // 24 ✅
```

---

#### Respuesta de ChatGPT

La función tiene dos errores de lógica:

**1️⃣ Valor inicial incorrecto** — `resultado = 0` hace que cualquier multiplicación dé siempre 0.

**2️⃣ Condición del bucle incorrecta** — `i <= numeros.length` intenta acceder a un índice que no existe, devolviendo `undefined`.

```javascript
// ✅ Correcto
function multiplicar(numeros) {
    let resultado = 1
    for (let i = 0; i < numeros.length; i++) {
        resultado *= numeros[i]
    }
    return resultado
}

multiplicar([2, 3, 4]) // 24
```

---

#### Conclusión

Aunque las dos respuestas están igual de bien, Claude es más breve y conciso explicando por qué está mal, con la misma claridad.

---

## 3. Generación de código desde descripción

### Función: Filtrar números pares

**Prompt utilizado:**

> Escribe una función que reciba un array de números y devuelva solo los números pares

---

#### Respuesta de Claude

```javascript
function filtrarPares(numeros) {
    return numeros.filter(n => n % 2 === 0);
}

filtrarPares([1, 2, 3, 4, 5, 6]); // [2, 4, 6]
filtrarPares([11, 23, 8, 14, 7]); // [8, 14]
filtrarPares([1, 3, 5]);          // []
```

`filter` recorre el array y conserva solo los elementos donde la función devuelve `true`. El operador `%` (módulo) devuelve el resto de la división — si es 0, el número es par.

---

#### Respuesta de ChatGPT

```javascript
function obtenerPares(numeros) {
    let pares = []
    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] % 2 === 0) {
            pares.push(numeros[i])
        }
    }
    return pares
}

// Versión más corta
function obtenerPares(numeros) {
    return numeros.filter(n => n % 2 === 0)
}
```

---

#### Conclusión

Claude ha generado la función directamente y sin rodeos. ChatGPT ha explicado el porqué de cada paso y ha dado además una segunda versión más moderna. Depende del objetivo: si estás aprendiendo, ChatGPT es más útil; si solo necesitas la función, Claude va más al grano.

---

### Función: Invertir palabras

**Prompt utilizado:**

> Escribe una función JavaScript que reciba un string y devuelva las palabras en orden inverso

---

#### Respuesta de Claude

```javascript
function invertirPalabras(str) {
    return str.split(" ").reverse().join(" ");
}

invertirPalabras("Hola mundo cruel");    // "cruel mundo Hola"
invertirPalabras("JavaScript es genial"); // "genial es JavaScript"
```

Son tres pasos encadenados:

| Paso | Método | Resultado |
|------|--------|-----------|
| 1 | `split(" ")` | Convierte el string en array de palabras |
| 2 | `reverse()` | Invierte el orden del array |
| 3 | `join(" ")` | Une el array de vuelta en un string |

---

#### Respuesta de ChatGPT

```javascript
function invertirPalabras(texto) {
    return texto.split(" ").reverse().join(" ");
}

invertirPalabras("Hola mundo desde JavaScript");
// "JavaScript desde mundo Hola"
```

---

#### Conclusión

Los dos han creado la misma función. ChatGPT siempre da una explicación detallada de cada paso; Claude siempre va más al grano.

---

### Función: Filtrar tareas por prioridad

**Prompt utilizado:**

> Escribe una función JavaScript que reciba un array de tareas y devuelva solo las de prioridad alta, donde cada tarea es un objeto con las propiedades texto y prioridad

---

#### Respuesta de Claude

```javascript
function filtrarPrioridadAlta(tareas) {
    return tareas.filter(tarea => tarea.prioridad === "alta");
}

const tareas = [
    { texto: "Comprar leche",         prioridad: "baja"  },
    { texto: "Entregar informe",      prioridad: "alta"  },
    { texto: "Llamar al médico",      prioridad: "alta"  },
    { texto: "Ver Netflix",           prioridad: "baja"  },
    { texto: "Pagar facturas",        prioridad: "media" },
    { texto: "Preparar presentación", prioridad: "alta"  },
];

filtrarPrioridadAlta(tareas);
// [
//   { texto: "Entregar informe",      prioridad: "alta" },
//   { texto: "Llamar al médico",      prioridad: "alta" },
//   { texto: "Preparar presentación", prioridad: "alta" },
// ]
```

Claude además ofreció una versión más flexible:

```javascript
function filtrarPorPrioridad(tareas, prioridad) {
    return tareas.filter(tarea => tarea.prioridad === prioridad);
}
```

---

#### Respuesta de ChatGPT

```javascript
function tareasAltaPrioridad(tareas) {
    return tareas.filter(tarea => tarea.prioridad === "alta");
}
```

---

#### Conclusión

Ambas han dado una función y una explicación muy parecidas. Claude además ofreció una versión más genérica que filtra por cualquier prioridad.

---

## Conclusión general

| Criterio | Claude | ChatGPT |
|----------|--------|---------|
| Claridad de explicaciones | Alta | Alta |
| Profundidad técnica | Alta | Media |
| Calidad del código generado | Alta | Media |
| Detección de errores | Alta | Alta |
| Mejor para principiantes | Media | Alta |

**Conclusión final:**

Claude resultó más útil para explicar conceptos con ejemplos claros y detectar errores con detalle. ChatGPT generó código funcional pero con menos explicaciones. Para aprender, prefiero Claude.
