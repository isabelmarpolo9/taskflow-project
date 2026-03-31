import { Request, Response, NextFunction } from 'express'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err.message === 'NOT_FOUND') {
    res.status(404).json({ error: 'Recurso no encontrado' })
    return
  }

  console.error(err)
  res.status(500).json({ error: 'Error interno del servidor' })
}