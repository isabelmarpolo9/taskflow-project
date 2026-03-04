// Elementos del HTML
const inputTarea = document.getElementById('input-tarea')
const btnAñadir = document.getElementById('btn-añadir')
const contenedorTareas = document.getElementById('contenedor-tareas')

// Array donde guardaremos las tareas
let tareas = []

//añadir una tarea
function añadirTarea() {
  const texto = inputTarea.value.trim()
  if (texto === '') return
  const tarea = {
    id: Date.now(),
    texto: texto
  }
  tareas.push(tarea)
  inputTarea.value = ''
  guardarEnStorage()
  renderizarTareas()
}

//eliminar una tarea
function eliminarTarea(id) {
  tareas = tareas.filter(tarea => tarea.id !== id)
  guardarEnStorage()
  renderizarTareas()
}

//mostrar las tareas en el HTML
function renderizarTareas() {
  contenedorTareas.innerHTML = ''

  tareas.forEach(tarea => {
    const div = document.createElement('div')
    div.classList.add('tarea')
    div.innerHTML = `
      <div class="tarea-cuerpo">
        <span class="tarea-titulo">${tarea.texto}</span>
      </div>
      <button class="btn-eliminar" onclick="eliminarTarea(${tarea.id})">✕</button>
    `
    contenedorTareas.appendChild(div)
  })
}

//Guardar en LocalStorage
function guardarEnStorage() {
  localStorage.setItem('tareas', JSON.stringify(tareas))
}

//Cargar tareas al iniciar
function cargarDesdStorage() {
  const datos = localStorage.getItem('tareas')
  if (datos) {
    tareas = JSON.parse(datos)
    renderizarTareas()
  }
}

//botón añadir
btnAñadir.addEventListener('click', añadirTarea)

//añadir con Enter
inputTarea.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') añadirTarea()
})

cargarDesdStorage()