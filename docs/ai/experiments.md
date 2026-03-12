# Experimentos con IA en programación

En este documento se registran los experimentos realizados comparando la resolución de problemas de programación con y sin ayuda de IA.

## Qué se documenta aquí

- Experimentos concretos realizados con diferentes IAs
- Resultados obtenidos y conclusiones
- Cosas inesperadas que ocurrieron al usar IA
- Ideas que surgieron a partir de los experimentos

---

## Parte 1: Problemas genéricos de programación

---

### Experimento 1: Encontrar máximo y mínimo de un array

**Problema:**
Escribe una función que reciba un array de números y devuelva el número más alto y el más bajo en un objeto `{ max: X, min: Y }`.

---

#### Sin IA — Tiempo: 8 minutos

```javascript
function maxMin(numeros) {
  let max = numeros[0]
  let min = numeros[0]
  for (let i = 1; i < numeros.length; i++) {
    if (numeros[i] > max) {
      max = numeros[i]
    }
    if (numeros[i] < min) {
      min = numeros[i]
    }
  }
  return { max, min }
}
```

Dificultades encontradas: tuve que pensar cómo inicializar `max` y `min` correctamente. Al principio los inicialicé a `0`, lo que fallaba con arrays de números negativos. Tardé varios minutos en darme cuenta del problema.

---

#### Con IA — Tiempo: 1 minuto

Prompt utilizado:
```
Escribe una función JavaScript que reciba un array de números y devuelva 
el número más alto y el más bajo en un objeto { max, min }. 
Solo código, sin explicaciones.
```

Respuesta:
```javascript
function maxMin(numeros) {
  return {
    max: Math.max(...numeros),
    min: Math.min(...numeros)
  }
}
```

---

#### Comparativa

| Criterio | Sin IA | Con IA |
|----------|--------|--------|
| Tiempo | 8 min | 1 min |
| Líneas de código | 10 | 4 |
| Usa métodos nativos | No | Sí (`Math.max`, spread) |
| Comprensión del problema | Alta | Media |

**Conclusión:** La IA generó una solución más elegante usando `Math.max` con spread operator, algo que no se me ocurrió solo. Sin embargo, resolver el problema manualmente me obligó a entender cómo funciona la comparación elemento a elemento, lo que afianza más el aprendizaje.

---

### Experimento 2: Contar apariciones de letras

**Problema:**
Escribe una función que reciba un string y devuelva cuántas veces aparece cada letra, ignorando espacios.

---

#### Sin IA — Tiempo: 12 minutos

```javascript
function contarLetras(texto) {
  let resultado = {}
  let textoLimpio = texto.toLowerCase().replace(/ /g, '')
  for (let i = 0; i < textoLimpio.length; i++) {
    let letra = textoLimpio[i]
    if (resultado[letra]) {
      resultado[letra]++
    } else {
      resultado[letra] = 1
    }
  }
  return resultado
}
```

Dificultades encontradas: la lógica del objeto acumulador me costó un poco. También olvidé al principio convertir a minúsculas, lo que hacía que 'H' y 'h' se contaran como letras distintas.

---

#### Con IA — Tiempo: 1 minuto

Prompt utilizado:
```
Escribe una función JavaScript que reciba un string y devuelva cuántas veces 
aparece cada letra, ignorando espacios y sin distinguir mayúsculas. 
Solo código.
```

Respuesta:
```javascript
function contarLetras(texto) {
  return texto.toLowerCase().replace(/\s/g, '').split('').reduce((acc, letra) => {
    acc[letra] = (acc[letra] || 0) + 1
    return acc
  }, {})
}
```

---

#### Comparativa

| Criterio | Sin IA | Con IA |
|----------|--------|--------|
| Tiempo | 12 min | 1 min |
| Líneas de código | 11 | 4 |
| Usa métodos avanzados | No | Sí (`reduce`) |
| Comprensión del problema | Alta | Baja |

**Conclusión:** La versión con IA usa `reduce`, un método que entiendo pero que no habría usado espontáneamente. La versión manual es más verbosa pero más fácil de leer para alguien que está aprendiendo. Aquí se nota claramente que la IA optimiza para concisión, no para legibilidad.

---

### Experimento 3: Contar tareas por prioridad

**Problema:**
Escribe una función que reciba un array de tareas y devuelva cuántas hay de cada prioridad.

---

