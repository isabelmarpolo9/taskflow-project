// Elementos del HTML
const inputTarea = document.getElementById('input-tarea')
const btnAñadir = document.getElementById('btn-añadir')
const contenedorTareas = document.getElementById('contenedor-tareas')
const selectCategoria = document.getElementById('select-categoria')
const selectPrioridad = document.getElementById('select-prioridad')

let filtroActivo = 'todas'
let busquedaActiva = ''

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

  const q = busquedaActiva.trim().toLowerCase()
  const tareasFiltradas = tareas.filter(t => {
    const pasaCategoria = filtroActivo === 'todas' ? true : t.categoria === filtroActivo
    const pasaBusqueda = q === '' ? true : t.texto.toLowerCase().includes(q)
    return pasaCategoria && pasaBusqueda
  })

  const badgeClases = {
    alta: 'bg-red-500/20 text-red-400 border border-red-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase',
    media: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase',
    baja: 'bg-green-500/20 text-green-400 border border-green-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase'
  }

  const frag = document.createDocumentFragment()

  tareasFiltradas.forEach(tarea => {
    const div = document.createElement('div')
    div.className = 'tarea flex items-center gap-4 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-700'
    div.dataset.id = String(tarea.id)

    const info = document.createElement('div')
    info.className = 'flex flex-col flex-1'

    const titulo = document.createElement('span')
    titulo.className = 'tarea-titulo text-sm text-gray-200'
    titulo.textContent = tarea.texto

    const categoria = document.createElement('span')
    categoria.className = 'text-xs text-gray-500 mt-0.5'
    categoria.textContent = tarea.categoria

    info.appendChild(titulo)
    info.appendChild(categoria)

    const prioridad = document.createElement('span')
    prioridad.className = `text-xs font-bold uppercase px-2 py-0.5 rounded-full ${badgeClases[tarea.prioridad] ?? badgeClases.media}`
    prioridad.textContent = tarea.prioridad

    const btnEliminar = document.createElement('button')
    btnEliminar.type = 'button'
    btnEliminar.className = 'text-gray-600 hover:text-red-400 transition-colors duration-200 cursor-pointer'
    btnEliminar.textContent = '✕'
    btnEliminar.dataset.action = 'eliminar'
    btnEliminar.setAttribute('aria-label', `Eliminar tarea: ${tarea.texto}`)

    div.appendChild(info)
    div.appendChild(prioridad)
    div.appendChild(btnEliminar)

    frag.appendChild(div)
  })

  contenedorTareas.appendChild(frag)
}

//Guardar en LocalStorage
function guardarEnStorage() {
  localStorage.setItem('tareas', JSON.stringify(tareas))
}

//Cargar tareas al iniciar
function cargarDesdeStorage() {
  const datos = localStorage.getItem('tareas')
  if (datos) {
    try {
      const parsed = JSON.parse(datos)
      tareas = Array.isArray(parsed) ? parsed : []
    } catch {
      tareas = []
    }
    renderizarTareas()
  }
}

//botón añadir
btnAñadir.addEventListener('click', añadirTarea)

//añadir con Enter
inputTarea.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') añadirTarea()
})

cargarDesdeStorage()

//Filtro de búsqueda
const inputBusqueda = document.getElementById('input-busqueda')

inputBusqueda.addEventListener('input', function() {
  busquedaActiva = inputBusqueda.value
  renderizarTareas()
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

// Eliminar (delegación de eventos)
contenedorTareas.addEventListener('click', (e) => {
  const btn = e.target?.closest?.('button[data-action="eliminar"]')
  if (!btn) return

  const tarjeta = btn.closest('.tarea')
  const id = Number(tarjeta?.dataset?.id)
  if (!Number.isFinite(id)) return

  eliminarTarea(id)
})

// Modo oscuro/claro
const btnTema = document.getElementById('btn-tema')

function aplicarTema(modo) {
  const html = document.documentElement
  const dark = modo === 'dark'
  html.classList.toggle('dark', dark)
  btnTema.textContent = dark ? '☀️ Modo claro' : '🌙 Modo oscuro'
  localStorage.setItem('tema', dark ? 'dark' : 'light')
}

aplicarTema(localStorage.getItem('tema') || (document.documentElement.classList.contains('dark') ? 'dark' : 'light'))

btnTema.addEventListener('click', function() {
  const dark = document.documentElement.classList.contains('dark')
  aplicarTema(dark ? 'light' : 'dark')
})