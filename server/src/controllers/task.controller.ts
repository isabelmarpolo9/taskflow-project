import { Request, Response } from 'express'
import * as taskService from '../services/task.service'
import { createTaskSchema, updateTaskSchema } from '../validators/task.validator'

export function getAll(req: Request, res: Response): void {
  const tasks = taskService.getAllTasks()
  res.json(tasks)
}

export function getOne(req: Request, res: Response): void {
  const task = taskService.getTaskById(req.params.id)
  if (!task) {
    res.status(404).json({ error: 'Tarea no encontrada' })
    return
  }
  res.json(task)
}

export function create(req: Request, res: Response): void {
  const result = createTaskSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() })
    return
  }
  const task = taskService.createTask(result.data)
  res.status(201).json(task)
}

export function update(req: Request, res: Response): void {
  const result = updateTaskSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ error: result.error.flatten() })
    return
  }
  const task = taskService.updateTask(req.params.id, result.data)
  if (!task) {
    res.status(404).json({ error: 'Tarea no encontrada' })
    return
  }
  res.json(task)
}

export function remove(req: Request, res: Response): void {
  const deleted = taskService.deleteTask(req.params.id)
  if (!deleted) {
    res.status(404).json({ error: 'Tarea no encontrada' })
    return
  }
  res.status(204).send()
}