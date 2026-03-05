// Elementos del HTML
const inputTarea = document.getElementById('input-tarea')
const btnAñadir = document.getElementById('btn-añadir')
const contenedorTareas = document.getElementById('contenedor-tareas')
const selectCategoria = document.getElementById('select-categoria')
const selectPrioridad = document.getElementById('select-prioridad')

let filtroActivo = 'todas'

// Array donde guardaremos las tareas
let tareas = []

//añadir una tarea
function añadirTarea() {
  const texto = inputTarea.value.trim()
  
  if (texto === '') return

  const tarea = {
    id: Date.now(),
    texto: texto,
    categoria: selectCategoria.value,
    prioridad: selectPrioridad.value
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

  const tareasFiltradas = filtroActivo === 'todas' 
    ? tareas 
    : tareas.filter(t => t.categoria === filtroActivo)

  tareasFiltradas.forEach(tarea => {
    const div = document.createElement('div')
    div.classList.add('tarea')
    div.innerHTML = `
      <div class="tarea-cuerpo">
        <span class="tarea-titulo">${tarea.texto}</span>
        <span class="tarea-categoria">${tarea.categoria}</span>
      </div>
      <span class="badge badge-${tarea.prioridad}">${tarea.prioridad}</span>
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

//Filtro de búsqueda
const inputBusqueda = document.getElementById('input-busqueda')

inputBusqueda.addEventListener('input', function() {
  const textoBusqueda = inputBusqueda.value.toLowerCase()
  
  const tarjetas = contenedorTareas.querySelectorAll('.tarea')
  
  tarjetas.forEach(tarjeta => {
    const titulo = tarjeta.querySelector('.tarea-titulo').textContent.toLowerCase()
    
    if (titulo.includes(textoBusqueda)) {
      tarjeta.style.display = 'flex'
    } else {
      tarjeta.style.display = 'none'
    }
  })
})

// Filtro del aside

const filtrosAside = document.querySelectorAll('.filtro-aside')

filtrosAside.forEach(filtro => {
  filtro.addEventListener('click', function() {
    filtrosAside.forEach(f => f.classList.remove('active'))
        filtro.classList.add('active')
    filtroActivo = filtro.dataset.filtro
    renderizarTareas()
  })
})