import {
  createTask,
  filterTasks,
  hasDuplicateTask,
  isCategory,
  isPriority,
  saveTasks,
  sortByPriority,
  toggleTask,
  updateTask,
  validateTaskText,
  completeAllTasks,
  removeCompletedTasks
} from './tasks.js'
import { applyTheme, getInitialTheme, toggleTheme } from './theme.js'
import { clearError, renderTaskList, showError, updateCategoryCounters } from './ui.js'
import { getTasks, createTask as createTaskAPI, deleteTask as deleteTaskAPI, updateTask as updateTaskAPI } from './api/client.js'


/** @type {HTMLInputElement} */
const taskInput = document.getElementById('input-tarea')
/** @type {HTMLButtonElement} */
const addButton = document.getElementById('btn-añadir')
/** @type {HTMLDivElement} */
const taskContainer = document.getElementById('contenedor-tareas')
/** @type {HTMLSelectElement} */
const categorySelect = document.getElementById('select-categoria')
/** @type {HTMLSelectElement} */
const prioritySelect = document.getElementById('select-prioridad')
/** @type {HTMLInputElement} */
const searchInput = document.getElementById('input-busqueda')
/** @type {HTMLButtonElement} */
const themeButton = document.getElementById('btn-tema')
/** @type {HTMLParagraphElement} */
const formError = document.getElementById('form-error')
/** @type {HTMLButtonElement} */
const sortButton = document.getElementById('btn-ordenar')

/** @type {'todas' | import('./tasks.js').Category} */
let activeCategory = 'todas'
let activeQuery = ''
let sortedByPriority = false

/** @type {import('./tasks.js').Task[]} */
let tasks = []
async function loadTasksFromServer() {
  const estadoCarga = document.getElementById('estado-carga')
  const estadoError = document.getElementById('estado-error')
  
  estadoCarga.classList.remove('hidden')
  estadoError.classList.add('hidden')
  
  try {
    tasks = await getTasks()
    estadoCarga.classList.add('hidden')
    render()
  } catch (err) {
    estadoCarga.classList.add('hidden')
    estadoError.classList.remove('hidden')
    console.error('Error cargando tareas:', err)
  }
}

/**
 * @returns {{ ok: true; value: { text: string; category: import('./tasks.js').Category; priority: import('./tasks.js').Priority } } | { ok: false; reason: string }}
 */
function readAndValidateForm() {
  const textResult = validateTaskText(taskInput.value, { min: 1, max: 120 })
  if (!textResult.ok) return textResult

  const category = categorySelect.value
  if (!isCategory(category)) return { ok: false, reason: 'Selecciona una categoría válida.' }

  const priority = prioritySelect.value
  if (!isPriority(priority)) return { ok: false, reason: 'Selecciona una prioridad válida.' }

  if (hasDuplicateTask(tasks, textResult.value)) return { ok: false, reason: 'Esa tarea ya existe.' }

  return { ok: true, value: { text: textResult.value, category, priority } }
}

function render() {
  let visible = filterTasks(tasks, { category: activeCategory, query: activeQuery })
  if (sortedByPriority) visible = sortByPriority(visible)
  renderTaskList(
    taskContainer,
    visible,
    async (id) => {
  try {
    await deleteTaskAPI(id)
    tasks = tasks.filter(t => t.id !== id)
    render()
  } catch (err) {
    console.error('Error al eliminar tarea:', err)
  }
},
    async (id) => {
  try {
    const task = tasks.find(t => t.id === id)
    if (!task) return
    await updateTaskAPI(id, { completed: !task.completed })
    tasks = toggleTask(tasks, id)
    render()
  } catch (err) {
    console.error('Error al actualizar tarea:', err)
  }
},
    async (id, newText) => {
  try {
    await updateTaskAPI(id, { text: newText })
    tasks = updateTask(tasks, id, newText)
    render()
  } catch (err) {
    console.error('Error al editar tarea:', err)
  }
}
  )
  updateCategoryCounters(tasks)
  updateStats()
}

/** Sync UI state (disabled/error) with current form values. */
function updateFormState() {
  const result = readAndValidateForm()
  addButton.disabled = !result.ok
  addButton.classList.toggle('opacity-50', !result.ok)
  addButton.classList.toggle('cursor-not-allowed', !result.ok)
  if (result.ok) clearError(formError)
}

/** Handle "add task" action (button or Enter). */
async function onAddTask() {
  const result = readAndValidateForm()
  if (!result.ok) {
    showError(result.reason, formError)
    return
  }

  try {
    const newTask = await createTaskAPI({
  title: result.value.text,
  category: result.value.category,
  priority: result.value.priority === 'alta' ? 'high' : result.value.priority === 'media' ? 'medium' : 'low',
  completed: false
})
    tasks.push(newTask)
    taskInput.value = ''
    clearError(formError)
    updateFormState()
    updateStats()
    render()
  } catch (err) {
    showError('Error al crear la tarea', formError)
  }
}

// Init: theme
applyTheme(getInitialTheme(), document.documentElement, themeButton)
themeButton.addEventListener('click', () => {
  const next = toggleTheme(document.documentElement)
  applyTheme(next, document.documentElement, themeButton)
})

// Init: category filters (aside)
const asideFilters = document.querySelectorAll('.filtro-aside')
asideFilters.forEach((el) => {
  el.addEventListener('click', () => {
    asideFilters.forEach(x => x.classList.remove('active'))
    el.classList.add('active')
    const value = el.dataset.filtro
    activeCategory = value === 'todas' ? 'todas' : (isCategory(value) ? value : 'todas')
    render()
  })
})

// Ordenar por prioridad
if (sortButton) {
  sortButton.addEventListener('click', () => {
    sortedByPriority = !sortedByPriority
    sortButton.textContent = sortedByPriority ? '🔽 Quitar orden' : '🔼 Ordenar por prioridad'
    sortButton.classList.toggle('text-purple-400', sortedByPriority)
    render()
  })
}

// Form events
addButton.addEventListener('click', onAddTask)
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') onAddTask()
})
taskInput.addEventListener('input', updateFormState)
categorySelect.addEventListener('change', updateFormState)
prioritySelect.addEventListener('change', updateFormState)

// Search
searchInput.addEventListener('input', () => {
  activeQuery = searchInput.value
  render()
})
 // Completar todas
const btnCompletarTodas = document.getElementById('btn-completar-todas')
if (btnCompletarTodas) {
  btnCompletarTodas.addEventListener('click', () => {
    tasks = completeAllTasks(tasks)
    saveTasks(tasks)
    render()
  })
}

// Borrar completadas
const btnBorrarCompletadas = document.getElementById('btn-borrar-completadas')
if (btnBorrarCompletadas) {
  btnBorrarCompletadas.addEventListener('click', () => {
    tasks = removeCompletedTasks(tasks)
    saveTasks(tasks)
    updateCategoryCounters(tasks)
    updateStats()
    render()
  })
}
updateFormState()
updateFormState()
loadTasksFromServer()

function updateStats() {
  const total = tasks.length
  const completadas = tasks.filter(t => t.completed).length
  const pendientes = total - completadas

  const statTotal = document.getElementById('stat-total')
  const statCompletadas = document.getElementById('stat-completadas')
  const statPendientes = document.getElementById('stat-pendientes')

  if (statTotal) statTotal.textContent = String(total)
  if (statCompletadas) statCompletadas.textContent = String(completadas)
  if (statPendientes) statPendientes.textContent = String(pendientes)
}
