import express from 'express'
import cors from 'cors'
import { Task } from '../server/src/models/task'

const app = express()

app.use(cors())
app.use(express.json())

let tasks: Task[] = []

app.get('/api/v1/tasks', (req, res) => {
  res.json(tasks)
})

app.post('/api/v1/tasks', (req, res) => {
  const { title, priority, category, completed } = req.body
  if (!title || !priority || !category) {
    res.status(400).json({ error: 'Faltan campos obligatorios' })
    return
  }
  const task: Task = {
    id: Date.now().toString(),
    title,
    priority,
    category,
    completed: completed ?? false,
    createdAt: new Date().toISOString()
  }
  tasks.push(task)
  res.status(201).json(task)
})

app.put('/api/v1/tasks/:id', (req, res) => {
  const id = req.params.id
  const index = tasks.findIndex(t => t.id === id)
  if (index === -1) {
    res.status(404).json({ error: 'Tarea no encontrada' })
    return
  }
  tasks[index] = { ...tasks[index], ...req.body }
  res.json(tasks[index])
})

app.delete('/api/v1/tasks/:id', (req, res) => {
  const id = req.params.id
  const before = tasks.length
  tasks = tasks.filter(t => t.id !== id)
  if (tasks.length === before) {
    res.status(404).json({ error: 'Tarea no encontrada' })
    return
  }
  res.status(204).send()
})

export default app