#### Sin IA — Tiempo: 6 minutos

```javascript
function contarPorPrioridad(tareas) {
  let resultado = { alta: 0, media: 0, baja: 0 }
  for (let i = 0; i < tareas.length; i++) {
    let p = tareas[i].prioridad
    if (p === 'alta') resultado.alta++
    else if (p === 'media') resultado.media++
    else if (p === 'baja') resultado.baja++
  }
  return resultado
}
```

Dificultades encontradas: poca dificultad, el problema era similar a los anteriores. Inicialicé el objeto con los tres valores a 0 desde el principio para evitar el error anterior.

---

#### Con IA — Tiempo: 1 minuto

Prompt utilizado:
```
Escribe una función JavaScript que reciba un array de objetos con propiedad 
"prioridad" y devuelva cuántos hay de cada valor. Solo código.
```

Respuesta:
```javascript
function contarPorPrioridad(tareas) {
  return tareas.reduce((acc, tarea) => {
    acc[tarea.prioridad] = (acc[tarea.prioridad] || 0) + 1
    return acc
  }, {})
}
```

---

#### Comparativa

| Criterio | Sin IA | Con IA |
|----------|--------|--------|
| Tiempo | 6 min | 1 min |
| Líneas de código | 9 | 5 |
| Flexibilidad | Baja (solo 3 prioridades) | Alta (cualquier valor) |
| Comprensión del problema | Alta | Media |

**Conclusión:** La versión con IA es más flexible — funciona con cualquier valor de prioridad, no solo los tres definidos. Esto es una mejora real que no había considerado al resolverlo solo.

---

## Parte 2: Tareas del proyecto TaskFlow

---

### Experimento 4: Añadir función de estadísticas

**Tarea:** Añadir una función que muestre cuántas tareas hay en total y cuántas por categoría.

---

#### Sin IA — Tiempo: 15 minutos

```javascript
function obtenerEstadisticas(tareas) {
  let stats = {
    total: tareas.length,
    trabajo: 0,
    estudio: 0,
    personal: 0
  }
  tareas.forEach(function(tarea) {
    if (tarea.categoria === 'trabajo') stats.trabajo++
    else if (tarea.categoria === 'estudio') stats.estudio++
    else if (tarea.categoria === 'personal') stats.personal++
  })
  return stats
}
```

---

#### Con IA — Tiempo: 2 minutos

Prompt utilizado:
```
Actúa como un desarrollador senior. Escribe una función para el proyecto TaskFlow 
que reciba el array de tareas y devuelva estadísticas: total de tareas 
y cantidad por categoría. Usa JSDoc.
```

Respuesta:
```javascript
/**
 * Calcula estadísticas del array de tareas.
 * @param {import('./tasks.js').Task[]} tareas
 * @returns {{ total: number, porCategoria: Record<string, number> }}
 */
function obtenerEstadisticas(tareas) {
  const porCategoria = tareas.reduce((acc, tarea) => {
    acc[tarea.categoria] = (acc[tarea.categoria] || 0) + 1
    return acc
  }, {})
  return { total: tareas.length, porCategoria }
}
```

---

#### Comparativa

| Criterio | Sin IA | Con IA |
|----------|--------|--------|
| Tiempo | 15 min | 2 min |
| Incluye JSDoc | No | Sí |
| Flexibilidad | Baja | Alta |
| Integración con el proyecto | Correcta | Correcta |

**Conclusión:** La IA adaptó la función al contexto del proyecto usando los tipos definidos en `tasks.js`. El JSDoc añadido automáticamente es un plus que habría llevado tiempo adicional hacer manualmente.

---

### Experimento 5: Ordenar tareas por prioridad

**Tarea:** Añadir una función que ordene el array de tareas mostrando primero las de prioridad alta, luego media y luego baja.

---

#### Sin IA — Tiempo: 18 minutos

```javascript
function ordenarPorPrioridad(tareas) {
  let alta = []
  let media = []
  let baja = []
  tareas.forEach(function(tarea) {
    if (tarea.prioridad === 'alta') alta.push(tarea)
    else if (tarea.prioridad === 'media') media.push(tarea)
    else baja.push(tarea)
  })
  return alta.concat(media).concat(baja)
}
```

Dificultades encontradas: al principio intenté usar `sort()` pero no sabía cómo comparar strings con un orden personalizado. Al final opté por separar en tres arrays y concatenarlos.

