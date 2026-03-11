# Comparativa de herramientas de IA

En este documento se comparan las diferentes herramientas de inteligencia artificial utilizadas durante el desarrollo del proyecto, como Claude, ChatGPT, Cursor u otras.

## Qué se documenta aquí

- Comparativa de respuestas entre diferentes IAs para el mismo problema
- Ventajas e inconvenientes de cada herramienta
- Casos en los que una IA fue más útil que otra
- Ejemplos concretos de prompts y sus resultados

# Comparativa entre asistentes de IA

Comparativa entre Claude y ChatGPT evaluando claridad, profundidad y calidad de código.

---

## 1. Explicación de conceptos técnicos

### Concepto: Closures

**Prompt utilizado:**

> Explícame qué es un closure en JavaScript con un ejemplo práctico y sencillo

**Respuesta de Claude:**
Un closure es una función que "recuerda" las variables del entorno donde fue creada, incluso después de que ese entorno haya dejado de ejecutarse.

La idea clave
Cuando defines una función dentro de otra función, la función interna tiene acceso a las variables de la función externa. Ese acceso persiste aunque la función externa ya haya terminado.

Ejemplo práctico: un contador
javascriptfunction crearContador() {
let cuenta = 0; // Variable en el ámbito externo

    return function () {
        cuenta++;
        return cuenta;
    };
    }

    const contador = crearContador();

    console.log(contador()); // 1
    console.log(contador()); // 2
    console.log(contador()); // 3

Lo interesante aquí: crearContador() ya terminó de ejecutarse, pero la variable cuenta sigue viva porque la función interna la está "sosteniendo". Eso es un closure.

¿Por qué es útil? 1. Datos privados — cuenta no es accesible desde fuera, solo a través de la función retornada. 2. Cada instancia es independiente:
javascriptconst contadorA = crearContador();
const contadorB = crearContador();

        contadorA(); // 1
        contadorA(); // 2
        contadorB(); // 1  ← su propio "cuenta", separado

3.  Funciones con memoria, como cachés, configuraciones o fábricas de funciones:
    javascriptfunction multiplicador(factor) {
    return (numero) => numero \* factor;
    }

        const doble = multiplicador(2);
        const triple = multiplicador(3);

        doble(5);  // 10
        triple(5); // 15

En resumen

- ¿Qué es? Una función + las variables de su entorno de creación
- ¿Cuándo ocurre? Cuando una función interna accede a variables de una función externa
- ¿Para qué sirve?Encapsular estado, crear datos privados, funciones con memoria

El closure no es una sintaxis especial, es simplemente una consecuencia natural de cómo JavaScript maneja el alcance de las variables. Cada vez que devuelves una función que usa variables externas, estás creando uno.

**Respuesta de ChatGPT:**
Un closure (cierre) en JavaScript es cuando una función recuerda las variables que estaban en su entorno aunque se ejecute fuera de él.

Es decir:
👉 Una función puede usar variables de la función donde fue creada, incluso después de que esa función haya terminado.

Ejemplo sencillo
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

Qué está pasando

    Se ejecuta contador().

    Dentro se crea la variable numero.

    contador() devuelve otra función.

    Esa función recuerda la variable numero, aunque contador() ya haya terminado.

    Por eso cada vez que llamamos a contar():

    la variable no se reinicia

    sigue guardada en memoria.

Explicado fácil

    Un closure es como una mochila de variables que una función lleva consigo.

    La función que se devuelve se lleva en la mochila la variable numero y puede seguir usándola.

Ejemplo práctico real (muy típico)

Contador de clics en una web:

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

Esto sirve para:

    contadores

    datos privados

    funciones que recuerdan estado

    callbacks

✅ Idea clave para examen o entrevistas:

    Un closure es una función que puede acceder a las variables de su ámbito externo incluso después de que ese ámbito haya terminado de ejecutarse.

Si quieres, también puedo enseñarte:

    el típico closure que siempre cae en exámenes de DAM

    un ejemplo donde mucha gente se equivoca (con var en bucles).

