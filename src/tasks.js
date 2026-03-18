import { readJson, writeJson } from './storage.js'

const TASKS_KEY = 'tareas'

/**
 * @typedef {'alta'|'media'|'baja'} Priority
 * @typedef {'trabajo'|'estudio'|'personal'} Category
 *
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} text
 * @property {Category} category
 * @property {Priority} priority
 * @property {boolean} completed
 */

/** @returns {Task[]} */
export function loadTasks() {
  const parsed = readJson(TASKS_KEY, [])
  if (!Array.isArray(parsed)) return []
  /** @type {Task[]} */
  const clean = []
  for (const item of parsed) {
    if (!item || typeof item !== 'object') continue
    const t = /** @type {any} */ (item)
    if (typeof t.id !== 'number') continue
    if (typeof t.text !== 'string') continue
    if (!isCategory(t.category)) continue
    if (!isPriority(t.priority)) continue
    clean.push({
      id: t.id,
      text: t.text,
      category: t.category,
      priority: t.priority,
      completed: t.completed === true
    })
  }
  return clean
}

/** @param {Task[]} tasks */
export function saveTasks(tasks) {
  writeJson(TASKS_KEY, tasks)
}

/** @param {string} value @returns {value is Priority} */
export function isPriority(value) {
  return value === 'alta' || value === 'media' || value === 'baja'
}

/** @param {string} value @returns {value is Category} */
export function isCategory(value) {
  return value === 'trabajo' || value === 'estudio' || value === 'personal'
}

/**
 * @param {string} raw
 * @param {{ min?: number; max?: number }} [opts]
 * @returns {{ ok: true; value: string } | { ok: false; reason: string }}
 */
export function validateTaskText(raw, opts = {}) {
  const min = opts.min ?? 1
  const max = opts.max ?? 120
  const value = raw.trim().replace(/\s+/g, ' ')
  if (value.length < min) return { ok: false, reason: 'Escribe una tarea.' }
  if (value.length > max) return { ok: false, reason: `Máximo ${max} caracteres.` }
  return { ok: true, value }
}

/**
 * @param {Task[]} tasks
 * @param {{ category: 'todas' | Category; query: string }} filters
 * @returns {Task[]}
 */
export function filterTasks(tasks, filters) {
  const q = filters.query.trim().toLowerCase()
  return tasks.filter(t => {
    const okCat = filters.category === 'todas' ? true : t.category === filters.category
    const okQ = q === '' ? true : t.text.toLowerCase().includes(q)
    return okCat && okQ
  })
}

/**
 * @param {Task[]} tasks
 * @param {string} text
 * @returns {boolean}
 */
export function hasDuplicateTask(tasks, text) {
  const needle = text.trim().toLowerCase()
  return tasks.some(t => t.text.trim().toLowerCase() === needle)
}

/**
 * @param {{ text: string; category: Category; priority: Priority }} input
 * @returns {Task}
 */
export function createTask(input) {
  return {
    id: Date.now(),
    text: input.text,
    category: input.category,
    priority: input.priority,
    completed: false
  }
}

/**
 * @param {Task[]} tasks
 * @param {number} id
 * @returns {Task[]}
 */
export function removeTask(tasks, id) {
  return tasks.filter(t => t.id !== id)
}

/**
 * Alterna el estado completado de una tarea.
 * @param {Task[]} tasks
 * @param {number} id
 * @returns {Task[]}
 */
export function toggleTask(tasks, id) {
  return tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
}

/**
 * Actualiza el texto de una tarea existente.
 * @param {Task[]} tasks
 * @param {number} id
 * @param {string} newText
 * @returns {Task[]}
 */
export function updateTask(tasks, id, newText) {
  const validated = validateTaskText(newText, { min: 1, max: 120 })
  if (!validated.ok) return tasks
  return tasks.map(t => t.id === id ? { ...t, text: validated.value } : t)
}

/**
 * Ordena las tareas por prioridad: alta → media → baja.
 * @param {Task[]} tasks
 * @returns {Task[]}
 */
export function sortByPriority(tasks) {
  const order = { alta: 0, media: 1, baja: 2 }
  return [...tasks].sort((a, b) => order[a.priority] - order[b.priority])
}

/**
 * Devuelve el número de tareas por categoría.
 * @param {Task[]} tasks
 * @returns {Record<string, number>}
 */
export function countByCategory(tasks) {
  return tasks.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1
    return acc
  }, {})
}

/**
 * Marca todas las tareas como completadas.
 * @param {Task[]} tasks
 * @returns {Task[]}
 */
export function completeAllTasks(tasks) {
  return tasks.map(t => ({ ...t, completed: true }))
}

/**
 * Elimina todas las tareas completadas.
 * @param {Task[]} tasks
 * @returns {Task[]}
 */
export function removeCompletedTasks(tasks) {
  return tasks.filter(t => !t.completed)
}