---

#### Con IA — Tiempo: 1 minuto

Prompt utilizado:
```
Escribe una función JavaScript que ordene un array de tareas por prioridad: 
primero 'alta', luego 'media', luego 'baja'. Solo código.
```

Respuesta:
```javascript
function ordenarPorPrioridad(tareas) {
  const orden = { alta: 0, media: 1, baja: 2 }
  return [...tareas].sort((a, b) => orden[a.prioridad] - orden[b.prioridad])
}
```

---

#### Comparativa

| Criterio | Sin IA | Con IA |
|----------|--------|--------|
| Tiempo | 18 min | 1 min |
| Líneas de código | 10 | 3 |
| Modifica el array original | No | No (usa spread) |
| Técnica usada | Separar y concatenar | Objeto de orden + sort |

**Conclusión:** La solución con IA es notablemente más elegante. El truco del objeto `{ alta: 0, media: 1, baja: 2 }` para convertir prioridades en números comparables es algo que no habría descubierto solo en ese tiempo. Además el spread `[...tareas]` evita mutar el array original, un detalle de buena práctica que no había considerado.

---

### Experimento 6: Exportar tareas a texto plano

**Tarea:** Añadir una función que genere un resumen de todas las tareas en texto plano para poder copiarlo.

---

#### Sin IA — Tiempo: 10 minutos

```javascript
function exportarTareas(tareas) {
  let texto = 'MIS TAREAS\n\n'
  tareas.forEach(function(tarea) {
    texto += '- ' + tarea.texto + ' [' + tarea.categoria + '] [' + tarea.prioridad + ']\n'
  })
  return texto
}
```

---

#### Con IA — Tiempo: 2 minutos

Prompt utilizado:
```
Actúa como un desarrollador senior. Escribe una función para TaskFlow que genere 
un resumen en texto plano de todas las tareas, agrupadas por categoría, 
con su prioridad indicada. Añade JSDoc.
```

Respuesta:
```javascript
/**
 * Genera un resumen en texto plano de las tareas agrupadas por categoría.
 * @param {import('./tasks.js').Task[]} tareas
 * @returns {string}
 */
function exportarTareas(tareas) {
  const porCategoria = tareas.reduce((acc, tarea) => {
    if (!acc[tarea.categoria]) acc[tarea.categoria] = []
    acc[tarea.categoria].push(tarea)
    return acc
  }, {})

  return Object.entries(porCategoria)
    .map(([categoria, items]) => {
      const lineas = items.map(t => `  - ${t.texto} [${t.prioridad}]`).join('\n')
      return `${categoria.toUpperCase()}\n${lineas}`
    })
    .join('\n\n')
}
```

---

#### Comparativa

| Criterio | Sin IA | Con IA |
|----------|--------|--------|
| Tiempo | 10 min | 2 min |
| Agrupa por categoría | No | Sí |
| Legibilidad del resultado | Baja | Alta |
| Complejidad del código | Baja | Media |

**Conclusión:** La versión con IA añadió una funcionalidad que no había pedido explícitamente (agrupar por categoría) porque el rol de "desarrollador senior" orientó la solución hacia lo más útil, no solo lo más literal. Esto muestra que los prompts con rol producen soluciones más completas.

---

## Conclusión general

| | Sin IA | Con IA |
|--|--------|--------|
| Tiempo total (6 experimentos) | ~69 min | ~8 min |
| Líneas de código promedio | 10 | 4 |
| Uso de métodos avanzados | Poco frecuente | Habitual |
| Comprensión del problema | Alta | Media |
| Calidad del código | Buena | Muy buena |

**Aprendizajes clave:**

- La IA es mucho más rápida pero la comprensión es menor cuando se usa directamente sin intentarlo antes.
- Resolver primero sin IA y luego comparar es la mejor forma de aprender: entiendes el problema y luego ves técnicas mejores.
- La IA tiende a usar métodos más avanzados (`reduce`, `sort` con objeto de orden, spread) que son más concisos pero requieren más conocimiento para entenderlos.
- Los prompts con rol de "desarrollador senior" producen código más completo que incluye JSDoc, manejo de edge cases y buenas prácticas sin pedirlo explícitamente.
- Para aprender: resolver solo primero, luego pedir a la IA y comparar las diferencias.
- Para producción: usar IA directamente con un prompt bien construido y revisar el resultado manualmente.