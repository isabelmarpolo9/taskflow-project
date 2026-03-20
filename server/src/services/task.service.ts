import { Task, CreateTaskInput, UpdateTaskInput } from '../models'

// Por ahora guardamos las tareas en memoria
// En el futuro esto se conectaría a una base de datos
let tasks: Task[] = []

export function getAllTasks(): Task[] {
  return tasks
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find(t => t.id === id)
}

export function createTask(input: CreateTaskInput): Task {
  const task: Task = {
    ...input,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  tasks.push(task)
  return task
}

export function updateTask(id: string, input: UpdateTaskInput): Task | undefined {
  const index = tasks.findIndex(t => t.id === id)
  if (index === -1) return undefined
  tasks[index] = { ...tasks[index], ...input } as Task
  return tasks[index]
}

export function deleteTask(id: string): boolean {
  const before = tasks.length
  tasks = tasks.filter(t => t.id !== id)
  return tasks.length < before
}