**Conclusión:**
Aunque ambos han dado explicaciones muy parecidas, la que ha dado Chat gpt me ha parecido más fácil de entender por estar explicada de una forma más cercana,
con un lenguaje aunque igual de correcto, quizás un poco más cercano.
Los ejemplos que han dado son prácticamente los mismos aunque creo que Claude luego ha dado alguno un poco más complejo.
Me ha gustado un poco más el de Chat gpt por la cercanía de la explciación y el poner ejemplos con otros casos similares.

---

### Concepto: Event Loop

**Prompt utilizado:**

> Explícame qué es el Event Loop en JavaScript con un ejemplo práctico y sencillo

**Respuesta de Claude:**
El Event Loop es el mecanismo que permite a JavaScript ejecutar código asíncrono a pesar de ser un lenguaje de un solo hilo. Es lo que hace que tu página no se congele mientras espera una respuesta del servidor.

Las piezas del sistema
┌─────────────────────┐
│ Call Stack │ ← Donde se ejecuta el código (1 cosa a la vez)
└─────────────────────┘
↑
┌─────────────────────┐
│ Event Loop │ ← El vigilante: mueve tareas al stack cuando está vacío
└─────────────────────┘
↑ ↑
┌────────┐ ┌──────────────┐
│Microtask│ │ Task Queue │ ← Callbacks de setTimeout, eventos, etc.
│ Queue │ │ │
│(Promises)│ └──────────────┘
└────────┘
Ejemplo paso a paso
javascriptconsole.log("1 - Inicio");

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

¿Por qué ese orden? Así lo procesa JavaScript:

| Paso | Qué pasa                                                                  |
| ---- | ------------------------------------------------------------------------- |
| 1    | Ejecuta `console.log("1")` → stack                                        |
| 2    | Registra el `setTimeout` → va a la Task Queue                             |
| 3    | Registra la `Promise` → va a la Microtask Queue                           |
| 4    | Ejecuta `console.log("4")` → stack                                        |
| 5    | Stack vacío → Event Loop revisa **primero** microtareas → ejecuta Promise |
| 6    | Microtareas vacías → revisa Task Queue → ejecuta setTimeout               |

## La regla de oro

