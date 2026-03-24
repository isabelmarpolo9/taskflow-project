const BASE_URL = 'http://localhost:3000/api/v1'

function serverToClient(task) {
  const result = Object.assign({}, task)
  result.text = task.title
  result.priority = task.priority === 'high' ? 'alta' : task.priority === 'medium' ? 'media' : 'baja'
  console.log('serverToClient resultado:', result)
  return result
}


export async function getTasks() {
  const res = await fetch(`${BASE_URL}/tasks`)
  if (!res.ok) throw new Error('Error al obtener las tareas')
  const tasks = await res.json()
  return tasks.map(serverToClient)
}

export async function createTask(task) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  })
  if (!res.ok) throw new Error('Error al crear la tarea')
  const created = await res.json()
  console.log('Respuesta servidor:', created)
  return serverToClient(created)
}

export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Error al eliminar la tarea')
}

export async function updateTask(id, data) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Error al actualizar la tarea')
  return res.json()
}
