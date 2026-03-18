import {
  createTask,
  filterTasks,
  hasDuplicateTask,
  isCategory,
  isPriority,
  loadTasks,
  removeTask,
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
let tasks = loadTasks()

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
    (id) => { tasks = removeTask(tasks, id); saveTasks(tasks); render() },
    (id) => { tasks = toggleTask(tasks, id); saveTasks(tasks); render() },
    (id, newText) => { tasks = updateTask(tasks, id, newText); saveTasks(tasks); render() }
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
function onAddTask() {
  const result = readAndValidateForm()
  if (!result.ok) {
    showError(result.reason, formError)
    return
  }
  tasks.push(createTask(result.value))
  saveTasks(tasks)
  taskInput.value = ''
  clearError(formError)
  updateFormState()
  render()
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
render()

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
