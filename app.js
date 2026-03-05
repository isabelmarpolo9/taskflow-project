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
    const badgeClases = {
      alta: 'bg-red-500/20 text-red-400 border border-red-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase',
      media: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase',
      baja: 'bg-green-500/20 text-green-400 border border-green-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase'
    }

    const div = document.createElement('div')
    div.className = 'flex items-center gap-4 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-700'
    div.innerHTML = `
      <div class="flex flex-col flex-1">
        <span class="text-sm text-gray-200">${tarea.texto}</span>
        <span class="text-xs text-gray-500 mt-0.5">${tarea.categoria}</span>
      </div>
      <span class="text-xs font-bold uppercase px-2 py-0.5 rounded-full ${badgeClases[tarea.prioridad]}">${tarea.prioridad}</span>
      <button onclick="eliminarTarea(${tarea.id})" class="text-gray-600 hover:text-red-400 transition-colors duration-200 cursor-pointer">✕</button>
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

// Modo oscuro/claro
const btnTema = document.getElementById('btn-tema')

btnTema.addEventListener('click', function() {
  const html = document.documentElement
  
  if (html.classList.contains('dark')) {
    html.classList.remove('dark')
    btnTema.textContent = '🌙 Modo oscuro'
  } else {
    html.classList.add('dark')
    btnTema.textContent = '☀️ Modo claro'
  }
})