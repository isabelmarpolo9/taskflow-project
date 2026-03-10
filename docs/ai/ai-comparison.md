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

¿Por qué es útil?
    1. Datos privados — cuenta no es accesible desde fuera, solo a través de la función retornada.
    2. Cada instancia es independiente:
            javascriptconst contadorA = crearContador();
        const contadorB = crearContador();

        contadorA(); // 1
        contadorA(); // 2
        contadorB(); // 1  ← su propio "cuenta", separado
3. Funciones con memoria, como cachés, configuraciones o fábricas de funciones:
        javascriptfunction multiplicador(factor) {
        return (numero) => numero * factor;
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
[pega aquí la respuesta]

**Respuesta de ChatGPT:**
[pega aquí la respuesta]

**Conclusión:**
[escribe aquí cuál explicó mejor y por qué]

---

### Concepto: DOM

**Prompt utilizado:**
> Explícame qué es el DOM en JavaScript con un ejemplo práctico y sencillo

**Respuesta de Claude:**
[pega aquí la respuesta]

**Respuesta de ChatGPT:**
[pega aquí la respuesta]

**Conclusión:**
[escribe aquí cuál explicó mejor y por qué]

---

## 2. Detección de errores en código

### Función 1

**Prompt utilizado:**
> Encuentra y explica el error en esta función JavaScript: [función]

**Respuesta de Claude:**
[pega aquí la respuesta]

**Respuesta de ChatGPT:**
[pega aquí la respuesta]

**Conclusión:**
[escribe aquí cuál detectó mejor el error y por qué]

---

### Función 2
[misma estructura]

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