```
Call Stack → Microtask Queue → Task Queue
Las microtareas (Promises, queueMicrotask) siempre tienen prioridad sobre las tareas (setTimeout, setInterval, eventos del DOM).
Ejemplo real: por qué no debes bloquear el hilo
javascript// ❌ Esto congela el navegador ~3 segundos
function tareaLenta() {
  const fin = Date.now() + 3000;
  while (Date.now() < fin) {} // Bloquea el Call Stack
  console.log("Listo");
}

// ✅ Esto libera el hilo entre iteraciones
async function tareaSana() {
  await fetch("https://api.ejemplo.com/datos");
  console.log("Listo"); // Se ejecuta cuando el stack está libre
}

En el primer caso, el Event Loop no puede procesar nada más (ni clics, ni animaciones) mientras el while ocupa el stack.

En resumen
- Call Stack Ejecuta el código sincrónico, una cosa a la vez
- Task Queue Guarda callbacks de setTimeout, eventos, etc.
- Microtask QueueGuarda callbacks de Promises (prioridad alta)
- Event LoopVigila el stack y mueve tareas cuando está vacío

La clave es entender que JavaScript no hace varias cosas a la vez, sino que las intercala muy rápido gracias a este sistema. El Event Loop es el director de orquesta que decide qué se ejecuta y cuándo

**Respuesta de ChatGPT:**
El Event Loop en JavaScript es el mecanismo que permite ejecutar código asíncrono, es decir, tareas que no se ejecutan inmediatamente (como temporizadores, peticiones a servidores, etc.).

En palabras simples:

👉 El Event Loop decide cuándo se ejecuta cada tarea.

JavaScript solo puede ejecutar una cosa a la vez, pero gracias al Event Loop puede manejar tareas que tardan tiempo sin bloquear el programa.

Cómo funciona (idea simple)

    Hay tres elementos:

    Call Stack (pila)
    Donde se ejecuta el código normal.

    Web APIs
    Donde el navegador gestiona cosas que tardan tiempo (como setTimeout).

    Callback Queue
    Donde esperan las funciones que se ejecutarán después.

    El Event Loop revisa constantemente:

    “¿La pila está vacía? Entonces saco la siguiente función de la cola y la ejecuto.”

Ejemplo sencillo
    console.log("Inicio");

    setTimeout(() => {
    console.log("Hola");
    }, 2000);

    console.log("Fin");

¿Qué crees que se imprime?

    Muchos piensan:

    Inicio
    Hola
    Fin

    Pero en realidad sale:

    Inicio
    Fin
    Hola

Por qué pasa esto

    1️⃣ console.log("Inicio") → se ejecuta inmediatamente

    2️⃣ setTimeout → el temporizador se manda a Web APIs

    3️⃣ console.log("Fin") → se ejecuta

    4️⃣ Pasan 2 segundos

    5️⃣ La función "Hola" entra en la cola de callbacks

    6️⃣ El Event Loop ve que la pila está libre y ejecuta:

    Hola

Esquema rápido
    Call Stack        Web APIs          Callback Queue
    ----------        --------          ---------------
    console.log
    setTimeout   ->   temporizador
    console.log
                                    -> función "Hola"

    Event Loop → cuando la pila queda vacía ejecuta "Hola"

Ejemplo práctico real

    Mostrar un mensaje después de cargar algo:

    console.log("Cargando datos...");

    setTimeout(() => {
    console.log("Datos cargados");
    }, 3000);

    Salida:

    Cargando datos...
    (3 segundos después)
    Datos cargados

    El programa no se queda bloqueado esperando.

✅ Definición corta (perfecta para examen DAM):

    El Event Loop es el mecanismo de JavaScript que gestiona la ejecución de código asíncrono, moviendo funciones desde la cola de callbacks al call stack cuando este queda libre.

Si quieres, también puedo enseñarte el ejemplo clásico que siempre confunde a la gente con Promise y setTimeout, que es la típica pregunta de examen o entrevista.

**Conclusión:**
Ene ste caso también me ha gustado más la explicación de Chat gpt ya que la veo más cercana, explciada de forma más simple. También Te pone ejemplos y luego te explica esos mismos ejemplos.

---

### Concepto: DOM

**Prompt utilizado:**
> Explícame qué es el DOM en JavaScript con un ejemplo práctico y sencillo

**Respuesta de Claude:**
El DOM (Document Object Model) es la representación en memoria del HTML de tu página. JavaScript lo usa para leer y modificar el contenido, la estructura y el estilo de forma dinámica.

La idea clave
    Cuando el navegador carga tu HTML, lo convierte en un árbol de objetos llamado DOM. Cada etiqueta HTML se convierte en un nodo que puedes manipular con JavaScript.
    HTML                          DOM (árbol de nodos)
─────────────────             ────────────────────────────
<html>                              document
  <body>                               │
    <h1>Hola</h1>           ┌──────────┴──────────┐
    <ul>                  <body>              ...
      <li>Item 1</li>       │
      <li>Item 2</li>   ┌───┴────────┐
    </ul>              <h1>         <ul>
  </body>               │            │
</html>               "Hola"    ┌────┴────┐
                              <li>      <li>
                             "Item1"  "Item 2"

Seleccionar elementos
    javascript// Por ID → devuelve 1 elemento
    const titulo = document.getElementById("titulo");

    // Por clase → devuelve una colección
    const items = document.querySelectorAll(".item");

    // Por selector CSS → devuelve el primero que encuentre
    const boton = document.querySelector("button");

Leer y modificar contenido
    javascriptconst titulo = document.getElementById("titulo");

    // Leer
    console.log(titulo.textContent); // "Hola mundo"

    // Modificar texto
    titulo.textContent = "Nuevo título";

    // Modificar HTML interno
    titulo.innerHTML = "<em>Título</em> con cursiva";

    // Modificar estilos
    titulo.style.color = "red";
    titulo.style.fontSize = "2rem";

    // Modificar clases
    titulo.classList.add("activo");
    titulo.classList.remove("oculto");
    titulo.classList.toggle("resaltado");

Ejemplo práctico: lista dinámica
    html<input id="input" placeholder="Escribe un item..." />
    <button id="btn">Agregar</button>
    <ul id="lista"></ul>
    javascriptconst input = document.getElementById("input");
    const boton = document.getElementById("btn");
    const lista = document.getElementById("lista");

    boton.addEventListener("click", () => {
    if (!input.value.trim()) return;

    // Crear nuevo nodo <li>
    const nuevoItem = document.createElement("li");
    nuevoItem.textContent = input.value;

    // Insertarlo en el DOM
    lista.appendChild(nuevoItem);

    // Limpiar el input
    input.value = "";
    });

Cada vez que haces clic, JavaScript crea un nodo, lo rellena con texto y lo añade al árbol del DOM. El navegador refleja el cambio al instante.

Las operaciones más comunes
- Seleccionar: querySelector, getElementById
- Crear: createElement
- Insertar: appendChild, prepend, insertBefore
- Eliminarelement.remove()
- Escuchar eventos: EventListener
- Leer/escribir textotextContent, innerHTMLCambiar clasesclassList.add/remove/toggleCambiar estiloselement.style.propiedad

En resumen
    El DOM es el puente entre tu HTML y JavaScript. Sin él, JavaScript no podría hacer nada visible en la página. Todo lo interactivo que ves en una web (menús, formularios, animaciones) es JavaScript manipulando el DOM en respuesta a eventos del usuario

**Respuesta de ChatGPT:**
El DOM (Document Object Model) es la representación del HTML de una página como un árbol de objetos que JavaScript puede modificar.

En otras palabras:

👉 El DOM permite que JavaScript lea y cambie el contenido de una página web escrita en HTML.

Idea sencilla

    Cuando el navegador carga una página HTML, convierte el HTML en una estructura de objetos.

Ejemplo de HTML:

    <h1 id="titulo">Hola mundo</h1>
    <button>Cambiar texto</button>

El navegador lo transforma en un árbol DOM:

    document
    └── html
        └── body
            ├── h1
            └── button

    Cada elemento se convierte en un objeto que JavaScript puede manipular.

Ejemplo práctico sencillo

    HTML:

        <h1 id="titulo">Hola</h1>
        <button onclick="cambiarTexto()">Cambiar</button>

    JavaScript:

        function cambiarTexto() {
        document.getElementById("titulo").textContent = "Hola JavaScript";
        }

Qué pasa cuando pulsas el botón

    JavaScript busca el elemento con id "titulo" en el DOM.

    Cambia su contenido.

    Resultado en la página:

    Hola
    ↓
    Hola JavaScript

Lo que hace cada parte
    document.getElementById("titulo")

    document → representa toda la página

    getElementById → busca un elemento en el DOM

    .textContent

    cambia el texto del elemento.

Otro ejemplo muy típico

    Cambiar el color de un texto:

    document.getElementById("titulo").style.color = "red";

    El DOM permite modificar:

        texto

        estilos

        atributos

        elementos HTML

        eventos

Definición corta (perfecta para examen)

    El DOM es una representación del documento HTML como una estructura de objetos que permite a JavaScript acceder y modificar los elementos de una página web.

✅ En resumen

    DOM = la forma en que JavaScript controla la página web.

Si quieres, también puedo enseñarte:

    el esquema visual del DOM que suelen pedir en exámenes

    las 5 funciones del DOM más usadas (querySelector, createElement, etc.) que aparecen mucho en prácticas de DAM.

**Conclusión:**
En este caso Claude me ha dado más ejemplos y me ha explicado más claro. Chat gpt noto que se ha quedado un poco escaso.
---

## 2. Detección de errores en código

### Función 1

**Prompt utilizado:**
> Encuentra y explica el error en esta función JavaScript: 
    function sumar(a, b) {
        return a - b
    }

**Respuesta de Claude:**
El error es simple: la función se llama sumar pero usa el operador - en lugar de +.
❌ Incorrecto
    function sumar(a, b) {
        return a - b; // Resta en vez de sumar
    }

// ✅ Correcto
    function sumar(a, b) {
        return a + b;
    }

sumar(3, 2) con el código original devuelve 1 en lugar de 5. Un error de lógica clásico: el código es sintácticamente válido (JavaScript no se queja), pero produce resultados incorrectos.

**Respuesta de ChatGPT:**
Exacto. Ese es un error de lógica en JavaScript.

El código no tiene errores de sintaxis, por lo que el intérprete lo ejecuta sin problemas, pero la operación que realiza no es la que se esperaba.

Código incorrecto
    function sumar(a, b) {
    return a - b; // usa resta
    }

    Si ejecutamos:

        sumar(3, 2);

    Resultado:

        1

    Porque realmente está haciendo:

        3 - 2 = 1

Código correcto
    function sumar(a, b) {
    return a + b;
    }

    Ahora:

        sumar(3, 2);

    Resultado:

        5

Tipo de error

    Este caso es un error de lógica porque:

    ✔ La sintaxis es válida

    ✔ El programa se ejecuta

    ❌ El resultado es incorrecto

Tipos de errores en programación (resumen)

    Errores de sintaxis
        El código no puede ejecutarse.

        function sumar(a, b {
        return a + b;
        }

    Errores de ejecución
        Ocurren mientras el programa se ejecuta.

    Errores de lógica
        El programa funciona pero el resultado es incorrecto (como tu ejemplo).

✅ Conclusión

    Tu ejemplo es un caso típico donde el programa funciona técnicamente, pero la lógica implementada no corresponde con el objetivo de la función.

**Conclusión:**
En este caso me gusta más la explicación de Claude porque aunque als dos están bien explicadas, considero que Chat gpt ha dado más vueltas y más información pra explicarlo. Claude ha sido más breve y la explicación se ha entendido a la primera igual de bien. 

---

### Función 2
Encuentra y explica el error en esta función JavaScript:

function saludar(nombre) {
  console.log("Hola " + Nombre)
}

**Respuesta de Claude:**

El error es el mismo que en el ejemplo anterior: Nombre con mayúscula no existe, la variable se llama nombre en minúscula.
❌ Incorrecto
    function saludar(nombre) {
    console.log("Hola " + Nombre); // ReferenceError: Nombre is not defined
    }

// ✅ Correcto
    function saludar(nombre) {
    console.log("Hola " + nombre);
    }
JavaScript es case-sensitive: nombre y Nombre son variables distintas. Como Nombre nunca fue declarada, el programa lanza un ReferenceError en tiempo de ejecución.

**Respuesta de ChatGPT:**
El error está en el nombre de la variable usada dentro de la función.

Código con error
    function saludar(nombre) {
    console.log("Hola " + Nombre)
    }

Problema

    La función recibe un parámetro llamado:

        nombre

    pero dentro de console.log se utiliza:

    Nombre

En JavaScript el lenguaje es case-sensitive, lo que significa que mayúsculas y minúsculas distinguen variables.

Por tanto:

    nombre ≠ Nombre

JavaScript intentará usar la variable Nombre, pero esa variable nunca fue declarada, por lo que al ejecutar la función aparecerá este error:

    ReferenceError: Nombre is not defined

Código corregido
    function saludar(nombre) {
    console.log("Hola " + nombre);
    }

Ejemplo de ejecución
    saludar("Ana");

    Resultado:

        Hola Ana

✅ Conclusión:
    El error se debe a usar Nombre en lugar de nombre. Como JavaScript distingue entre mayúsculas y minúsculas, la variable Nombre no existe y provoca un ReferenceError en tiempo de ejecución.

**Conclusión:**
En este caso em vuelve a gustar más el resutlado de Claude, aunque los dos están bien explicados, Chat GPT da más vueltas y CLaude me parece que lo explcia de forma mucho más concisa y brevemente y se entiende iguald e bien.
---

### Función 3
[misma estructura]

---

## 3. Generación de código desde descripción

### Función: Filtrar números pares

**Prompt utilizado:**
> Escribe una función que reciba un array de números y devuelva solo los números pares

**Respuesta de Claude:**
[pega aquí el código generado]

**Respuesta de ChatGPT:**
[pega aquí el código generado]

**Conclusión:**
[escribe aquí cuál generó mejor código y por qué]

---

### Función: Invertir palabras
[misma estructura]

---

### Función: Filtrar tareas por prioridad
[misma estructura]

---

## Conclusión general

| Criterio | Claude | ChatGPT |
|---|---|---|
| Claridad de explicaciones | | |
| Profundidad técnica | | |
| Calidad del código generado | | |
| Detección de errores | | |
| Mejor para principiantes | | |

**Conclusión final:**
[escribe aquí tu valoración global]
```
