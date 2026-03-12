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

/**
 * @param {HTMLElement} el
 */
export function clearError(el) {
  el.textContent = ''
  el.classList.add('hidden')
}

/**
 * @param {HTMLElement} container
 * @param {import('./tasks.js').Task[]} tasks
 * @param {(id: number) => void} onDelete
 */
export function renderTaskList(container, tasks, onDelete) {
  container.innerHTML = ''
  const frag = document.createDocumentFragment()

  for (const task of tasks) {
    const card = document.createElement('div')
    card.className = 'tarea flex items-center gap-4 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-700'
    card.dataset.id = String(task.id)

    const info = document.createElement('div')
    info.className = 'flex flex-col flex-1'

    const title = document.createElement('span')
    title.className = 'tarea-titulo text-sm text-gray-200'
    title.textContent = task.text

    const category = document.createElement('span')
    category.className = 'text-xs text-gray-500 mt-0.5'
    category.textContent = task.category

    info.appendChild(title)
    info.appendChild(category)

    const badge = document.createElement('span')
    badge.className = `text-xs font-bold uppercase px-2 py-0.5 rounded-full ${priorityBadgeClass(task.priority)}`
    badge.textContent = task.priority

    const btnDelete = document.createElement('button')
    btnDelete.type = 'button'
    btnDelete.className = 'text-gray-600 hover:text-red-400 transition-colors duration-200 cursor-pointer'
    btnDelete.textContent = '✕'
    btnDelete.dataset.action = 'delete'
    btnDelete.setAttribute('aria-label', `Eliminar tarea: ${task.text}`)

    card.appendChild(info)
    card.appendChild(badge)
    card.appendChild(btnDelete)

    frag.appendChild(card)
  }

  container.appendChild(frag)

  // Delegación de eventos (un único listener)
  container.onclick = (e) => {
    const btn = e.target?.closest?.('button[data-action="delete"]')
    if (!btn) return
    const card = btn.closest('.tarea')
    const id = Number(card?.dataset?.id)
    if (!Number.isFinite(id)) return
    onDelete(id)
  }
}
