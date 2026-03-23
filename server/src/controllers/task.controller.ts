import { Request, Response, NextFunction } from 'express'
import * as taskService from '../services/task.service'
import { createTaskSchema, updateTaskSchema } from '../validators/task.validator'

export function getAll(req: Request, res: Response, next: NextFunction): void {
  try {
    const tasks = taskService.getAllTasks()
    res.json(tasks)
  } catch (err) {
    next(err)
  }
}

export function getOne(req: Request, res: Response, next: NextFunction): void {
  try {
    const id = String(req.params['id'])
    const task = taskService.getTaskById(id)
    if (!task) {
      res.status(404).json({ error: 'Tarea no encontrada' })
      return
    }
    res.json(task)
  } catch (err) {
    next(err)
  }
}

export function create(req: Request, res: Response, next: NextFunction): void {
  try {
    const result = createTaskSchema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({ error: result.error.flatten() })
      return
    }
    const task = taskService.createTask(result.data)
    res.status(201).json(task)
  } catch (err) {
    next(err)
  }
}

export function update(req: Request, res: Response, next: NextFunction): void {
  try {
    const id = String(req.params['id'])
    const result = updateTaskSchema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({ error: result.error.flatten() })
      return
    }
    const task = taskService.updateTask(id, result.data)
    if (!task) {
      res.status(404).json({ error: 'Tarea no encontrada' })
      return
    }
    res.json(task)
  } catch (err) {
    next(err)
  }
}

export function remove(req: Request, res: Response, next: NextFunction): void {
  try {
    const id = String(req.params['id'])
    const deleted = taskService.deleteTask(id)
    if (!deleted) {
      res.status(404).json({ error: 'Tarea no encontrada' })
      return
    }
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}