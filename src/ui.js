/**
 * @param {string} priority
 * @returns {string}
 */
export function priorityBadgeClass(priority) {
  const map = {
    alta: 'bg-red-500/20 text-red-400 border border-red-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase',
    media: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase',
    baja: 'bg-green-500/20 text-green-400 border border-green-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase'
  }
  return map[priority] ?? map.media
}

/**
 * @param {string} msg
 * @param {HTMLElement} el
 */
export function showError(msg, el) {
  el.textContent = msg
  el.classList.remove('hidden')
}

/** @param {HTMLElement} el */
export function clearError(el) {
  el.textContent = ''
  el.classList.add('hidden')
}

/**
 * @param {HTMLElement} container
 * @param {import('./tasks.js').Task[]} tasks
 * @param {(id: number) => void} onDelete
 * @param {(id: number) => void} onToggle
 * @param {(id: number, newText: string) => void} onEdit
 */
export function renderTaskList(container, tasks, onDelete, onToggle, onEdit) {
  container.innerHTML = ''
  const frag = document.createDocumentFragment()

  for (const task of tasks) {
    const card = document.createElement('div')
    card.className = `tarea flex items-center gap-4 bg-purple-100 dark:bg-gray-900 border rounded-xl px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 ${
      task.completed
        ? 'border-gray-300 dark:border-gray-700 opacity-60'
        : 'border-gray-200 dark:border-gray-800 hover:border-purple-400 dark:hover:border-purple-700'
    }`
    card.dataset.id = String(task.id)

    // Checkbox para marcar como completada
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = task.completed
    checkbox.className = 'w-4 h-4 accent-purple-500 cursor-pointer flex-shrink-0'
    checkbox.setAttribute('aria-label', `Marcar como completada: ${task.text}`)
    checkbox.dataset.action = 'toggle'

    // Info (título + categoría)
    const info = document.createElement('div')
    info.className = 'flex flex-col flex-1 min-w-0'

    const title = document.createElement('span')
    title.className = `tarea-titulo text-sm ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'}`
    title.textContent = task.text ?? task.title ?? ''
    const category = document.createElement('span')
    category.className = 'text-xs text-gray-500 mt-0.5'
    category.textContent = task.category

    info.appendChild(title)
    info.appendChild(category)

    // Badge de prioridad
    const badge = document.createElement('span')
    badge.className = `text-xs font-bold uppercase px-2 py-0.5 rounded-full ${priorityBadgeClass(task.priority)}`
    badge.textContent = task.priority

    // Botón editar
    const btnEdit = document.createElement('button')
    btnEdit.type = 'button'
    btnEdit.className = 'text-gray-600 hover:text-purple-400 transition-colors duration-200 cursor-pointer text-sm'
    btnEdit.textContent = '✏️'
    btnEdit.dataset.action = 'edit'
    btnEdit.setAttribute('aria-label', `Editar tarea: ${task.text}`)

    // Botón eliminar
    const btnDelete = document.createElement('button')
    btnDelete.type = 'button'
    btnDelete.className = 'text-gray-600 hover:text-red-400 transition-colors duration-200 cursor-pointer'
    btnDelete.textContent = '✕'
    btnDelete.dataset.action = 'delete'
    btnDelete.setAttribute('aria-label', `Eliminar tarea: ${task.text}`)

    card.appendChild(checkbox)
    card.appendChild(info)
    card.appendChild(badge)
    card.appendChild(btnEdit)
    card.appendChild(btnDelete)

    frag.appendChild(card)
  }

  container.appendChild(frag)

  // Delegación de eventos
  container.onclick = (e) => {
    const target = /** @type {HTMLElement} */ (e.target)
    const card = target.closest('.tarea')
    const id = card?.dataset?.id
    if (!id) return

    if (target.dataset.action === 'delete') {
      onDelete(id)
      return
    }

    if (target.dataset.action === 'toggle') {
      onToggle(id)
      return
    }

    if (target.dataset.action === 'edit') {
      const titleEl = card.querySelector('.tarea-titulo')
      if (!titleEl) return
      const currentText = titleEl.textContent ?? ''
      const newText = prompt('Editar tarea:', currentText)
      if (newText !== null && newText.trim() !== '' && newText.trim() !== currentText) {
        onEdit(id, newText)
      }
    }
  }
}

/**
 * Actualiza los contadores de tareas por categoría en el aside.
 * @param {import('./tasks.js').Task[]} tasks
 */
export function updateCategoryCounters(tasks) {
  const counts = tasks.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1
    return acc
  }, /** @type {Record<string, number>} */ ({}))

  const items = document.querySelectorAll('.filtro-aside[data-filtro]')
  items.forEach(item => {
    const el = /** @type {HTMLElement} */ (item)
    const filtro = el.dataset.filtro
    let badge = el.querySelector('.count-badge')
    if (!badge) {
      badge = document.createElement('span')
      badge.className = 'count-badge ml-auto text-xs bg-purple-600 text-white rounded-full px-1.5 hidden md:inline-block'
      el.appendChild(badge)
    }
    const count = filtro === 'todas' ? tasks.length : (counts[filtro] ?? 0)
    badge.textContent = String(count)
  })
}
